import Banner from "./Banner";
import MainView from "./MainView";
import React from "react";
import { inject } from "mobx-react";

@inject("commonStore")
export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Banner appName={this.props.commonStore.appName} />
        <MainView />
      </div>
    );
  }
}
