import { ReactNode } from "react";
import css from "./Modal.module.css";

interface ModalProps {
  closeModal: () => void;
  children: ReactNode;
}

export default function Modal({ closeModal, children }: ModalProps) {
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
}


