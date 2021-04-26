import React from 'react';
import './index.scss';

export const Header = ({ title }) => {
  return (
    <h1 className="home-header" style={{ margin: 0 }}>
      <div className="link">{title}</div>
    </h1>
  );
};
