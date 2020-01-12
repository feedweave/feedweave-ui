import React from "react";
import { Router } from "@reach/router";

import "./App.css";

import Main from "./pages/Main";
import Home from "./pages/Home";
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";
import User from "./pages/User";
import YourFeed from "./pages/YourFeed";
// import Following from "./pages/Following";

import { UserContext } from "./util";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleUser = this.handleUser.bind(this);

    const cachedUser = JSON.parse(window.localStorage.getItem("user"));
    this.state = {
      user: cachedUser,
      handleUser: this.handleUser
    };
  }

  handleUser(user) {
    window.localStorage.setItem("user", JSON.stringify(user));
    this.setState({ user });
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        <Router primary={false}>
          <Main path="/">
            <Home path="/" />
            <YourFeed path="/my-feed" />
            <Post path="/post/:txId" />
            <NewPost path="/new-post" />
            <User path="/user/:walletId/*" />
          </Main>
        </Router>
      </UserContext.Provider>
    );
  }
}

export default App;
