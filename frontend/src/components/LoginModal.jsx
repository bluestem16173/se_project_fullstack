import ModalWithForm from "./ModalWithForm";

function LoginModal({ isOpen, onClose, onSubmit }) {
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Log in"
      name="login"
      buttonText="Log in"
      onSubmit={onSubmit}
    >
      <div className="modal__form-field">
        <label className="modal__label" htmlFor="login-email-input">
          Email
        </label>
        <input
          className="modal__input"
          id="login-email-input"
          name="email"
          type="email"
          placeholder="Email"
        />
      </div>

      <div className="modal__form-field">
        <label className="modal__label" htmlFor="login-password-input">
          Password
        </label>
        <input
          className="modal__input"
          id="login-password-input"
          name="password"
          type="password"
          placeholder="Password"
        />
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
