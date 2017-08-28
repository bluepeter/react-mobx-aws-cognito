import { Link, withRouter } from "react-router-dom";
import BasicPage from "../lib/BasicPage";
import React from "react";
import { inject, observer } from "mobx-react";
import { FormGroup, FormControl, Button } from "react-bootstrap";

@inject("authStore")
@withRouter
@observer
export default class Login extends React.Component {
  componentWillUnmount() {
    this.props.authStore.reset();
  }

  handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
  handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
  handleSubmitForm = e => {
    e.preventDefault();
    this.props.authStore.login().then(() => this.props.history.replace("/"));
  };

  render() {
    const { values, inProgress } = this.props.authStore;

    return (
      <BasicPage title="Login">
        <p>
          <Link to="register">Need an account?</Link>
        </p>

        <form onSubmit={this.handleSubmitForm}>
          <FormGroup>
            <FormControl
              type="email"
              placeholder="Email"
              value={values.email}
              onChange={this.handleEmailChange}
            />
          </FormGroup>

          <FormGroup>
            <FormControl
              type="password"
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />
          </FormGroup>

          <Button
            bsSize="large"
            bsStyle="primary"
            type="submit"
            disabled={inProgress}
          >
            Login
          </Button>
        </form>
      </BasicPage>
    );
  }
}
