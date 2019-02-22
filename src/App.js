import React, { Component } from 'react';
import {compose} from 'redux';
import { connect } from 'react-redux';
import { setUser } from './actions';
import Routes from './routes';
import {Switch, withRouter} from 'react-router-dom';
import PageWrapper from './components/PageWrapper';
import ContentWrapper from './components/ContentWrapper';
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateRouter from './PrivateRouter';
import LoginRoutes from './LoginRouter';
import VerifyCode from './pages/VerifyCode';
import app from './base';

class App extends Component {
  componentDidMount() {
    const { setUser, history, location} = this.props;

    app.auth().onAuthStateChanged(user => {

      setUser(user);

      if (user && (
          location.pathname === Routes.login
          || location.pathname === Routes.signUp
          || location.pathname === Routes.signIn)){
        history.push(Routes.home);
      }
    });
  }

  render() {
    const {user, isLoaded} = this.props;

    if (!isLoaded) {
      return (
        <PageWrapper>
          <ContentWrapper>
            Loading...
          </ContentWrapper>
        </PageWrapper>
      );
    }

    return (
      <div>
        <Switch>
          <LoginRoutes authenticated={!!user} exact path={Routes.login} component={Login}/>
          <LoginRoutes authenticated={!!user} path={Routes.signIn} component={SignIn}/>
          <LoginRoutes authenticated={!!user} path={Routes.signUp} component={SignUp}/>
          <LoginRoutes authenticated={!!user} path={Routes.verifyCode} component={VerifyCode}/>
          <PrivateRouter authenticated={!!user} path={Routes.home} component={Home}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoaded: state.isLoaded,
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user))
  }
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
