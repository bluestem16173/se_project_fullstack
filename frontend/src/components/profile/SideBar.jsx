import React, { useContext } from 'react'
import './SideBar.css'
import avatarPlaceholder from '../../assets/images/avatar.svg'
import CurrentUserContext from '../../Contexts/CurrentUserContext'

const SideBar = () => {
  const currentUser = useContext(CurrentUserContext);

  const hasAvatar = currentUser?.avatar;
  const userInitial = currentUser?.name?.charAt(0).toUpperCase();

  return (
    <div className="sidebar">
      {hasAvatar ? (
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="sidebar__avatar"
        />
      ) : (
        <div className="sidebar__avatar-placeholder">{userInitial}</div>
      )}
      <p className="sidebar__username">{currentUser?.name}</p>
    </div>
  )
}
export default SideBar
