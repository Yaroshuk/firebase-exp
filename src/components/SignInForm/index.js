import React from 'react';
import firebase from 'firebase';
import FormWrapper from '../../components/FormWrapper';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Phone: '',
      PhoneValid: false,
      PhoneTouched: false,
      formValid: false,
      recaptcha: false
    }
  }

  onChange = (event) => {
    const {name, value} = event.target;
    let {PhoneValid} = this.state;

    switch (name) {
      case 'Phone':
        value.length === 0 || value.length !== 10
          ? PhoneValid = false
          : PhoneValid = true;
        break;
    }

    this.setState({
      [name]: value,
      [`${name}Touched`]: true,
      PhoneValid
    }, this.validateForm)
  };

  validateForm = () => {
    const {recaptcha, PhoneValid} = this.state;

    this.setState({
      formValid: PhoneValid && recaptcha
    })
  }

  checkRecaptcha = () => {
    if (!window.recaptchaVerifier) return;

    const {recaptcha} = this.state;
    const isVerify = !!window.recaptchaVerifier.g.getResponse();

    if (recaptcha !== isVerify) {
      this.setState({
        recaptcha: isVerify
      }, this.validateForm);
    }
  };

  componentDidUpdate() {
    this.checkRecaptcha();
  }

  render() {
    const {onSubmit} = this.props;
    const { Phone, formValid, PhoneTouched, PhoneValid } = this.state;

    return (
      <FormWrapper>
        <form onSubmit={onSubmit}>
          <div className="form-head">
            <p>Log in to your account with your mobile number.</p>
          </div>

          <div className="form-content">
            <CustomInput
              name="Phone"
              error={!PhoneValid}
              touched={PhoneTouched}
              type="tel"
              placeholder="Phone"
              icon="phone"
              onFocus={this.onChange}
              onChange={this.onChange}
              onBlur={this.onChange}
              value={Phone}
            />
          </div>

          <div className="recaptcha-wrapper" ref={(ref) => this.recaptcha = ref}/>

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

  componentDidMount() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(this.recaptcha, {
      'size': 'normal',
      'callback': () => {
        this.setState({
          recaptcha: true
        }, this.validateForm)
      },
      'expired-callback': function () {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    });
    window.recaptchaVerifier.render().then(function (widgetId) {
    window.recaptchaWidgetId = widgetId;
  });
  }
};

export default SignInForm;