import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from "reactstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import Login from "./auth/Login";

class AppNavBar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      //Pass in state obj
      isOpen: !this.state.isOpen
    });
  };

  render() {
    // all state val
    const { isAuthenticated, user } = this.props.auth;

    const authLink = (
      <React.Fragment>
        <NavItem>
          <span className="navbar-text mr-3 text-capitalize">
            <strong>{user ? `Welcome ${user.name}!` : null}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </React.Fragment>
    );
    const guestLink = (
      <React.Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <Login />
        </NavItem>
      </React.Fragment>
    );
    return (
      <div>
        <Navbar color="dark" dark expand="sm">
          <Container>
            <NavbarBrand href="/">Shopping List</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLink : guestLink}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppNavBar);
