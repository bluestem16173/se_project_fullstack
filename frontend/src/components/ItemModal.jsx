import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../Contexts/CurrentUserContext";

function ItemModal({ isOpen, card, onClose, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card?.owner === currentUser?._id;

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
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

        {card && (
          <>
            <img
              src={card.imageUrl || card.link}
              alt={card.name}
              className="modal__image"
            />

            <div className="modal__footer">
              <div className="modal__header-row">
                <h2 className="modal__text">{card.name}</h2>

                {isOwn && (
                  <button
                    type="button"
                    className="modal__delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(card._id || card.id);
                    }}
                  >
                    Delete Item
                  </button>
                )}
              </div>

              <p className="modal__text-weather">
                Weather: {card.weather}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ItemModal;