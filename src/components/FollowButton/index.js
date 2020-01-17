import React from "react";

import SaveTransactionWithConfirmationButton from "../SaveTransactionWithConfirmationButton";

import {
  UserContext,
  getUserInfo,
  SOCIAL_GRAPH_APP_NAME,
  SOCIAL_GRAPH_APP_VERSION,
  APP_NAME
} from "../../util";

const generateTags = action => {
  return {
    "App-Name": SOCIAL_GRAPH_APP_NAME,
    "App-Version": SOCIAL_GRAPH_APP_VERSION,
    Action: action,
    "App-Filter": APP_NAME
  };
};

class FollowButton extends React.Component {
  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);
  }

  static contextType = UserContext;

  async onSave() {
    const { user, handleUser } = this.context;
    const updatedUserInfo = await getUserInfo(user.address).then(res =>
      res.json()
    );
    handleUser({ ...user, userInfo: updatedUserInfo });
  }

  render() {
    const { walletId: followAddress } = this.props;
    const { user } = this.context;
    const {
      userInfo: { followingIds }
    } = user;

    const isFollowing = followingIds.indexOf(followAddress) > -1;

    const action = isFollowing ? "unfollow" : "follow";

    return (
      <SaveTransactionWithConfirmationButton
        data={followAddress}
        tags={generateTags(action)}
        user={user}
        onSave={this.onSave}
        buttonText={action.charAt(0).toUpperCase() + action.slice(1)}
        color="primary"
        size="sm"
      />
    );
  }
}

export default FollowButton;
