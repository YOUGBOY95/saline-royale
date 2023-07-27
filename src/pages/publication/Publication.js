import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconAdd from '../../assets/image/icon_add.svg';
import iconCalendar from '../../assets/image/icon_calendar.svg';
import iconCaptation from '../../assets/image/icon_captation.svg';
import iconDelete from '../../assets/image/icon_delete.svg';
import iconEdit from '../../assets/image/icon_edit.svg';
import iconEditorial from '../../assets/image/icon_editorial.svg';
import iconPostProd from '../../assets/image/icon_post_prod.svg';
import iconPublication from '../../assets/image/icon_publication.svg';
import iconValidEtape from '../../assets/image/icon_valid_etape.svg';
import Etape from '../../components/etape/Etape';
import Navbar from '../../components/navbar/Navbar';
import commentService from '../../services/comments';
import './publication.scss';

const Publication = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
  }, []);

  const handleCancelEvent = () => {
    window.location.href = "/";
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
    const filteredComments = data.filter(comment => comment.page === 5);
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
  
    await commentService.createComment(1, 5, 1, commentContent, created_at, updated_at);
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
  
  return (
    <div>
      <Navbar />
      <Etape />
      <div className="page_publication">
        <div className="page_publication_flex">
          <div className="page_publication_left">
            <div className="page_publication_left_suivi">
              <div className="page_publication_left_suivi_title page_publication_left_suivi_title_center">
                <h4>Suivi des actions</h4>
              </div>
              <div className="page_publication_left_suivi_etape">
                <div className="page_publication_left_suivi_etape_container">
                  <div className="page_publication_left_suivi_etape_container_img">
                    <img src={iconValidEtape} alt="" />
                  </div>
                  <div className="page_publication_left_suivi_etape_container_content">
                    <img src={iconCalendar} alt="" />
                    <span>Programmation</span>
                  </div>
                </div>
                <div className="page_publication_left_suivi_etape_container">
                  <div className="page_publication_left_suivi_etape_container_img">
                    <img src={iconValidEtape} alt="" />
                  </div>
                  <div className="page_publication_left_suivi_etape_container_content">
                    <img src={iconCaptation} alt="" />
                    <span>Captation</span>
                  </div>
                </div>
                <div className="page_publication_left_suivi_etape_container">
                  <div className="page_publication_left_suivi_etape_container_img">
                    <img src={iconValidEtape} alt="" />
                  </div>
                  <div className="page_publication_left_suivi_etape_container_content">
                    <img src={iconPostProd} alt="" />
                    <span>Post_production</span>
                  </div>
                </div>
                <div className="page_publication_left_suivi_etape_container">
                  <div className="page_publication_left_suivi_etape_container_img">
                    <img src={iconValidEtape} alt="" />
                  </div>
                  <div className="page_publication_left_suivi_etape_container_content">
                    <img src={iconEditorial} alt="" />
                    <span>Editorial</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="page_publication_left_status">
              <div className="page_publication_left_status_title">
                <h4>Status général du projet</h4>
              </div>
              <div className="page_publication_left_status_content">
                <span>En cours</span>
              </div>
            </div>
          </div>
          <div className="page_publication_right_commentaire">
            <div className="page_publication_right_commentaire_title">
              <h4>Commentaires</h4>
              <div>
                <button onClick={toggleCreatePopup}><img src={iconAdd} alt="" /></button>
              </div>
            </div>
            {comments.map((comment) => (
                <div className="page_publication_right_commentaire_container" key={comment.comment_id}>
                  <div className="page_publication_right_commentaire_container_title">
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
                  <div className="page_publication_right_commentaire_container_content">
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="page_publication_valide">
          <button onClick={handleCancelEvent}>
            <img src={iconPublication} alt="" />
            Publier les documents
          </button>
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
      </div>
    </div>
  );
};

export default Publication;
