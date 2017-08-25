import { Redirect } from "react-router-dom";
import ListErrors from "../lib/ListErrors";
import React from "react";
import { inject, observer } from "mobx-react";

@inject("authStore")
@observer
export default class Confirm extends React.Component {
  handleCodeChange = e => this.props.authStore.setCode(e.target.value);
  handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
  handleSubmitForm = e => {
    e.preventDefault();
    this.props.authStore.confirmCode();
  };

  render() {
    const { values, errors, inProgress, redirectTo } = this.props.authStore;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Confirm code</h1>
              <p className="text-xs-center">
                Check your email for a confirmation code.
              </p>

              <ListErrors errors={errors} />

              {redirectTo &&
                redirectTo !== this.props.location.pathname &&
                <Redirect to={redirectTo} />}

              <form onSubmit={this.handleSubmitForm}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={this.handleEmailChange}
                  />
                </fieldset>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Code"
                      value={values.code}
                      onChange={this.handleCodeChange}
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={inProgress}
                  >
                    Confirm
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
