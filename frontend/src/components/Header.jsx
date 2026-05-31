import "./header.css";
import {Link} from "react-router-dom";

import logo from "../assets/images/logo.svg";
import avatar from "../assets/images/avatar.svg";
import addclothes from "../assets/images/Addchlothes.svg";
import ToggleSwitch from "./ToggleSwitch";


function Header({ handleOpenAddGarmentModal, weatherData, isToggleSwitchOn, onToggleSwitchChange }) {
  const now = new Date();
  const dateStr= now.toLocaleString('default', {
    month: 'long',
    day: 'numeric',    
  });

  return (
    <header className="header">
      <div className="header__side">
        <Link to="/">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
       
      <p className="header__datetime">{dateStr}, {weatherData?.city}</p>
      </div>
      <div className="header__side">
     <ToggleSwitch isToggleSwitchOn={isToggleSwitchOn} 
     onToggleSwitchChange={onToggleSwitchChange} /> 
        <button 
        onClick={handleOpenAddGarmentModal} 
        className="header__add-clothes-btn">

          <img src={addclothes} alt="Add clothes" className="header__add-clothes-icon" />
        </button>
        <Link to="/profile" className="header__username">Terrence Tegegne</Link>
        <img src={avatar} alt="Terrence" className="header__avatar"/>
        </div>
    </header>
  );
}

export default Header




