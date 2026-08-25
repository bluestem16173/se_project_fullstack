import ModalWithForm from "./ModalWithForm";

function RegisterModal({ isOpen, onClose, onSubmit }) {
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign up"
      name="register"
      buttonText="Sign up"
      onSubmit={onSubmit}
    >
      <div className="modal__form-field">
        <label className="modal__label" htmlFor="register-email-input">
          Email
        </label>
        <input
          className="modal__input"
          id="register-email-input"
          name="email"
          type="email"
          placeholder="Email"
        />
      </div>

      <div className="modal__form-field">
        <label className="modal__label" htmlFor="register-password-input">
          Password
        </label>
        <input
          className="modal__input"
          id="register-password-input"
          name="password"
          type="password"
          placeholder="Password"
        />
      </div>

      <div className="modal__form-field">
        <label className="modal__label" htmlFor="register-name-input">
          Name
        </label>
        <input
          className="modal__input"
          id="register-name-input"
          name="name"
          type="text"
          placeholder="Name"
        />
      </div>

      <div className="modal__form-field">
        <label className="modal__label" htmlFor="register-avatar-input">
          Avatar URL
        </label>
        <input
          className="modal__input"
          id="register-avatar-input"
          name="avatar"
          type="url"
          placeholder="Avatar URL"
        />
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
