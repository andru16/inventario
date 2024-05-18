import React from 'react';

function Modal({ isOpen, onClose, title, children,size }) {
  return (
    <div>
      {isOpen && (
        <div className="modal" style={{ display: "block" }}>
          <div className={`modal-dialog modal-${size} modal-scrollable`} role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body modal-body-scrollable">
                {children}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
