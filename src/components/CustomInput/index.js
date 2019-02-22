import React from 'react';
import { ReactComponent as PhoneLogo } from './Icons/phone1.svg';
import { ReactComponent as PhoneErrorLogo } from './Icons/phone2.svg';
import { ReactComponent as NameLogo } from './Icons/username1.svg';
import { ReactComponent as NameErrorLogo } from './Icons/username2.svg';
import { ReactComponent as CodeLogo } from './Icons/password1.svg';
import { ReactComponent as CodeErrorLogo } from './Icons/password2.svg';

import './style.css';

const CustomInput = ({error, touched, icon, validate, onChange, onBlur, ...props}) => {

  let IconComponent = PhoneLogo;

  if (icon === 'name') {
    IconComponent = error && touched ? NameErrorLogo : NameLogo;
  } else if (icon === 'code') {
    IconComponent = error && touched ? CodeErrorLogo :CodeLogo;
  } else {
    IconComponent = error && touched ? PhoneErrorLogo : PhoneLogo;
  }

  return (
    <div className={`custom-input ${error && touched && "input-error"}`}>
      <label>
        <div className="custom-input-logo">
          <IconComponent />
        </div>
        <input
          {...props}
          onChange={(e) => {
            if (!onChange) return;
            onChange(e);
          }}
          onBlur={(e) => {
            if (!onBlur) return;
            onBlur(e);
          }}
        />
      </label>
    </div>
  )
};

export default CustomInput;