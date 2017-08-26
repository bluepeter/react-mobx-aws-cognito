import React from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

const LoggedOutView = () => {
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Sign in
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Sign up
        </Link>
      </li>
    </ul>
  );
};

const LoggedInView = props => {
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>

      <li className="nav-item">
        <div className="nav-link">
          Logged in as: <b>{props.currentUser}</b>
        </div>
      </li>

      <li className="nav-item">
        <Link to="/logout" className="nav-link">
          Logout
        </Link>
      </li>
    </ul>
  );
};

@inject("commonStore", "authStore")
@observer
class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {this.props.commonStore.appName.toLowerCase()}
          </Link>

          {this.props.authStore.currentUser
            ? <LoggedInView currentUser={this.props.authStore.currentUser} />
            : <LoggedOutView />}
        </div>
      </nav>
    );
  }
}

export default Header;
