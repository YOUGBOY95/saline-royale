import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import iconDashboard from '../../assets/image/icon_dashboard.svg';
//import iconNotif from '../../assets/image/icon_notif.svg';
import iconProfil from '../../assets/image/icon_profil.svg';
import iconPowerOff from '../../assets/image/icon_off.png';
import iconProjet from '../../assets/image/icon_projet.svg';
import logo from '../../assets/image/logo.svg';
import './navbar.scss';

const Navbar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar_logo">
          <img src={logo} alt="" />
        </div>
        <div className="navbar_link">
          <NavLink to="/dashboard" activeClassName="active-link">
            <img src={iconDashboard} alt="" />
            <span>Tableau de bord</span>
          </NavLink>
          <NavLink exact to="/" activeClassName="active-link">
            <img src={iconProjet} alt="" />
            <span>Tous les projets</span>
          </NavLink>
        </div>
        <div className="navbar_profil">
          <div className="navbar_profil_button">
            <button onClick={handleLogout}><img src={iconPowerOff} alt="" /></button>
          </div>
          <div className="navbar_profil_button">
            <NavLink exact to="/profil"><img src={iconProfil} alt="" /></NavLink>
          </div>
          <div className="navbar_profil_infos">
            <span>{username}</span>
            <span>Chef de projet</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
