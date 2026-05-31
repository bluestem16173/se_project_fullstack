import React from 'react'
import { Link } from 'react-router-dom'
import './SideBar.css'
import avatar from '../../assets/images/avatar.svg'

const SideBar = () => {
  return (
    <div className="sidebar">
         <img
        src={avatar}
        alt="Terrence Tegegne"
        className="sidebar__avatar"
      />
      <p className="sidebar__username">Terrence Tegegne</p>  
   
    </div>
  )
}
export default SideBar

