import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

import styles from "./index.module.css";

import { UserContext } from "../../util";
import SaveTransactionWithConfirmationButton from "../SaveTransactionWithConfirmationButton";

const tags = {
  "App-Name": "identity-link",
  "App-Version": "0.0.1",
  Provider: "twitter",
};

class VerifyTwitterButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      activePage: 0,
      twitterHandle: "",
    };

    this.openModal = this.openModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.postToTwitter = this.postToTwitter.bind(this);
    this.handleTwitterNameChange = this.handleTwitterNameChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  static contextType = UserContext;

  handleTwitterNameChange(event) {
    this.setState({ twitterHandle: event.target.value });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      activePage: 0,
      twitterHandle: "",
    });
  }

  async openModal() {
    this.setState({
      isModalOpen: true,
    });
  }

  nextPage() {
    const { activePage } = this.state;
    this.setState({ activePage: activePage + 1 });
  }

  renderPageZero() {
    return (
      <div>
        <ModalHeader toggle={this.toggleModal}>
          Link identity to Twitter
        </ModalHeader>
        <ModalBody>
          <p>
            Linking your Twitter account displays your avatar and verifies your
            identity, so people know who you are.
          </p>
          <ol>
            <li>Post a tweet with your Arweave address.</li>
            <li>Submit an Arweave transaction with your Twitter handle.</li>
            <li>See your Twitter name and avatar on your profile.</li>
          </ol>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.nextPage}>
            Let's go
          </Button>{" "}
        </ModalFooter>
      </div>
    );
  }

  postToTwitter() {
    const {
      user: { userInfo },
    } = this.context;
    const msg = `I am verifying myself on @FEEDweave_! My Arweave address is ${userInfo.id}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${msg}`,
      "mywin",
      "left=20,top=20,width=500,height=448,toolbar=1,resizable=0"
    );
    this.nextPage();
  }

  onSave() {
    this.toggleModal();
  }

  renderPageOne() {
    const { user } = this.context;
    const { twitterHandle } = this.state;
    return (
      <div>
        <ModalHeader toggle={this.toggleModal}>
          Submit proof of identity
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Arweave address</Label>
              <Input
                type="text"
                name="address"
                value={user.userInfo.id}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label>Twitter name</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>@</InputGroupText>
                </InputGroupAddon>
                <Input
                  type="text"
                  name="handle"
                  placeholder="Enter your Twitter handle"
                  onChange={this.handleTwitterNameChange}
                  value={twitterHandle}
                />
              </InputGroup>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={this.postToTwitter}
            disabled={twitterHandle === ""}
          >
            Post to Twitter
          </Button>{" "}
        </ModalFooter>
      </div>
    );
  }

  renderPageTwo() {
    const {
      user: {
        userInfo: { id },
      },
    } = this.context;
    const { twitterHandle } = this.state;
    const headerChildren = (
      <div className={styles.twitterWidget}>
        <div className={styles.twitterWidgetAvatar}>
          <img
            alt="twitter-avatar"
            src={`https://unavatar.now.sh/twitter/${twitterHandle}`}
          />
        </div>
        <div className={styles.twitterWidgetMetadata}>
          <div className={styles.twitterHandle}>
            <a href={`https://twitter.com/${twitterHandle}`}>
              @{twitterHandle}
            </a>
          </div>
          <div>{id}</div>
        </div>
      </div>
    );
    return (
      <div>
        <ModalHeader toggle={this.toggleModal}>
          Submit proof of identity
        </ModalHeader>
        <ModalBody>{headerChildren}</ModalBody>
        <ModalFooter>
          <SaveTransactionWithConfirmationButton
            data={twitterHandle}
            tags={tags}
            user={this.context.user}
            onSave={this.onSave}
            buttonText="Submit transaction"
            color="primary"
          />
        </ModalFooter>
      </div>
    );
  }

  renderPage(number) {
    if (number === 0) {
      return this.renderPageZero();
    }

    if (number === 1) {
      return this.renderPageOne();
    }

    if (number === 2) {
      return this.renderPageTwo();
    }
  }
  render() {
    const { isModalOpen, activePage } = this.state;
    return (
      <div>
        <Button color="primary" size="sm" onClick={this.openModal}>
          Verify Twitter
        </Button>
        <Modal isOpen={isModalOpen} toggle={this.toggleModal}>
          {this.renderPage(activePage)}
        </Modal>
      </div>
    );
  }
}

export default VerifyTwitterButton;
