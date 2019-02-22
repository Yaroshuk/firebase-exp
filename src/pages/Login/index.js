import React from 'react';
import Routes from '../../routes';
import { withRouter } from 'react-router-dom'
import PageWrapper from '../../components/PageWrapper';
import ContentWrapper from '../../components/ContentWrapper';
import CustomButton from '../../components/CustomButton';
import './style.css';

class Login extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <PageWrapper className="login-page">
        <ContentWrapper>
          <CustomButton
            className="login-button"
            onClick={() => {history.push(Routes.signUp)}}
            text="sign up"
          />
          <CustomButton
            className="login-button"
            onClick={() => {history.push(Routes.signIn)}}
            text="log in"
          />
        </ContentWrapper>
      </PageWrapper>
    )
  }
};

export default withRouter(Login);