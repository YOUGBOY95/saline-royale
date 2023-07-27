import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconAdd from '../../assets/image/icon_add.svg';
import iconDelete from '../../assets/image/icon_delete.svg';
import iconDownload from '../../assets/image/icon_download.svg';
import iconEdit from '../../assets/image/icon_edit.svg';
import iconFile from '../../assets/image/icon_file.svg';
import iconPostProd from '../../assets/image/icon_post_prod.svg';
import Etape from '../../components/etape/Etape';
import Navbar from '../../components/navbar/Navbar';
import Popup from "../../components/popup/Popup";
import commentService from '../../services/comments';
import filesService from '../../services/files';
import './post_production.scss';

const PostProduction = () => {
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
    window.location.href = "/editorial";
  };

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('username');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Gérer la logique de traitement du fichier ici
    // Par exemple, vous pouvez lire le fichier ou envoyer le fichier vers un serveur
    setFileName(file.name);
  };

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
    const filteredComments = data.filter(comment => comment.page === 3);
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

    await commentService.createComment(1, 3, 1, commentContent, created_at, updated_at);
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
  const [finalFiles, setFinalFiles] = useState([]);
  const [TradStFiles, setTradStFiles] = useState([]);

  const [showAddFinalPopup, setShowAddFinalPopup] = useState(false);
  const [showAddTradStPopup, setShowAddTradStPopup] = useState(false);

  const [finalFileUrl, setFinalFileUrl] = useState('');
  const [tradStFileUrl, setTradStFileUrl] = useState('');

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const files = await filesService.getFiles();
    setFinalFiles(files.filter(file => file.type === 'final'));
    setTradStFiles(files.filter(file => file.type === 'trad_st'));
  };

  const handleAddFinalFile = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss", { locale: fr });

    await filesService.createFile(finalFileUrl, 'final', formattedDate);
    setFinalFiles((prevFiles) => [...prevFiles, { url: finalFileUrl, date: formattedDate }]);
    setFinalFileUrl('');

    setShowAddFinalPopup(false);
  };

  const handleAddTradStFile = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss", { locale: fr });

    await filesService.createFile(tradStFileUrl, 'trad_st', formattedDate);
    setTradStFiles((prevFiles) => [...prevFiles, { url: tradStFileUrl, date: formattedDate }]);
    setTradStFileUrl('');

    setShowAddTradStPopup(false);
  };

  const handleDeleteFinalFile = async (fileId) => {
    await filesService.deleteFile(fileId);
    setFinalFiles((prevFiles) => prevFiles.filter((file) => file.file_id !== fileId));
  };
  
  const handleDeleteTradStFile = async (fileId) => {
    await filesService.deleteFile(fileId);
    setTradStFiles((prevFiles) => prevFiles.filter((file) => file.file_id !== fileId));
  };

  const toggleAddFinalPopup = () => {
    setShowAddFinalPopup(!showAddFinalPopup);
    setShowAddTradStPopup(false);
  };

  const toggleAddTradStPopup = () => {
    setShowAddTradStPopup(!showAddTradStPopup);
    setShowAddFinalPopup(false);
  };

  return (
    <div>
      <Navbar />
      <Etape />
      <div className="page_post_production">
        <div className="page_post_production_top">
          <div className="page_post_production_top_video">
            <div className="page_post_production_top_video_title">
              <h4>Vidéo final</h4>
              <div>
                  <button onClick={toggleAddFinalPopup}>
                    <img src={iconAdd} alt="" />
                  </button>
              </div>
            </div>
            <div className="page_post_production_top_video_container">
              {finalFiles.map((file) => (
                <div key={file.file_id} className="page_post_production_top_video_container_content">
                  <span>
                    <img src={iconFile} alt="" />
                    <span>{file.url.length > 20 ? file.url.slice(0, 20) + '...' : file.url}</span>
                  </span>
                  <span>{file.date}</span>
                  <button onClick={() => handleDeleteFinalFile(file.file_id)}><img src={iconDelete} alt="" /></button>
                </div>
                ))}
            </div>
          </div>
          <div className="page_post_production_top_import">
            <p>Importer une image d’illustration</p>
            {fileName ? (
              <span>{fileName}</span>
            ) : (
              <>
                <img src={iconDownload} alt="" onClick={handleImageUpload} />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </>
            )}
          </div>
        </div>
        <div className="page_post_production_bottom">
          <div className="page_post_production_bottom_trad_st">
            <div className="page_post_production_bottom_trad_st_title">
              <h4>Traduction & Sous-titres</h4>
              <div>
                  <button onClick={toggleAddTradStPopup}>
                    <img src={iconAdd} alt="" />
                  </button>
              </div>
            </div>
            <div className="page_post_production_bottom_trad_st_container">
              {TradStFiles.map((file) => (
                <div key={file.file_id} className="page_post_production_bottom_trad_st_container_content">
                  <span>
                    <img src={iconFile} alt="" />
                    <span>{file.url.length > 20 ? file.url.slice(0, 20) + '...' : file.url}</span>
                  </span>
                  <span>{file.date}</span>
                  <button onClick={() => handleDeleteTradStFile(file.file_id)}><img src={iconDelete} alt="" /></button>
                </div>
                ))}
            </div>
          </div>
          <div className="page_post_production_bottom_commentaire">
            <div className="page_post_production_bottom_commentaire_title">
              <h4>Commentaires</h4>
              <div>
                <button onClick={toggleCreatePopup}><img src={iconAdd} alt="" /></button>
              </div>
            </div>
            {comments.map((comment) => (
              <div className="page_post_production_bottom_commentaire_container" key={comment.comment_id}>
                <div className="page_post_production_bottom_commentaire_container_title">
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
                <div className="page_post_production_bottom_commentaire_container_content">
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="page_post_production_valide">
          <button className="EventButton" onClick={handleConfirmEvent}>
            <img src={iconPostProd} alt="" /> Valider cette étape
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
        {showAddFinalPopup && (
          <div className="popup">
            <form onSubmit={handleAddFinalFile}>
              <h4>Ajouter un fichier final</h4>
              <input
                type="text"
                value={finalFileUrl}
                onChange={(e) => setFinalFileUrl(e.target.value)}
                placeholder="URL du fichier final"
                required
              />
              <div className="popup_buttons">
                <button type="submit">Ajouter</button>
                <button onClick={toggleAddFinalPopup}>Annuler</button>
              </div>
            </form>
          </div>
        )}
        {showAddTradStPopup && (
          <div className="popup">
            <form onSubmit={handleAddTradStFile}>
              <h4>Ajouter un fichier traduction &amp; sous-titres</h4>
              <input
                type="text"
                value={tradStFileUrl}
                onChange={(e) => setTradStFileUrl(e.target.value)}
                placeholder="URL du fichier traduction &amp; sous-titres"
                required
              />
              <div className="popup_buttons">
                <button type="submit">Ajouter</button>
                <button onClick={toggleAddTradStPopup}>Annuler</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostProduction;
