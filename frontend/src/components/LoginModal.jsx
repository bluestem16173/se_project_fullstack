import { useForm } from "../hooks/useForm"; //import useForm hook
import ModalWithForm from "./ModalWithForm";

function LoginModal({ isOpen, onClose, onSubmit }) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
    resetForm();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Log in"
      name="login"
      buttonText="Log in"
      onSubmit={handleSubmit}
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
          value={values.email}
          onChange={handleChange}
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
          value={values.password}
          onChange={handleChange}
        />
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
