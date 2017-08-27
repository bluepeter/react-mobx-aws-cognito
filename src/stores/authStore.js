import { observable, action } from "mobx";
import commonStore from "./commonStore";
import * as AWSCognito from "amazon-cognito-identity-js";

const userPool = new AWSCognito.CognitoUserPool({
  UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID
});
let cognitoUser = null;

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
  @observable message = null;
  @observable currentUser = null;

  @action
  setCurrentUser(userName) {
    this.currentUser = userName;
  }

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
  verifySession() {
    let hasSession = false;
    Object.keys(localStorage).every(key => {
      if (key.match("CognitoIdentityServiceProvider")) {
        hasSession = true;
      }
      return key;
    });
    return new Promise((res, rej) => {
      if (hasSession) {
        cognitoUser = userPool.getCurrentUser();
        return cognitoUser !== null ? res() : rej();
      } else {
        return rej();
      }
    })
      .then(() => {
        return new Promise((res, rej) => {
          cognitoUser.getSession((err, session) => {
            return err ? rej(err) : res();
          });
        });
      })
      .then(() => {
        return new Promise((res, rej) => {
          cognitoUser.getUserAttributes((err, attributes) => {
            if (err) {
              return rej(err);
            }
            res(attributes);
          });
        });
      })
      .then(attributes => {
        return new Promise((res, rej) => {
          attributes.map(key => {
            if (key.Name === "email") {
              this.setCurrentUser(key.Value);
            }
            return key;
          });
          res();
        });
      })
      .catch()
      .finally(() => {
        commonStore.setAppLoaded();
      });
  }

  @action
  login() {
    this.inProgress = true;
    this.errors = undefined;
    const email = this.values.email;

    let authenticationDetails = new AWSCognito.AuthenticationDetails({
      Username: email,
      Password: this.values.password
    });

    cognitoUser = new AWSCognito.CognitoUser({
      Username: this.values.email,
      Pool: userPool
    });

    return new Promise((res, rej) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          return res();
        },
        onFailure: err => {
          return rej(err);
        }
      });
    })
      .then(() => {
        this.setCurrentUser(email);
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
        })
      );
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
        (err, result) => {
          if (err) {
            return rej(err);
          }
          cognitoUser = result;
          res();
        }
      );
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
        })
      );
  }

  @action
  confirmCode() {
    this.inProgress = true;
    this.errors = undefined;

    cognitoUser = new AWSCognito.CognitoUser({
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
        })
      );
  }

  @action
  logout() {
    return new Promise((res, rej) => {
      if (cognitoUser !== null) {
        cognitoUser.signOut();
        cognitoUser = null;
      }
      this.setCurrentUser(null);
    });
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
