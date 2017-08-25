import Header from "./lib/Header";
import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

import Login from "./Account/Login";
import Confirm from "./Account/Confirm";
import Register from "./Account/Register";
import Home from "./Home";

@inject("commonStore")
@withRouter
@observer
export default class App extends React.Component {
  componentWillMount() {
    //if (this.props.commonStore.token) {
    //this.props.userStore
    //.pullUser()
    //.finally(() => this.props.commonStore.setAppLoaded());
    //} else {
    this.props.commonStore.setAppLoaded();
    //}
  }

  render() {
    if (this.props.commonStore.appLoaded) {
      return (
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser}
          />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register/confirm" component={Confirm} />
            <Route path="/register" component={Register} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      );
    }
    return <Header />;
  }
}
