import React from 'react';
import logoPicture from '../images/logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logoPicture} alt="Логотип" />
      <div className="header__menu">
        <p className="header__profile-email">{props.userEmail}</p>
        {props.children}
      </div>
    </header>
  )
}

export default Header;