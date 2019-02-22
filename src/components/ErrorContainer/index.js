import React from 'react';
import './style.css';

const ErrorContainer = ({error}) => {
  return (
    <div className="error-container">{error}</div>
  );
};

export default ErrorContainer;