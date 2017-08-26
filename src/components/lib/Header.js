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
        <NavItem>Sign in</NavItem>
      </LinkContainer>

      <LinkContainer to="/register">
        <NavItem>Sign up</NavItem>
      </LinkContainer>
    </Nav>
  );
};

const LoggedInAccount = props => {
  return (
    <Navbar.Collapse>
      <Navbar.Text>
        Logged in as: <b>{props.currentUser}</b>
      </Navbar.Text>
    </Navbar.Collapse>
  );
};

const LoggedInView = () => {
  return (
    <Nav pullRight>
      <LinkContainer to="/">
        <NavItem>Home</NavItem>
      </LinkContainer>

      <LinkContainer to="/logout">
        <NavItem>Logout</NavItem>
      </LinkContainer>
    </Nav>
  );
};

@inject("commonStore", "authStore")
class Header extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              {this.props.commonStore.appName.toLowerCase()}
            </Link>
          </Navbar.Brand>
        </Navbar.Header>

        {this.props.authStore.currentUser
          ? <div>
              <LoggedInAccount currentUser={this.props.authStore.currentUser} />
              <LoggedInView />
            </div>
          : <LoggedOutView />}
      </Navbar>
    );
  }
}

export default Header;
