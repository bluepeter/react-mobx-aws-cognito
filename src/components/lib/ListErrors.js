import React from "react";
import { Alert } from "react-bootstrap";

export default class ListErrors extends React.Component {
  render() {
    const { errors } = this.props;
    if (errors) {
      return (
        <Alert bsStyle="warning">
          <ul className="error-messages">
            {Object.keys(errors).map(
              key =>
                errors[key] ? (
                  <li key={key}>
                    {key}: {errors[key]}
                  </li>
                ) : null
            )}
            )}
          </ul>
        </Alert>
      );
    } else {
      return null;
    }
  }
}
