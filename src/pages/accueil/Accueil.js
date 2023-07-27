import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconCalendar from '../../assets/image/icon_calendar.svg';
import iconFilter from '../../assets/image/icon_filter.svg';
import icongroupe from '../../assets/image/icon_groupe.svg';
import iconSearch from '../../assets/image/icon_search.svg';
import iconTeacher from '../../assets/image/icon_teacher.svg';
import projets from '../../components/data/data';
import Navbar from '../../components/navbar/Navbar';
import './accueil.scss';

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

const Accueil = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredProjets, setFilteredProjets] = useState(projets); // Utilisation de la variable d'état pour filtrer les projets

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Fonction pour filtrer les projets en fonction des filtres sélectionnés
  useEffect(() => {
    setFilteredProjets(
      projets.filter((projet) => {
        const statusMatch =
          selectedFilters.length === 0 || selectedFilters.includes(projet.status);
        const searchMatch = projet.name.toLowerCase().includes(searchValue.toLowerCase());
        return statusMatch && searchMatch;
      })
    );
  }, [selectedFilters, searchValue]);

  // Fonction pour gérer la sélection/désélection d'un filtre
  const handleFilterChange = (status) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(status)
        ? prevFilters.filter((filter) => filter !== status)
        : [...prevFilters, status]
    );
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('username');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleProjetClick = (projectId) => {
    localStorage.setItem('selectedProjectId', projectId);
    navigate(`/programmation/${projectId}`); // Rediriger vers la page de programmation correspondante
  };

  // Nouvelle variable d'état pour gérer l'affichage de la fenêtre popup
  const [showPopup, setShowPopup] = useState(false);

  // Nouvelle variable d'état pour stocker les informations du nouveau projet
  const [newProjet, setNewProjet] = useState({
    name: '',
    tournage: '',
    lieu: '',
    status: '',
  });

  // Fonction pour ouvrir la fenêtre popup
  const handleNewProjetClick = () => {
    setShowPopup(true);
  };

  // Fonction pour soumettre les informations du nouveau projet
  const handleNewProjetSubmit = (e) => {
    e.preventDefault();
    // Ajouter le nouveau projet à la liste des projets
    setFilteredProjets([...filteredProjets, newProjet]);
    // Réinitialiser les informations du nouveau projet
    setNewProjet({ name: '', tournage: '', lieu: '', status: '' });
    // Fermer la fenêtre popup
    setShowPopup(false);
  };

  return (
    <div>
      <Navbar />
      <div className="page_accueil">
        <div className="page_accueil_header">
          <div className="page_accueil_header_title_add">
            <h1>Tous les projets</h1>
            {/* Bouton pour ouvrir la fenêtre popup */}
            <button className="button_new_projet" onClick={handleNewProjetClick}>
              + Nouveau projet
            </button>
          </div>
          <div className="page_accueil_header_search">
            <div className="page_accueil_header_search_input">
              <img src={iconSearch} alt="" />
              <input
                type="text"
                placeholder="Rechercher un projet"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
            <button className="page_accueil_header_search_filter" onClick={() => setShowFilters(!showFilters)}>
              <img src={iconFilter} alt="" />
            </button>
          </div>
        </div>
        {showFilters && (
          <div className="filter-window">
            <label>
              <input
                type="checkbox"
                checked={selectedFilters.includes('À faire')}
                onChange={() => handleFilterChange('À faire')}
              />
              A faire
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedFilters.includes('Terminé')}
                onChange={() => handleFilterChange('Terminé')}
              />
              Terminé
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedFilters.includes('Fermé')}
                onChange={() => handleFilterChange('Fermé')}
              />
              Fermé
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedFilters.includes('En cours')}
                onChange={() => handleFilterChange('En cours')}
              />
              En cours
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedFilters.includes('En pause')}
                onChange={() => handleFilterChange('En pause')}
              />
              En pause
            </label>
          </div>
        )}
        <div className="page_accueil_projets">
          {filteredProjets.map((projet, index) => (
            <div className="projet" key={index} onClick={() => handleProjetClick(index)}>
              <div className="projet_name_status">
                <h4>{projet.name}</h4>
                <span className={getStatusClass(projet.status)}>
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
      </div>

      {/* Fenêtre popup pour ajouter un nouveau projet */}
      {showPopup && (
        <div className="popup">
          <form onSubmit={handleNewProjetSubmit}>
            <h4>Ajouter un nouveau projet</h4>
            <input
              type="text"
              value={newProjet.name}
              onChange={(e) => setNewProjet({ ...newProjet, name: e.target.value })}
              placeholder="Nom du projet"
            />
            <input
              type="text"
              value={newProjet.tournage}
              onChange={(e) => setNewProjet({ ...newProjet, tournage: e.target.value })}
              placeholder="Date du tournage"
            />
            <input
              type="text"
              value={newProjet.lieu}
              onChange={(e) => setNewProjet({ ...newProjet, lieu: e.target.value })}
              placeholder="Salle"
            />
            <input
              type="text"
              value={newProjet.status}
              onChange={(e) => setNewProjet({ ...newProjet, status: e.target.value })}
              placeholder="Status"
            />
            <div className="popup_buttons">
              <button type="submit">Ajouter</button>
              <button onClick={() => setShowPopup(false)}>Annuler</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Accueil;
