import React from "react";
import ListErrors from "./ListErrors";
import { Grid, Row, Col, Alert } from "react-bootstrap";
import { inject, observer } from "mobx-react";

@inject("authStore")
@observer
export default class BasicPage extends React.Component {
  render() {
    const props = this.props;
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>
              {props.title}
            </h1>
          </Col>
        </Row>
      {( this.props.authStore.message || this.props.authStore.errors) &&
        <Row>
          <Col xs={8} xsOffset={2}>
            <ListErrors errors={this.props.authStore.errors} />
            {this.props.authStore.message &&
              <Alert bsStyle="success">
                {this.props.authStore.message}
              </Alert>}
          </Col>
        </Row>}

        <Row>
          <Col xs={12}>
            {props.children}
          </Col>
        </Row>
        {props.columnOne &&
          <Row>
            <Col xs={6}>
              {props.columnOne}
            </Col>
            <Col xs={6}>
              {props.columnTwo}
            </Col>
          </Row>}
      </Grid>
    );
  }
}
