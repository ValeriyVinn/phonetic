import React from 'react';
import css from './Modal.module.css';

const Modal = ({ closeModal, children }) => {
  return (
    <div className={css.modalOverlay} onClick={closeModal}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={closeModal}>
          &times;
        </button>
        {children}
      </div>
      
    </div>
  );
};

export default Modal;