import React from 'react';
import './style.css';

const CustomButton = ({text, className="", ...props}) => {
  return (
    <button className={`custom-button ${className}`} {...props}>
      {text}
    </button>
  )
};

export default CustomButton;