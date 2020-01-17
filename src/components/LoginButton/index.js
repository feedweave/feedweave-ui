import React from "react";
import { Button } from "reactstrap";

import { navigate } from "@reach/router";
import { arweave, getUserInfo } from "../../util";

import { UserContext } from "../../util";

class LoginButton extends React.Component {
  constructor(props) {
    super(props);

    this.inputFileRef = React.createRef();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  static contextType = UserContext;

  handleButtonClick = e => {
    e.preventDefault();
    this.inputFileRef.current.click();
  };

  handleFileChange = e => {
    e.preventDefault();

    const file = this.inputFileRef.current.files[0];
    const reader = new FileReader();

    const { handleUser } = this.context;

    reader.onload = async () => {
      try {
        const wallet = JSON.parse(reader.result);
        const address = await arweave.wallets.jwkToAddress(wallet);
        const { user: userInfo } = await getUserInfo(address).then(res =>
          res.json()
        );
        handleUser({ wallet, address, userInfo });
        navigate("/my-feed");
      } catch (error) {
        alert(error.toString());
      }
    };
    reader.readAsText(file);
  };

  render() {
    return (
      <div>
        <Button color="link" onClick={this.handleButtonClick}>
          Log in/Sign up
        </Button>
        <input
          ref={this.inputFileRef}
          type="file"
          style={{ display: "none" }}
          accept="application/json"
          onChange={this.handleFileChange}
        />
      </div>
    );
  }
}

export default LoginButton;
