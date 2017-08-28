import React from "react";
import { Alert } from "react-bootstrap";

export default class ListErrors extends React.Component {
  render() {
    const errors = this.props.errors;
    if (errors) {
      return (
        <Alert bsStyle="warning">
          <ul className="error-messages">
            {Object.keys(errors).map(key => {
              if (errors[key]) {
                return (
                  <li key={key}>
                    {key}: {errors[key]}
                  </li>
                );
              }
            })}
          </ul>
        </Alert>
      );
    } else {
      return null;
    }
  }
}
