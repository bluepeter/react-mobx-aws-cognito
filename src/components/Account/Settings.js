import BasicPage from "../lib/BasicPage";
import React from "react";
import { inject, observer } from "mobx-react";
import RedirectIfLoggedOut from "./RedirectIfLoggedOut.js";
import { Panel, FormGroup, FormControl, Button } from "react-bootstrap";

@inject("authStore")
@observer
export default class Settings extends React.Component {
  componentWillUnmount() {
    this.props.authStore.reset();
  }
  handleOldPassChange = e =>
    this.props.authStore.setOldPassword(e.target.value);
  handleNewPassChange = e =>
    this.props.authStore.setNewPassword(e.target.value);
  handleSubmitForm = e => {
    e.preventDefault();
    this.props.authStore.changePassword().then(() => {});
  };

  render() {
    const { values, inProgress } = this.props.authStore;

    const columnOne = (
      <Panel header={<h3>Change password</h3>}>
        <form onSubmit={this.handleSubmitForm}>
          <FormGroup>
            <FormControl
              type="password"
              placeholder="Old password"
              onChange={this.handleOldPassChange}
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              type="password"
              placeholder="New password"
              onChange={this.handleNewPassChange}
            />
          </FormGroup>
          <Button type="submit" disabled={inProgress}>
            Submit
          </Button>
        </form>
      </Panel>
    );

    return (
      <BasicPage title="Account Settings" columnOne={columnOne}>
        <RedirectIfLoggedOut />
      </BasicPage>
    );
  }
}
