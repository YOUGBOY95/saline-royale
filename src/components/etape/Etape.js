import React from 'react';
import { NavLink } from 'react-router-dom';
import iconCalendar from '../../assets/image/icon_calendar.svg';
import iconCaptation from '../../assets/image/icon_captation.svg';
import iconEditorial from '../../assets/image/icon_editorial.svg';
import iconPostProd from '../../assets/image/icon_post_prod.svg';
import iconPublication from '../../assets/image/icon_publication.svg';
import './etape.scss';

const Etape = () => {
  const handleLinkClick = (projectId) => {
    localStorage.setItem('selectedProjectId', projectId);
  };

  const selectedProjectId = parseInt(localStorage.getItem('selectedProjectId'));

  return (
    <div>
      <div className="etape">
        <div className="etape_link">
          <NavLink
            to={`/programmation/${selectedProjectId}`} // Use the selected project ID from local storage
            activeClassName="active-link"
            onClick={() => handleLinkClick(selectedProjectId)} // Update the selected project ID when clicking the link
          >
            <img src={iconCalendar} alt="" />
            <span>Programmation</span>
          </NavLink>
          <NavLink to="/captation" activeClassName="active-link">
            <img src={iconCaptation} alt="" />
            <span>Captation</span>
          </NavLink>
          <NavLink to="/post-production" activeClassName="active-link">
            <img src={iconPostProd} alt="" />
            <span>Post-production</span>
          </NavLink>
          <NavLink to="/editorial" activeClassName="active-link">
            <img src={iconEditorial} alt="" />
            <span>Editorial</span>
          </NavLink>
          <NavLink to="/publication" activeClassName="active-link">
            <img src={iconPublication} alt="" />
            <span>Publication</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Etape;
