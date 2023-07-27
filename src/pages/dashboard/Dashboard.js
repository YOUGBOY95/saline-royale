import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import calendar from '../../assets/image/calendar.svg';
import iconCalendar from '../../assets/image/icon_calendar.svg';
import iconProfilDashboard from '../../assets/image/icon_profil_dashboard.svg';
import iconProjetApprouv from '../../assets/image/icon_projet_approuv.svg';
import iconProjetRej from '../../assets/image/icon_projet_rej.svg';
import icongroupe from '../../assets/image/icon_groupe.svg';
import iconSearch from '../../assets/image/icon_search.svg';
import iconTeacher from '../../assets/image/icon_teacher.svg';
import projets from '../../components/data/data';
import Navbar from '../../components/navbar/Navbar';
import './dashboard.scss';




const Dashboard = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredProjets = projets.filter((projet) =>
    projet.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const approvedProjets = filteredProjets.filter((projet) => projet.status === 'Terminé');
  const rejectedProjets = filteredProjets.filter((projet) => projet.status === 'Fermé');

  const username = localStorage.getItem('username') || '';
  const isLoggedIn = username !== '';

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="page_dashboard">
        <div className="page_dashboard_header">
          <div className="page_dashboard_header_title">
            <h1>Dashboard</h1>
          </div>
          <div className="page_dashboard_header_search">
            <div className="page_dashboard_header_search_input">
              <img src={iconSearch} alt="" />
              <input
                type="text"
                placeholder="Rechercher un projet"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
            
          </div>
        </div>
        <div className="page_dashboard_projects_details">
          <div className="page_dashboard_projects_details_top">
            <div className="page_dashboard_projects_details_top_number">
              <div className="page_dashboard_projects_details_top_number_infos">
                <div className="page_dashboard_projects_details_top_number_infos_image">
                  <img src={iconProfilDashboard} alt="" />
                </div>
                <div className="page_dashboard_projects_details_top_number_infos_text">
                  <span>Bonjour !</span>
                  <span>{username}</span>
                </div>
              </div>
              <div className="page_dashboard_projects_details_top_number_projet">
              <span>
                  <span>{filteredProjets.length}</span>
                  <span>projets</span>
                </span>
                <p>
                  ont été réalisés avec votre expertise depuis votre arrivée
                  au sein de la Saline Royale Academy
                </p>
              </div>
            </div>
            <div className="page_dashboard_projects_details_top_approuv_rej">
              <div className="page_dashboard_projects_details_top_approuv_rej_approuv">
                <img src={iconProjetApprouv} alt="" />
                <span>{approvedProjets.length} projets approuvés et publiés</span>
              </div>
              <div className="page_dashboard_projects_details_top_approuv_rej_rej">
                <img src={iconProjetRej} alt="" />
                <span>{rejectedProjets.length} projets fermé</span>
              </div>
            </div>
          </div>
          <div className="page_dashboard_projects_details_bottom">
          <div className="page_dashboard_projects_details_bottom_projets_en_cours">
        <h2>Vos projets en cours</h2>
        {filteredProjets.map((projet, index) => (
          <div className="projet" key={index}>
            <div className="projet_name_status">
              <h4>{projet.name}</h4>
              <span
                className="status"
                style={{ backgroundColor: projet.color }} // Set the background color dynamically
              >
                {projet.status}
              </span>
            </div>
                  <div className="projet_teacher_tournage">
                    <span>
                      <img src={iconTeacher} alt="" /> {projet.teacher}
                    </span>
                    <span>
                      <img src={iconCalendar} alt="" /> {projet.tournage}
                    </span>
                    <span>
                      <img src={icongroupe} alt="" /> {projet.lieu}
                      </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="page_dashboard_projects_details_bottom_calendar">
              <img src={calendar} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
