import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import iconAdd from '../../assets/image/icon_add.svg';
import iconEdit from '../../assets/image/icon_edit.svg';
import iconClose from "../../assets/image/icon_close.svg";
import iconCalendar from "../../assets/image/icon_calendar.svg";
import iconProfilDashboard from '../../assets/image/icon_profil_dashboard.svg';
import Etape from '../../components/etape/Etape';
import Navbar from '../../components/navbar/Navbar';
import projets from '../../components/data/data';
import Popup from "../../components/popup/Popup";
import './programmation.scss';

const getStatusClass = (status) => {
  switch (status) {
    case 'À faire':
      return 'a-faire';
    case 'Terminé':
      return 'termine';
    case 'Fermé':
      return 'ferme';
    case 'En cours':
      return 'en-cours';
    case 'En pause':
      return 'en-pause';
    default:
      return '';
  }
};

const Programmation = () => {
  const navigate = useNavigate();
  const { index } = useParams();
  const projectIndex = parseInt(index);
  const project = projets[projectIndex];
  const [isEditing, setIsEditing] = useState(false);
  const [titre, setTitre] = useState(project.name);
  const [dateTournage, setDateTournage] = useState(project.tournage);
  const [lieu, setLieu] = useState(project.lieu || '');
  const [status, setStatus] = useState(project.status);
  const { color } = project;

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('username');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Effectuez ici les actions nécessaires pour enregistrer les modifications
    setIsEditing(false);
  };

  const [collaborateurs, setCollaborateurs] = useState([
    { id: 1, nom: 'Chily Gonzales', role: 'Chef de projet' },
    { id: 2, nom: 'Anne Catherine', role: 'Post production' },
    { id: 3, nom: 'Nathan Pinard', role: 'Captation' },
  ]);

  const [showCollaborateurPopup, setShowCollaborateurPopup] = useState(false);
  const [nouveauCollaborateur, setNouveauCollaborateur] = useState({
    nom: '',
    role: '',
  });

  const handleAddCollaborateur = () => {
    setShowCollaborateurPopup(true);
  };

  const handleCollaborateurChange = (e) => {
    const { name, value } = e.target;
    setNouveauCollaborateur((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveCollaborateur = () => {
    // Effectuez ici les actions nécessaires pour ajouter un collaborateur
    // Vous pouvez ajouter le nouveau collaborateur à la liste des collaborateurs
    // et vider le formulaire pour permettre l'ajout d'autres collaborateurs
    setCollaborateurs((prevCollaborateurs) => [
      ...prevCollaborateurs,
      {
        id: prevCollaborateurs.length + 1,
        nom: nouveauCollaborateur.nom,
        role: nouveauCollaborateur.role,
      },
    ]);
    setShowCollaborateurPopup(false);
    setNouveauCollaborateur({ nom: '', role: '' });
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleConfirmEvent = () => {
    setShowPopup(true);
  };

  const handleCancelEvent = () => {
    window.location.href = "/";
  };

  const handleConfirmPopup = () => {
    window.location.href = "/captation";
  };

  return (

    <div>
      <Navbar />
      <Etape />
      <div className="page_programmation">
        <div className="page_programmation_flex">
          <div className="page_programmation_infos">
            <div className="page_programmation_infos_title">
              <h4>Description</h4>
              {isEditing ? (
                <button onClick={handleSaveClick}>
                  <img src={iconEdit} alt="" />
                </button>
              ) : (
                <button onClick={handleEditClick}>
                  <img src={iconEdit} alt="" />
                </button>
              )}
            </div>
            <div className="page_programmation_infos_container">
              <div className="page_programmation_infos_container_title">
                <h4>Titre</h4>
              </div>
              <div className="page_programmation_infos_container_content">
                {isEditing ? (
                  <input
                    type="text"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                  />
                ) : (
                  <p>{titre}</p>
                )}
              </div>
            </div>
            <div className="page_programmation_infos_container">
              <div className="page_programmation_infos_container_title">
                <h4>Date de tournage</h4>
              </div>
              <div className="page_programmation_infos_container_content">
                {isEditing ? (
                  <input
                    type="text"
                    value={dateTournage}
                    onChange={(e) => setDateTournage(e.target.value)}
                  />
                ) : (
                  <p>{dateTournage}</p>
                )}
              </div>
            </div>
            <div className="page_programmation_infos_container">
              <div className="page_programmation_infos_container_title">
                <h4>Lieu</h4>
              </div>
              <div className="page_programmation_infos_container_content">
                {isEditing ? (
                  <input
                    type="text"
                    value={lieu}
                    onChange={(e) => setLieu(e.target.value)}
                  />
                ) : (
                  <p>{lieu}</p>
                )}
              </div>
            </div>
            <div className="page_programmation_infos_container">
              <div className="page_programmation_infos_container_title">
                <h4>Status</h4>
              </div>
              <div className="page_programmation_infos_container_content">
                {isEditing ? (
                  <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                ) : (
                  <span className={`status ${getStatusClass(status)}`} style={{ backgroundColor: color }}>
                    {status}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="page_programmation_collabo">
            <div className="page_programmation_collabo_title">
              <h4>Collaborateurs</h4>
              <button onClick={handleAddCollaborateur}><img src={iconAdd} alt="" /></button>
            </div>
            <div className="page_programmation_collabo_container">
              {collaborateurs.map((collaborateur) => (
                <div
                  className="page_programmation_collabo_container_content"
                  key={collaborateur.id}
                >
                  <div className="page_programmation_collabo_container_content_infos">
                    <div className="page_programmation_collabo_container_content_infos_img">
                      <img src={iconProfilDashboard} alt="" />
                    </div>
                    <div className="page_programmation_collabo_container_content_infos_name">
                      <span>{collaborateur.nom}</span>
                    </div>
                  </div>
                  <div className="page_programmation_collabo_container_content_role">
                    <span>{collaborateur.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="page_programmation_valide">
          <button onClick={handleConfirmEvent}>
            <img src={iconCalendar} alt="" /> Valider cette étape
          </button>
          <button onClick={handleCancelEvent}>
            <img src={iconClose} alt="" /> Annuler le tournage
          </button>
        </div>
      </div>

      {showPopup && (
        <Popup
          message="Souhaitez-vous confirmer ?"
          onConfirm={handleConfirmPopup}
          onCancel={handleClosePopup}
        />
      )}{" "}

      {/* Popup pour ajouter un collaborateur */}
      {showCollaborateurPopup && (
        <div className="popup">
          <form onSubmit={handleSaveCollaborateur}>
            <h4>Ajouter un collaborateur</h4>
            <input
              type="text"
              name="nom"
              value={nouveauCollaborateur.nom}
              onChange={handleCollaborateurChange}
              placeholder="Nom du collaborateur"
            />
            <input
              type="text"
              name="role"
              value={nouveauCollaborateur.role}
              onChange={handleCollaborateurChange}
              placeholder="Rôle du collaborateur"
            />
            <div className="popup_buttons">
              <button type="submit">Ajouter</button>
              <button onClick={() => setShowCollaborateurPopup(false)}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Programmation;
