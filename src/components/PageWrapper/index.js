import React from 'react';
import './style.css';

const PageWrapper  = ({children, className}) => {
  return (
    <div className={`page-wrapper ${className}`}>
      {children}
    </div>
  )
};

export default PageWrapper;