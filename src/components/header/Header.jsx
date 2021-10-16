import React from "react";

import logo from '../../assets/title_logo.svg';
import './header.css';

export default function Header() {

    return (
      <div className="container">
        <img src={logo} className="title-logo" alt="logo" />
      </div>
    );
  }