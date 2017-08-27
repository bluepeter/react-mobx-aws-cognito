import React from "react";
import { Redirect } from "react-router-dom";
import { inject } from "mobx-react";

@inject("authStore")
export default class RedirectIfLoggedOut extends React.Component {
  render() {
    return this.props.authStore.currentUser
      ? null
      : <Redirect to="/login" message="tes" />;
  }
}
