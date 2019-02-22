import React from "react";
import SignUpForm from '../../components/SignUpForm';
import VerifyCodeForm from '../../components/VerifyCodeForm';
import PageWrapper from '../../components/PageWrapper';
import ContentWrapper from '../../components/ContentWrapper';
import ErrorContainer from '../../components/ErrorContainer';

const SignUp = ({ isConfirmation, onSubmit, error }) => {

  if (isConfirmation) {
    return (
      <PageWrapper>
        <ContentWrapper>
          <VerifyCodeForm onSubmit={onSubmit} />
          <ErrorContainer error={error} />
        </ContentWrapper>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <ContentWrapper>
        <SignUpForm onSubmit={onSubmit} />
        <ErrorContainer error={error} />
      </ContentWrapper>
    </PageWrapper>
  );
};

export default SignUp;