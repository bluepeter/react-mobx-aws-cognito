import { Link, Redirect } from "react-router-dom";
import ListErrors from "../lib/ListErrors";
import React from "react";
import { inject, observer } from "mobx-react";

@inject("authStore")
@observer
export default class Register extends React.Component {
  handleUsernameChange = e => this.props.authStore.setUsername(e.target.value);
  handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
  handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
  handleSubmitForm = e => {
    e.preventDefault();
    this.props.authStore.register();
  };

  render() {
    const { values, errors, inProgress, redirectTo } = this.props.authStore;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="login">Have an account?</Link>
              </p>

              <ListErrors errors={errors} />

              {redirectTo &&
                redirectTo !== this.props.location.pathname &&
                <Redirect to={redirectTo} />}

              <form onSubmit={this.handleSubmitForm}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={this.handleEmailChange}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={this.handlePasswordChange}
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={inProgress}
                  >
                    Sign up
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
