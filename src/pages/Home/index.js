import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import app from "../../base";

import Home from "./Home";

class HomeContainer extends Component {
  handleSignOut = async event => {
    event.preventDefault();
    try {
      await app
        .auth()
        .signOut();
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <Home
        signOut={this.handleSignOut}
      />
    );
  }
}

export default withRouter(HomeContainer);