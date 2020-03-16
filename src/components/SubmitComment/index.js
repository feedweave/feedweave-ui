import React from "react";
import { Form } from "semantic-ui-react";

import SaveTransactionWithConfirmationButton from "../../components/SaveTransactionWithConfirmationButton";
import { UserContext } from "../../util";

const tags = {
  "App-Name": "transaction-comment",
  "App-Version": "0.0.1",
  "Parent-App-Name": "FEEDweave"
};

class SubmitComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  static contextType = UserContext;

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  onSave() {
    this.setState({ text: "" });
    this.props.onSave();
  }

  render() {
    const { user: loggedInUser } = this.context;
    const { text } = this.state;

    const { txId } = this.props;

    if (!loggedInUser) {
      return null;
    }
    return (
      <Form reply>
        <Form.TextArea value={text} onChange={this.handleChange} />
        <SaveTransactionWithConfirmationButton
          data={text}
          tags={{ ...tags, "Transaction-ID": txId }}
          user={loggedInUser}
          onSave={this.onSave}
          buttonText="Post comment"
          color="primary"
        />
      </Form>
    );
  }
}

export default SubmitComment;
