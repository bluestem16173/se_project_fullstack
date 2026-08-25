import "./header.css";
import {Link} from "react-router-dom";

import logo from "../assets/images/logo.svg";
import avatar from "../assets/images/avatar.svg";
import addclothes from "../assets/images/Addchlothes.svg";
import ToggleSwitch from "./ToggleSwitch";
import CurrentUserContext from '../Contexts/CurrentUserContext';
import { useContext } from "react";



function Header({
  handleOpenAddGarmentModal,
  weatherData,
  isToggleSwitchOn,
  onToggleSwitchChange,
  isLoggedIn,
  handleOpenLoginModal,
  handleOpenRegisterModal,
}) {
  const currentUser = useContext(CurrentUserContext);

  const hasAvatar = currentUser?.avatar;
  const userInitial = currentUser?.name?.charAt(0).toUpperCase();

  const now = new Date();
  const dateStr = now.toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__side">
        <Link to="/">
          <img
            src={logo}
            alt="WTWR logo"
            className="header__logo"
          />
        </Link>

        <p className="header__datetime">
          {dateStr}, {weatherData?.city}
        </p>
      </div>

      <div className="header__side">
        <ToggleSwitch
          isToggleSwitchOn={isToggleSwitchOn}
          onToggleSwitchChange={onToggleSwitchChange}
        />

        {isLoggedIn ? (
          <>
            <button
              type="button"
              onClick={handleOpenAddGarmentModal}
              className="header__add-clothes-btn"
            >
              <img
                src={addclothes}
                alt="Add clothes"
                className="header__add-clothes-icon"
              />
            </button>

            <Link to="/profile" className="header__username">
              {currentUser?.name}
            </Link>

            {hasAvatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">
                {userInitial}
              </div>
            )}
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleOpenRegisterModal}
              className="header__auth-btn"
            >
              Sign Up
            </button>

            <button
              type="button"
              onClick={handleOpenLoginModal}
              className="header__auth-btn"
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;