import BasicPage from "../lib/BasicPage";
import React from "react";
import { inject, observer } from "mobx-react";
import RedirectIfLoggedOut from "./RedirectIfLoggedOut.js";
import {
  Checkbox,
  Panel,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";

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
  handlePasswordSubmitForm = e => {
    e.preventDefault();
    this.props.authStore.changePassword();
  };
  handleCheckbox = e => {
    this.props.authStore.setDeleteButton(e.target.value);
  };
  handleDeleteSubmitForm = e => {
    e.preventDefault();
    this.props.authStore
      .deleteAccount()
      .then(() => this.props.history.replace("/"));
  };

  render() {
    const { inProgress } = this.props.authStore;

    const columnOne = (
      <Panel header={<h3>Change password</h3>}>
        <form onSubmit={this.handlePasswordSubmitForm}>
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
            Change password
          </Button>
        </form>
      </Panel>
    );

    const columnTwo = (
      <Panel header={<h3>Delete account</h3>}>
        <form onSubmit={this.handleDeleteSubmitForm}>
          <FormGroup>
            <Checkbox onChange={this.handleCheckbox}>
              Are you sure you want to delete your account?
            </Checkbox>
          </FormGroup>
          <Button type="submit" bsStyle="danger" disabled={inProgress}>
            Delete account
          </Button>
        </form>
      </Panel>
    );

    return (
      <BasicPage
        title="Account Settings"
        columnOne={columnOne}
        columnTwo={columnTwo}
      >
        <RedirectIfLoggedOut />
      </BasicPage>
    );
  }
}
