// UserMenuHorizontal.jsx
import React from 'react';
import '../styles/UserMenuHorizontal.css';
import logo from '../assets/images/logo.png';

const UserMenuHorizontal = () => {
  return (
    <div className="user-menu-horizontal">
      <img src={logo} alt="Logo" className="logo" />

      <nav className="nav-bar">
        <ul className="nav-item-list">
          <li className="nav-item">Accueil</li>
          <li className="nav-item">Profil</li>
          <li className="nav-item">Réglage</li>
          <li className="nav-item">Communauté</li>
        </ul>
      </nav>
    </div>
  );
};

export default UserMenuHorizontal;
