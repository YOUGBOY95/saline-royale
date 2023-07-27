import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconCalendar from '../../assets/image/icon_calendar.svg';
import iconChef from '../../assets/image/icon_chef.svg';
import iconMail from '../../assets/image/icon_mail.svg';
import iconMdp from '../../assets/image/icon_mdp.svg';
import iconProfilDashboard from '../../assets/image/icon_profil_dashboard.svg';
import Navbar from '../../components/navbar/Navbar';
import './profil.scss';

const Profil = () => {
  const [username, setUsername ] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username'); // Define 'username' variable here
    if (!username) {
      navigate('/login');
    }
   else {
    setUsername(localStorage.getItem('username') || '');
  }

  }, [navigate]);
  
  return (
    <div>
      <Navbar />
      <div className="page_profil">
        <h1>Ton profil</h1>
        <div className="page_profil_infos">
          <div className="page_profil_infos_name">
            <div className="page_profil_infos_name_img">
              <img src={iconProfilDashboard} alt="" />
            </div>
            <div className="page_profil_infos_name_text">
              <span>Bonjour !</span>
              <span>{username}</span>
            </div>
          </div>
          <div className="page_profil_infos_role">
            <div className="page_profil_infos_role_top">Ton rôle</div>
            <div className="page_profil_infos_role_bottom">
              <span>
                <img src={iconChef} alt="" /> Chef de projet
              </span>
              <span>
                <img src={iconCalendar} alt="" /> Depuis le 01/01/2023
              </span>
            </div>
          </div>
          <div className="page_profil_infos_mail_mdp">
            <div className="page_profil_infos_mail_mdp_top">Ton adresse e-mail et ton mot de passe</div>
            <div className="page_profil_infos_mail_mdp_bottom">
              <span>
                <img src={iconMail} alt="" /> admin@saline.com
              </span>
              <span>
                <img src={iconMdp} alt="" /> *****************
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
