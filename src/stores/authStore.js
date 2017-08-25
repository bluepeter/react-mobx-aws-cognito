import { observable, action } from "mobx";
import agent from "../agent";
import userStore from "./userStore";
import commonStore from "./commonStore";
import * as AWSCognito from "amazon-cognito-identity-js";

const userPool = new AWSCognito.CognitoUserPool({
  UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID
});

class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;
  @observable
  values = {
    username: "",
    email: "",
    password: "",
    code: "",
    message: ""
  };
  @observable redirectTo = false;
  @observable message = null;

  @action
  setUsername(username) {
    this.values.username = username;
  }

  @action
  setCode(code) {
    this.values.code = code;
  }

  @action
  setEmail(email) {
    this.values.email = email;
  }

  @action
  setPassword(password) {
    this.values.password = password;
  }

  @action
  setMessage(message) {
    this.values.message = message;
  }

  @action
  reset() {
    this.values.username = "";
    this.values.email = "";
    this.values.password = "";
    this.values.code = "";
    this.values.message = "";
  }

  @action
  login() {
    this.inProgress = true;
    this.errors = undefined;

    let authenticationDetails = new AWSCognito.AuthenticationDetails({
      Username: this.values.email,
      Password: this.values.password
    });

    let cognitoUser = new AWSCognito.CognitoUser({
      Username: this.values.email,
      Pool: userPool
    });

    return new Promise((res, rej) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          console.log(
            "access token + " + result.getAccessToken().getJwtToken()
          );
          return res(result.getAccessToken().getJwtToken());
        },
        onFailure: err => {
          return rej(err);
        }
      });
    })
      .catch(
        action(err => {
          this.errors = this.simpleErr(err);
          throw err;
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
          this.redirectTo = false;
        })
      );

    //return agent.Auth
    //.login(this.values.email, this.values.password)
    //.then(({ user }) => commonStore.setToken(user.token))
    //.then(() => userStore.pullUser())
    //.then(
    //action(() => {
    //this.redirectTo = true;
    //})
    //)
    //.catch(
    //action(err => {
    //this.errors =
    //err.response && err.response.body && err.response.body.errors;
    //throw err;
    //})
    //)
    //.finally(
    //action(() => {
    //this.inProgress = false;
    //this.redirectTo = false;
    //})
    //);
  }

  @action
  register() {
    this.inProgress = true;
    this.errors = undefined;

    return new Promise((res, rej) => {
      userPool.signUp(
        this.values.email,
        this.values.password,
        null,
        null,
        err => {
          return err ? rej(err) : res();
        }
      );
    })
      .then(
        action(() => {
          this.redirectTo = "/register/confirm";
        })
      )
      .catch(
        action(err => {
          this.errors = this.simpleErr(err);
          throw err;
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
          this.redirectTo = false;
        })
      );
  }

  @action
  confirmCode() {
    this.inProgress = true;
    this.errors = undefined;

    let cognitoUser = new AWSCognito.CognitoUser({
      Username: this.values.email,
      Pool: userPool
    });

    return new Promise((res, rej) => {
      cognitoUser.confirmRegistration(this.values.code, true, err => {
        return err ? rej(err) : res();
      });
    })
      .then(
        action(() => {
          this.setMessage("You're confirmed! Please login...");
          this.redirectTo = "/login";
        })
      )
      .catch(
        action(err => {
          this.errors = this.simpleErr(err);
          throw err;
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
          this.redirectTo = false;
        })
      );
  }

  @action
  logout() {
    commonStore.setToken(undefined);
    userStore.forgetUser();
    return new Promise(res => res())
      .then(
        action(() => {
          this.redirectTo = "/";
        })
      )
      .then(
        action(() => {
          this.redirectTo = false;
        })
      );
  }

  simpleErr(err) {
    return {
      statusCode: err.statusCode,
      code: err.code,
      message: err.message
    };
  }
}

export default new AuthStore();
