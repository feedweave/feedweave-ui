import React from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  FormFeedback,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormText
} from "reactstrap";

import debounce from "lodash/debounce";

import styles from "./index.module.css";

import { fetchUserByArweaveID, UserContext } from "../../util";

import SaveTransactionWithConfirmationButton from "../../components/SaveTransactionWithConfirmationButton";

const arweaveIdTags = {
  "App-Name": "arweave-id",
  "App-Version": "0.0.1",
  Type: "name"
};

const tagsWithTime = () => {
  return { ...arweaveIdTags, "Unix-Time": Math.floor(Date.now() / 1000) };
};

class SetUpIDButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      value: "",
      isValidationError: false
    };

    this.openModal = this.openModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.onSave = this.onSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkIdAvailability = debounce(
      this.checkIdAvailability.bind(this),
      300
    );
  }
  static contextType = UserContext;

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      value: "",
      isValidationError: false
    });
  }

  async openModal() {
    this.setState({
      isModalOpen: true
    });
  }

  async onSave() {
    this.toggleModal();
    this.props.onSave();
  }

  async checkIdAvailability() {
    const { value } = this.state;
    if (value === "") {
      this.setState({ isLoading: false });
      return;
    }

    try {
      const user = await fetchUserByArweaveID(value);

      if (user) {
        this.setState({ isValidationError: true });
      }
    } catch (e) {
      //TODO handle error
    }
    this.setState({ isLoading: false });
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      isValidationError: false,
      isLoading: true
    });
    this.checkIdAvailability();
  }
  render() {
    const { isModalOpen, value, isValidationError, isLoading } = this.state;
    const { user } = this.context;
    const isSubmitEnabled = !isLoading && !isValidationError && value !== "";
    const tags = tagsWithTime();
    return (
      <div>
        <Button
          onClick={this.openModal}
          className={styles.registerNameButton}
          color="primary"
          size="sm"
        >
          Set up ID
        </Button>
        <Modal isOpen={isModalOpen} toggle={this.toggleModal} autoFocus={false}>
          <ModalHeader toggle={this.toggleModal}>
            Register ArweaveID
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>@</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    autoFocus
                    placeholder="satoshi"
                    onChange={this.handleChange}
                    value={value}
                    invalid={isValidationError}
                  />
                </InputGroup>

                {isValidationError ? (
                  <FormFeedback style={{ display: "block" }}>
                    This name is already taken.
                  </FormFeedback>
                ) : null}
                <FormText>
                  Choose a human-readable name to associate with your address.
                </FormText>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <SaveTransactionWithConfirmationButton
              data={value}
              tags={tags}
              user={user}
              onSave={this.onSave}
              buttonText="Submit"
              color="primary"
              disabled={!isSubmitEnabled}
            />
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SetUpIDButton;
