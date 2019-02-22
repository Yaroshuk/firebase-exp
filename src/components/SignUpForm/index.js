import React from 'react';
import firebase from 'firebase';
import FormWrapper from '../../components/FormWrapper';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Name: '',
      Phone: '+1',
      NameValid: false,
      PhoneValid: false,
      NameTouched: false,
      PhoneTouched: false,
      formValid: false,
      recaptcha: false
    }
  }

  onChange = (event) => {
    const {name, value} = event.target;
    let {NameValid, PhoneValid} = this.state;

    switch (name) {
      case 'Name':
        value.length === 0
          ? NameValid = false
          : NameValid = true;
        break;
      case 'Phone':
        value.length === 0 || value.length > 17
          ? PhoneValid = false
          : PhoneValid = true;
        console.log(value.length)

    }

    this.setState({
      [name]: value,
      [`${name}Touched`]: true,
      NameValid,
      PhoneValid
    }, this.validateForm)
  };

  validateForm = () => {
    const {recaptcha, NameValid, PhoneValid} = this.state;

    this.setState({
      formValid: NameValid && PhoneValid && recaptcha
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
    const { Name, Phone, formValid, NameTouched, NameValid, PhoneTouched, PhoneValid } = this.state;

    return (
      <FormWrapper>
        <form onSubmit={onSubmit}>
          <div className="form-head">
            <p>Create an account with your name and mobile number.</p>
          </div>

          <div className="form-content">
            <CustomInput
              name="Name"
              error={!NameValid}
              touched={NameTouched}
              placeholder="Name"
              icon="name"
              onChange={this.onChange}
              onBlur={this.onChange}
              value={Name}
            />
            <CustomInput
              name="Phone"
              error={!PhoneValid}
              touched={PhoneTouched}
              type="tel"
              placeholder="Phone"
              icon="phone"
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
              text="sign up"
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

export default SignUpForm;