import React from "react";
import ListErrors from "./ListErrors";
import { Grid, Row, Col, Alert } from "react-bootstrap";
import { inject, observer } from "mobx-react";

@inject("authStore")
@observer
export default class BasicPage extends React.Component {
  render() {
    const { title, authStore, children, columnOne, columnTwo } = this.props;
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>{title}</h1>
          </Col>
        </Row>
        {(authStore.message || authStore.errors) && (
          <Row>
            <Col xs={8} xsOffset={2}>
              <ListErrors errors={authStore.errors} />
              {authStore.message && (
                <Alert bsStyle="success">{authStore.message}</Alert>
              )}
            </Col>
          </Row>
        )}

        <Row>
          <Col xs={12}>{children}</Col>
        </Row>
        {columnOne && (
          <Row>
            <Col xs={6}>{columnOne}</Col>
            <Col xs={6}>{columnTwo}</Col>
          </Row>
        )}
      </Grid>
    );
  }
}
