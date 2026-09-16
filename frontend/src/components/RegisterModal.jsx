import ModalWithForm from "./ModalWithForm";
import { useForm } from "../hooks/useForm"; //import useForm hook

function RegisterModal({ isOpen, onClose, onSubmit }) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
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
      title="Sign up"
      name="register"
      buttonText="Sign up"
      onSubmit={handleSubmit}
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
          value={values.email}
          onChange={handleChange}
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
          value={values.password}
          onChange={handleChange}
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
          value={values.name}
          onChange={handleChange}
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
          value={values.avatar}
          onChange={handleChange}
        />
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
