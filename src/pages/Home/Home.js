import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import ContentWrapper from '../../components/ContentWrapper';
import CustomButton from '../../components/CustomButton';
import './style.css';

class Home extends React.Component {
  render() {
    return (
      <PageWrapper>
        <ContentWrapper>
          <h1>Hello</h1>
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