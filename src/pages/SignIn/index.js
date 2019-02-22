import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import app from "../../base";
import firebase from "firebase";

import SignInView from "./SignIn";

class SignInContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verifyStep: false,
      conf: null,
      error: null,
      phone: null
    }
  }

  setError = (error) => {
    if (!error)
      return this.setError({error: null});

    const errorMessage = `${error.code ? error.code : ''} ${error.message  ? error.message : ''}`;

    this.setState({
      error: errorMessage
    });
  };

  loginUser = (Phone) => {
    const appVerifier = window.recaptchaVerifier;

    firebase.auth().useDeviceLanguage();

    app.auth().signInWithPhoneNumber(Phone.value, appVerifier)
      .then((confirmationResult) => {
        this.setState({
          verifyStep: true,
          conf: confirmationResult,
          phone: Phone.value
        })
      }).catch((error) => {
      this.setError(error);
    });
  };

  handleSignUp = (event) => {
    event.preventDefault();
    const { Phone } = event.target.elements;

    this.setError(null);

    const usersRef = firebase.database().ref('/users');

    const userRef = usersRef.child(Phone.value);

    userRef.once('value').then((snapshot) => {
      if (snapshot.val()) {
        this.loginUser(Phone);
      } else {
        this.setError({message: "This user is not registered please SingUp"} );
      }
    });
  };

  verifySignUp = (event) => {
    event.preventDefault();
    const { Code } = event.target.elements;
    const { conf } = this.state;

    this.setError(null);

    conf.confirm(Code.value).then(() => {
    }).catch((error) => {
      this.setError(error);
    });
  };

  render() {
    const {verifyStep, error} = this.state;

    if (verifyStep) {
      return <SignInView error={error} isConfirmation onSubmit={this.verifySignUp} />
    }

    return (
      <SignInView error={error} onSubmit={this.handleSignUp} />
    )
  }
}

export default withRouter(SignInContainer);