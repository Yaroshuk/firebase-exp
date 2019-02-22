import React from 'react';
import './style.css';

const FormWrapper = ({children}) => {
  return (
    <div className="form-wrapper">
      {children}
    </div>
  );
};

export default FormWrapper;