import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { setUser } from "../../actions";
import app from "../../base";
import firebase from "firebase";

import SignUpView from "./SignUp";

class SignUpContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verifyStep: false,
      name: '',
      conf: null,
      phone: null,
      error: null
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

  getRightPhone = (phone) => {
    return `+1${phone}`;
  };

  handleSignUp = (event) => {
    event.preventDefault();

    const { Phone, Name } = event.target.elements;

    this.setError(null);

    const usersRef = firebase.database().ref('/users');

    const userRef = usersRef.child(this.getRightPhone(Phone.value));

    userRef.once('value').then((snapshot) => {
      if (snapshot.val()) {
        this.setError({message: "This user has already exist please SingIn"} );
      } else {
        this.registerUser(Phone, Name);
      }
    });
  };

  registerUser = (Phone, Name) => {
    const appVerifier = window.recaptchaVerifier;

    firebase.auth().useDeviceLanguage();

    app.auth().signInWithPhoneNumber(this.getRightPhone(Phone.value), appVerifier)
      .then((confirmationResult) => {

        this.setState({
          verifyStep: true,
          name: Name.value,
          phone: this.getRightPhone(Phone.value),
          conf: confirmationResult
        })

      }).catch((error) => {
        this.setError(error);
    });
  };

  setUserInDatabase = () => {
    const { phone, name } = this.state;

    const usersRef = app.database().ref('/users');

    const userRef = usersRef.child(phone);

    userRef.once('value').then(() => {
      userRef.set(name);
    });
  };

  verifySignUp = (event) => {
    event.preventDefault();
    const { Code } = event.target.elements;
    const { conf, name } = this.state;
    const { setUser } = this.props;

    this.setError(null);

    conf.confirm(Code.value)
      .then((result) => {
        let user = result.user;

        user.updateProfile({
          displayName: name,
        }).then(() => {

          let newUser = app.auth().currentUser;

          setUser(newUser);

          this.setUserInDatabase();

        }).catch((error) => {
          this.setError(error);
        });

    }).catch((error) => {
      this.setError(error);
    });
  };

  render() {
    const {verifyStep, error} = this.state;

    if (verifyStep) {
      return <SignUpView error={error} isConfirmation onSubmit={this.verifySignUp} />
    }

    return (
      <SignUpView error={error} onSubmit={this.handleSignUp} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user))
  }
};


export default withRouter(connect(null, mapDispatchToProps)(SignUpContainer));