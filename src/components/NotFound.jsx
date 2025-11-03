import React from 'react';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <img 
        src="./public/icons/not-found.svg" 
        alt="صفحه پیدا نشد" 
        className="not-found-image"
      />
      <p className="not-found-text">صفحه مورد نظر پیدا نشد!</p>
    </div>
  );
};

export default NotFound;