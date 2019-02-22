import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import ContentWrapper from '../../components/ContentWrapper';
import CustomButton from '../../components/CustomButton';

class Home extends React.Component {
  render() {
    const {user:{displayName}} = this.props;

    return (
      <PageWrapper>
        <ContentWrapper>
          <h1>Hello, {displayName}</h1>
          <CustomButton
            onClick={this.props.signOut}
            text="logout"
          />
        </ContentWrapper>
      </PageWrapper>
    )
  }
}

export default Home;