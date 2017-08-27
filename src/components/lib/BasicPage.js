import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

const BasicPage = props => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <h1>
            {props.title}
          </h1>
          {props.children}
        </Col>
      </Row>
    </Grid>
  );
};

export default BasicPage;
