import Banner from "./Banner";
import MainView from "./MainView";
import React from "react";
import { inject } from "mobx-react";

@inject("commonStore")
export default class Home extends React.Component {
  render() {
    return (
      <div className="home-page">
        <Banner appName={this.props.commonStore.appName} />

        <div className="container page">
          <div className="row">
            <MainView />
          </div>
        </div>
      </div>
    );
  }
}
