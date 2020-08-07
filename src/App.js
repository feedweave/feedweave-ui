import React, { useState } from "react";
import { Router } from "@reach/router";

import "./App.css";

import Main from "./pages/Main";
import Home from "./pages/Home";
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";
import User from "./pages/User";
import Following from "./pages/Following";

import ScrollToTop from "./components/ScrollToTop";

import { UserContext, fetchUser } from "./util";

function NewApp() {
  const cachedUser = JSON.parse(window.localStorage.getItem("user"));
  const [user, setUser] = useState(cachedUser);

  const handleUser = (updatedUser) => {
    window.localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const declineOnboarding = () => {
    window.localStorage.setItem("declinedOnboarding", "yes");
  };

  const reloadUser = async () => {
    if (cachedUser) {
      const updatedUserInfo = await fetchUser(cachedUser.address);
      handleUser({ ...cachedUser, userInfo: updatedUserInfo.user });
    }
  };

  return (
    <UserContext.Provider
      value={{ user, handleUser, reloadUser, declineOnboarding }}
    >
      <Router style={{ height: "100%" }} primary={false}>
        <ScrollToTop path="/">
          <Main path="/">
            <Home path="/" />
            <Following path="/following" />
            <Post path="/post/:txId" />
            <NewPost path="/new-post" />
            <User path="/user/:address/*" />
          </Main>
        </ScrollToTop>
      </Router>
    </UserContext.Provider>
  );
}

export default NewApp;
