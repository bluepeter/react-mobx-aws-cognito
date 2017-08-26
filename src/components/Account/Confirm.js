import { Redirect } from "react-router-dom";
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
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>Confirm code</h1>
            <p>Check your email for a confirmation code.</p>

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
                  type="text"
                  placeholder="Code"
                  value={values.code}
                  onChange={this.handleCodeChange}
                />
              </FormGroup>

              <Button
                bsSize="large"
                bsStyle="primary"
                type="submit"
                disabled={inProgress}
              >
                Confirm
              </Button>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
