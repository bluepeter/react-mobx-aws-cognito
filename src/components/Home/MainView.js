import React from "react";
import { inject, observer } from "mobx-react";
import { withRouter, NavLink } from "react-router-dom";
import { parse as qsParse } from "query-string";

@inject("commonStore", "userStore")
@withRouter
@observer
export default class MainView extends React.Component {
  render() {
    const { currentUser } = this.props.userStore;

    return (
      <div className="col-md-9">
        <h1>
          Hello {currentUser && currentUser.userName}!
        </h1>
      </div>
    );
  }
}
