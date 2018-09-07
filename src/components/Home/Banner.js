import React from "react";
import { Jumbotron, Grid, Row, Col } from "react-bootstrap";

const Banner = ({ appName }) => (
  <Jumbotron>
    <Grid>
      <Row>
        <Col xs={12}>
          <h1>{appName.toLowerCase()}</h1>
          <p>A React.js & AWS Cognito starter.</p>
        </Col>
      </Row>
    </Grid>
  </Jumbotron>
);

export default Banner;
