import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconAdd from '../../assets/image/icon_add.svg';
import iconDelete from '../../assets/image/icon_delete.svg';
import iconEdit from '../../assets/image/icon_edit.svg';
import iconFile from '../../assets/image/icon_file.svg';
import Etape from '../../components/etape/Etape';
import Navbar from '../../components/navbar/Navbar';
import Popup from "../../components/popup/Popup";
import commentService from '../../services/comments';
import filesService from '../../services/files';
import './editorial.scss';

const Editorial = () => {
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
    window.location.href = "/publication";
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
    const filteredComments = data.filter(comment => comment.page === 4);
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

    await commentService.createComment(1, 4, 1, commentContent, created_at, updated_at);
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
  const [partitionFiles, setPartitionFiles] = useState([]);
  const [showAddFilePopup, setShowAddFilePopup] = useState(false);
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    fetchFiles();
  }, []);
  
  const fetchFiles = async () => {
    const files = await filesService.getFiles();
    setPartitionFiles(files.filter(file => file.type === 'partition'));
  };

  const handleAddFile = async (e) => {
    e.preventDefault();
  
    const currentDate = new Date();
    const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss", { locale: fr });
  
    await filesService.createFile(fileUrl, 'partition', formattedDate);
    setPartitionFiles((await filesService.getFiles()).filter(file => file.type === 'partition'));
    // Réinitialiser l'état fileUrl après avoir ajouté le fichier
    setFileUrl('');
  
    setShowAddFilePopup(false);
    fetchFiles();
  };
  
  const handleDeleteFile = async (fileId) => {
    await filesService.deleteFile(fileId);
    setPartitionFiles((prevFiles) => prevFiles.filter((file) => file.file_id !== fileId));
  };  

  const toggleAddFilePopup = () => {
    setShowAddFilePopup(!showAddFilePopup);
    setShowCreatePopup(false);
    setShowUpdatePopup(false);
  };

  return (
    <div>
      <Navbar />
      <Etape />
      <div className="page_editorial">
        <div className="page_editorial_flex">
          <div className="page_editorial_left">
            <div className="page_editorial_left_description">
              <div className="page_editorial_left_description_title">
                <h4>Description <span>3/4</span></h4>
                <button><img src={iconEdit} alt=""/></button>
              </div>
              <div className="page_editorial_left_description_container">
                <div className="page_editorial_left_description_container_title">
                  <h4>À propos de la masterclass</h4>
                </div>
                <div className="page_editorial_left_description_container_content">
                  <p>Pas de description</p>
                </div>
              </div>
              <div className="page_editorial_left_description_container">
                <div className="page_editorial_left_description_container_title">
                  <h4>Qu’est ce que l’on apprend de la masterclass</h4>
                  <button><img src={iconEdit} alt=""/></button>
                </div>
                <div className="page_editorial_left_description_container_content">
                  <p>Masterclass vidéo de piano avec pianistes experts.</p>
                  <p>Leçons structurées, techniques avancées, répertoires variés, astuces musicales.</p>
                  <p>Vue rapprochée des mains, ressources complémentaires. Interaction Q&R avec instructeurs.</p>
                  <p>Apprentissage approfondi.</p>
                </div>
              </div>
              <div className="page_editorial_left_description_container">
                <div className="page_editorial_left_description_container_title">
                  <h4>À propos du morceau</h4>
                  <button><img src={iconEdit} alt=""/></button>
                </div>
                <div className="page_editorial_left_description_container_content">
                  <p>Cello Sonata No. 2 in F Major, Op. 99</p>
                  <p>Johannes Brahms</p>
                </div>
              </div>
              <div className="page_editorial_left_description_container">
                <div className="page_editorial_left_description_container_title">
                  <h4>Instrument</h4>
                  <button><img src={iconEdit} alt=""/></button>
                </div>
                <div className="page_editorial_left_description_container_content">
                  <p>Piano</p>
                </div>
              </div>
            </div>
          </div>
          <div className="page_editorial_right">
            <div className="page_editorial_right_partition">
              <div className="page_editorial_right_partition_title">
                <h4>Partitions</h4>
                <button onClick={toggleAddFilePopup}><img src={iconAdd} alt=""/></button>
              </div>
              <div className="page_editorial_right_partition_container">
              {partitionFiles.map((file) => (
                <div key={file.file_id} className="page_editorial_right_partition_container_content">
                  <span>
                    <img src={iconFile} alt="" />
                    <span>{file.url.length > 20 ? file.url.slice(0, 20) + '...' : file.url}</span>
                  </span>
                  <span>{file.date}</span>
                  <button onClick={() => handleDeleteFile(file.file_id)}>
                    <img src={iconDelete} alt="" />
                  </button>
                </div>
              ))}
              </div>
            </div>
            <div className="page_editorial_right_commentaire">
              <div className="page_editorial_right_commentaire_title">
                <h4>Commentaires</h4>
                <button onClick={toggleCreatePopup}><img src={iconAdd} alt="" /></button>
              </div>
              {comments.map((comment) => (
                <div className="page_editorial_right_commentaire_container" key={comment.comment_id}>
                  <div className="page_editorial_right_commentaire_container_title">
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
                  <div className="page_editorial_right_commentaire_container_content">
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="page_editorial_valide">
          <button className="EventButton" onClick={handleConfirmEvent}>
            <img src={iconEdit} alt="" /> Valider cette étape
          </button>
          {showPopup && (
            <Popup
              message="Souhaitez-vous confirmer ?"
              onConfirm={handleConfirmPopup}
              onCancel={handleClosePopup}
            />
          )}{" "}
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
        {showAddFilePopup && (
          <div className="popup">
            <form onSubmit={handleAddFile}>
              <h4>Ajouter un fichier</h4>
              <input
                type="text"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="URL du fichier"
                required
              />
              <div className="popup_buttons">
                <button type="submit">Ajouter</button>
                <button onClick={toggleAddFilePopup}>Annuler</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editorial;
