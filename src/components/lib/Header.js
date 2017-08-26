import React from "react";
import { Link } from "react-router-dom";
import { inject } from "mobx-react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";

const LoggedOutView = () => {
  return (
    <Nav pullRight>
      <IndexLinkContainer to="/">
        <NavItem>Home</NavItem>
      </IndexLinkContainer>

      <LinkContainer to="/login">
        <NavItem>Login</NavItem>
      </LinkContainer>

      <LinkContainer to="/register">
        <NavItem>Sign up</NavItem>
      </LinkContainer>
    </Nav>
  );
};

const LoggedInAccount = props => {
  return (
    <Navbar.Text>
      Logged in as: <b>{props.currentUser}</b>
    </Navbar.Text>
  );
};

const LoggedInView = () => {
  return (
    <Navbar.Collapse>
      <Nav pullRight>
        <LinkContainer to="/">
          <NavItem>Dashboard</NavItem>
        </LinkContainer>

        <LinkContainer to="/settings">
          <NavItem>Settings</NavItem>
        </LinkContainer>

        <LinkContainer to="/logout">
          <NavItem>Logout</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  );
};

@inject("commonStore", "authStore")
export default class Header extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              {this.props.commonStore.appName.toLowerCase()}
            </Link>
          </Navbar.Brand>
          {this.props.authStore.currentUser &&
            <LoggedInAccount currentUser={this.props.authStore.currentUser} />}
          <Navbar.Toggle />
        </Navbar.Header>

        {this.props.authStore.currentUser
          ? <LoggedInView />
          : <LoggedOutView />}
      </Navbar>
    );
  }
}
