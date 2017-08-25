import React from "react";
import { inject, observer } from "mobx-react";
import { withRouter, NavLink } from "react-router-dom";
import { parse as qsParse } from "query-string";

@inject("commonStore")
@withRouter
@observer
export default class MainView extends React.Component {
  render() {
    return (
      <div className="col-md-9">
        <h1>Hello!</h1>
      </div>
    );
  }
}
