import React from 'react';
import './Popup.scss'; 

const Popup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{message}</h2>
        <button className="confirm" onClick={onConfirm}>
          Confirmer
        </button>
        <button className="cancel" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </div>
  );
};

export default Popup;
