import React from "react";
import { Link, navigate } from "@reach/router";

import { Button, Container, Navbar, Nav, NavItem, NavLink } from "reactstrap";

import { arweave, getUserInfo } from "../../util";

import { UserContext } from "../../util";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.inputFileRef = React.createRef();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  static contextType = UserContext;

  handleLogout = () => {
    const { handleUser } = this.context;

    handleUser(null);
    navigate("/");
  };

  handleButtonClick = e => {
    this.inputFileRef.current.click();
    e.preventDefault();
  };

  handleFileChange = e => {
    e.preventDefault();

    const file = this.inputFileRef.current.files[0];
    const reader = new FileReader();

    const { handleUser } = this.context;

    reader.onload = async () => {
      try {
        const data = reader.result;
        const wallet = JSON.parse(data);
        const address = await arweave.wallets.jwkToAddress(wallet);
        const userInfo = await getUserInfo(address).then(res => res.json());
        const userData = { wallet, address, userInfo };
        handleUser(userData);
        navigate("/my-feed");
      } catch (error) {
        alert(error.toString());
      }
    };
    reader.readAsText(file);
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
                <NavLink
                  active
                  href={`https://explorer.arweave.co/address/${user.address}`}
                >
                  Wallet
                </NavLink>
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
                <NavLink href="#" active onClick={this.handleButtonClick}>
                  Log in with wallet
                </NavLink>
                <input
                  ref={this.inputFileRef}
                  type="file"
                  style={{ display: "none" }}
                  accept="application/json"
                  onChange={this.handleFileChange}
                />
              </NavItem>
            </Nav>
          )}
        </Container>
      </Navbar>
    );
  }
}

export default Header;
