import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

const BasicPage = ({ title }) => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <h1>
            {title}
          </h1>
        </Col>
      </Row>
    </Grid>
  );
};

export default BasicPage;
