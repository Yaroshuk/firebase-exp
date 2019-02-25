import React from 'react';
import FormWrapper from '../../components/FormWrapper';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

class VerifyCodeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Code: '',
      CodeValid: '',
      CodeTouched: '',
      formValid: false
    }
  }

  onChange = (event) => {
    const {name, value} = event.target;
    let {CodeValid} = this.state;

    switch (name) {
      case 'Code':
        value.length === 0 || value.length !== 6
          ? CodeValid= false
          : CodeValid = true;
        break;
    }

    this.setState({
      [name]: value,
      [`${name}Touched`]: true,
      CodeValid,
    }, this.validateForm)
  };

  validateForm = () => {
    const {CodeValid} = this.state;

    this.setState({
      formValid: CodeValid
    })
  };

  render() {
    const {onSubmit} = this.props;
    const {Code, CodeValid, CodeTouched, formValid} = this.state;

    return (
      <FormWrapper>
        <form onSubmit={onSubmit}>
          <div className="form-head">
            <p>We just texted you! Please enter the verification code.</p>
          </div>

          <div className="form-content">
            <CustomInput
              name="Code"
              error={!CodeValid}
              touched={CodeTouched}
              placeholder="Enter Verification Code"
              icon="code"
              onChange={this.onChange}
              onFocus={this.onChange}
              onBlur={this.onChange}
              value={Code}
            />
          </div>

          <div className="form-control">
            <CustomButton
              disabled={!formValid}
              type="submit"
              text="login"
            />
          </div>
        </form>
      </FormWrapper>
    )
  }
};

export default VerifyCodeForm;