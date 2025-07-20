// import React from 'react';
import PropTypes from 'prop-types';
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

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default Modal;