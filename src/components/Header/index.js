import React from "react";
import { Link, navigate } from "@reach/router";

import { Button, Container, Navbar, Nav, NavItem, NavLink } from "reactstrap";

import { UserContext } from "../../util";

import LoginButton from "../LoginButton";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  static contextType = UserContext;

  handleLogout = () => {
    const { handleUser } = this.context;

    navigate("/");
    handleUser(null);
  };

  render() {
    const { user } = this.context;
    return (
      <Navbar color="light" light expand="md" style={{ marginBottom: "2rem" }}>
        <Container>
          <Link to="/">
            <div className="navbar-brand">
              {" "}
              <strong>ARWEAVE</strong> social
            </div>
          </Link>
          {user ? (
            <Nav pills>
              <NavItem>
                <Link style={{ textDecoration: "none" }} to="/new-post">
                  <Button color="link">New Post</Button>
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link active" to={`/user/${user.address}`}>
                  Wallet
                </Link>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.handleLogout}>
                  Log out
                </NavLink>
              </NavItem>
            </Nav>
          ) : (
            <Nav>
              <NavItem>
                <LoginButton />
              </NavItem>
            </Nav>
          )}
        </Container>
      </Navbar>
    );
  }
}

export default Header;
