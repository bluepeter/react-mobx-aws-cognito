import React from "react";
import { Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject("authStore")
export default class App extends React.Component {
  componentWillMount() {
    this.props.authStore.logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}
