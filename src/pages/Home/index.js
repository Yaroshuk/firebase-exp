import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
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
    const { user } = this.props;

    return (
      <Home
        user={user}
        signOut={this.handleSignOut}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

export default withRouter(connect(mapStateToProps)(HomeContainer));