import './ModalWithForm.css'


function ModalWithForm({ isOpen, onClose, title, name, buttonText, children, onSubmit }) {
  return (
    <div 
      className={`modal modal_type_${name} ${isOpen ? 'modal_is-opened' : ''}`}
      onClick={onClose}
    >
      <div 
        className="modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="modal__close-btn"
          type="button"
          onClick={onClose}
        >
          ×
        </button>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          <h2 className="modal__title">{title}</h2>
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalWithForm












