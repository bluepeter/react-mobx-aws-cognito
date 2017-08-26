import { Link, Redirect } from "react-router-dom";
import ListErrors from "../lib/ListErrors";
import React from "react";
import { inject, observer } from "mobx-react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  Button
} from "react-bootstrap";

@inject("authStore")
@observer
export default class Login extends React.Component {
  componentWillUnmount() {
    this.props.authStore.reset();
  }

  handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
  handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
  handleSubmitForm = e => {
    e.preventDefault();
    this.props.authStore.login();
  };

  render() {
    const { values, errors, inProgress, redirectTo } = this.props.authStore;

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>Sign In</h1>
            <p>
              {values.message
                ? <b>
                    {values.message}
                  </b>
                : <Link to="register">Need an account?</Link>}
            </p>

            <ListErrors errors={errors} />

            {redirectTo &&
              redirectTo !== this.props.location.pathname &&
              <Redirect to={redirectTo} />}

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
                  value={values.password}
                  onChange={this.handlePasswordChange}
                />
              </FormGroup>

              <Button
                bsSize="large"
                bsStyle="primary"
                type="submit"
                disabled={inProgress}
              >
                Sign in
              </Button>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
