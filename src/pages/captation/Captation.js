import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconAdd from '../../assets/image/icon_add.svg';
import iconCaptation from '../../assets/image/icon_captation.svg';
import iconDelete from '../../assets/image/icon_delete.svg';
import iconEdit from '../../assets/image/icon_edit.svg';
import iconFile from '../../assets/image/icon_file.svg';
import Etape from '../../components/etape/Etape';
import Navbar from '../../components/navbar/Navbar';
import Popup from "../../components/popup/Popup";
import commentService from '../../services/comments';
import filesService from '../../services/files';
import './captation.scss';

const Captation = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
  }, []);
  
  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleConfirmEvent = () => {
    setShowPopup(true);
  };

  const handleConfirmPopup = () => {
    window.location.href = "/post-production";
  };

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('username');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  // commentaire

  const [comments, setComments] = useState([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [selectedComment, setSelectedComment] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const data = await commentService.getComments();
    const filteredComments = data.filter(comment => comment.page === 2);
    setComments(filteredComments);
  };

  const toggleCreatePopup = () => {
    setShowCreatePopup(!showCreatePopup);
    setShowUpdatePopup(false);
  };

  const toggleUpdatePopup = () => {
    setShowUpdatePopup(!showUpdatePopup);
    setShowCreatePopup(false);
  };

  const openUpdatePopup = (comment) => {
    setSelectedComment(comment);
    setCommentContent(comment.content);
    toggleUpdatePopup();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const created_at = format(currentDate, "yyyy-MM-dd HH:mm:ss", { locale: fr });
    const updated_at = format(currentDate, "yyyy-MM-dd HH:mm:ss", { locale: fr });

    await commentService.createComment(1, 2, 1, commentContent, created_at, updated_at);
    fetchComments();
    setShowCreatePopup(false);
    setShowUpdatePopup(false);
    setCommentContent('');
  };

  const handleDeleteComment = async (id) => {
    await commentService.deleteComment(id);
    fetchComments();
  };

  const handleUpdateComment = async (event) => {
    event.preventDefault();

    if (!selectedComment) return;

    const currentDate = new Date();
    const updated_at = format(currentDate, "yyyy-MM-dd HH:mm:ss", { locale: fr });

    await commentService.updateComment(selectedComment.comment_id, commentContent, updated_at);
    await fetchComments();
    setSelectedComment(null);
    setCommentContent('');
    setShowUpdatePopup(false);
  };

  // fichiers
  const [sonFiles, setSonFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);

  // Nouveaux états pour les popups
  const [showAddSonPopup, setShowAddSonPopup] = useState(false);
  const [showAddVideoPopup, setShowAddVideoPopup] = useState(false);

  // Nouveaux états pour les valeurs des champs
  const [sonFileUrl, setSonFileUrl] = useState('');
  const [videoFileUrl, setVideoFileUrl] = useState('');

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const files = await filesService.getFiles();
    setSonFiles(files.filter(file => file.type === 'son'));
    setVideoFiles(files.filter(file => file.type === 'video'));
  };

  // ... Autres fonctions existantes ...

  const handleAddSonFile = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss", { locale: fr });

    await filesService.createFile(sonFileUrl, 'son', formattedDate);
    setSonFiles((await filesService.getFiles()).filter(file => file.type === 'son'));
    // Réinitialiser l'état sonFileUrl après avoir ajouté le fichier son
    setSonFileUrl('');

    setShowAddSonPopup(false);
    fetchFiles();
  };

  const handleAddVideoFile = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss", { locale: fr });

    await filesService.createFile(videoFileUrl, 'video', formattedDate);
    setVideoFiles((await filesService.getFiles()).filter(file => file.type === 'video'));
    // Réinitialiser l'état videoFileUrl après avoir ajouté le fichier vidéo
    setVideoFileUrl('');

    setShowAddVideoPopup(false);
    fetchFiles();
  };

  const handleDeleteSonFile = async (fileId) => {
    await filesService.deleteFile(fileId);
    setSonFiles((prevFiles) => prevFiles.filter((file) => file.file_id !== fileId));
  };

  const handleDeleteVideoFile = async (fileId) => {
    await filesService.deleteFile(fileId);
    setVideoFiles((prevFiles) => prevFiles.filter((file) => file.file_id !== fileId));
  };

  const toggleAddSonPopup = () => {
    setShowAddSonPopup(!showAddSonPopup);
    setShowAddVideoPopup(false);
    setShowCreatePopup(false);
    setShowUpdatePopup(false);
  };

  const toggleAddVideoPopup = () => {
    setShowAddVideoPopup(!showAddVideoPopup);
    setShowAddSonPopup(false);
    setShowCreatePopup(false);
    setShowUpdatePopup(false);
  };

  return (
    <div>
      <Navbar />
      <Etape />
      <div className="page_captation">
        <div className="page_captation_flex">
          <div className="page_captation_left">
            <div className="page_captation_left_video">
              <div className="page_captation_left_video_title">
                <h4>Fichiers vidéo</h4>
                <div>
                  <button onClick={toggleAddVideoPopup}>
                    <img src={iconAdd} alt="" />
                  </button>
                </div>
              </div>
              <div className="page_captation_left_video_container">
                {videoFiles.map((file) => (
                  <div key={file.file_id} className="page_captation_left_video_container_content">
                    <span>
                      <img src={iconFile} alt="" />
                      <span>{file.url.length > 20 ? file.url.slice(0, 20) + '...' : file.url}</span>
                    </span>
                    <span>{file.date}</span>
                    <button onClick={() => handleDeleteVideoFile(file.file_id)}><img src={iconDelete} alt="" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="page_captation_right">
            <div className="page_captation_right_son">
              <div className="page_captation_right_son_title">
                <h4>Fichiers son</h4>
                <div>
                  <button onClick={toggleAddSonPopup}>
                    <img src={iconAdd} alt="" />
                  </button>
                </div>
              </div>
              <div className="page_captation_right_son_container">
                {sonFiles.map((file) => (
                  <div key={file.file_id} className="page_captation_right_son_container_content">
                    <span>
                      <img src={iconFile} alt="" />
                      <span>{file.url.length > 20 ? file.url.slice(0, 20) + '...' : file.url}</span>
                    </span>
                    <span>{file.date}</span>
                    <button onClick={() => handleDeleteSonFile(file.file_id)}><img src={iconDelete} alt="" /></button>
                  </div>
                ))}
              </div>
            </div>
            <div className="page_captation_right_commentaire">
              <div className="page_captation_right_commentaire_title">
                <h4>Commentaires</h4>
                <div>
                  <button onClick={toggleCreatePopup}><img src={iconAdd} alt="" /></button>
                </div>
              </div>
              {comments.map((comment) => (
                <div className="page_captation_right_commentaire_container" key={comment.comment_id}>
                  <div className="page_captation_right_commentaire_container_title">
                    <h4>{username}</h4>
                    <span>{comment.updated_at}</span>
                    <div>
                      <button onClick={() => handleDeleteComment(comment.comment_id)}>
                        <img src={iconDelete} alt="" />
                      </button>
                      <button onClick={() => openUpdatePopup(comment)}>
                        <img src={iconEdit} alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="page_captation_right_commentaire_container_content">
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="page_captation_valide">
          <button className="EventButton" onClick={handleConfirmEvent}>
            {" "}
            <img src={iconCaptation} alt="" /> Valider cette étape
          </button>
          {showPopup && (
            <Popup
              message="Souhaitez-vous confirmer ?"
              onConfirm={handleConfirmPopup}
              onCancel={handleClosePopup}
            />
          )}
        </div>
        {showCreatePopup && (
          <div className="popup">
            <form onSubmit={handleSubmit} className="">
              <h4>Ajouter un commentaire</h4>
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Entrez votre commentaire"
              ></textarea>
              <div className="popup_buttons">
                <button type="submit">Commenter</button>
                <button onClick={toggleCreatePopup}>Annuler</button>
              </div>
            </form>
          </div>
        )}
        {showUpdatePopup && (
          <div className="popup">
            <form onSubmit={handleUpdateComment} className="">
              <h4>Modifier un commentaire</h4>
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Entrez votre commentaire"
              ></textarea>
              <div className="popup_buttons">
                <button type="submit">Modifier</button>
                <button onClick={toggleUpdatePopup}>Annuler</button>
              </div>
            </form>
          </div>
        )}
        {showAddSonPopup && (
          <div className="popup">
            <form onSubmit={handleAddSonFile}>
              <h4>Ajouter un fichier son</h4>
              <input
                type="text"
                value={sonFileUrl}
                onChange={(e) => setSonFileUrl(e.target.value)}
                placeholder="URL du fichier son"
                required
              />
              <div className="popup_buttons">
                <button type="submit">Ajouter</button>
                <button onClick={toggleAddSonPopup}>Annuler</button>
              </div>
            </form>
          </div>
        )}

        {/* Popup pour ajouter un fichier vidéo */}
        {showAddVideoPopup && (
          <div className="popup">
            <form onSubmit={handleAddVideoFile}>
              <h4>Ajouter un fichier vidéo</h4>
              <input
                type="text"
                value={videoFileUrl}
                onChange={(e) => setVideoFileUrl(e.target.value)}
                placeholder="URL du fichier vidéo"
                required
              />
              <div className="popup_buttons">
                <button type="submit">Ajouter</button>
                <button onClick={toggleAddVideoPopup}>Annuler</button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default Captation;
