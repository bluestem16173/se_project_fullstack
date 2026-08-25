import React from 'react'
import SideBar from './SideBar'
import ClothesSection from '../ClothesSection'
import './Profile.css'

function LogoutButton({ handleLogout }) {
  return (
    <button type="button" onClick={handleLogout}>
      Sign out
    </button>
  );
}

function Profile({
  clothingItems,
  handleOpenItemModal,
  handleOpenAddGarmentModal,
  handleLogout,
}) {
  return (
    <div className="profile">
      <SideBar />

      <ClothesSection
        clothingItems={clothingItems}
        handleOpenItemModal={handleOpenItemModal}
        handleOpenAddGarmentModal={handleOpenAddGarmentModal}
      />

      <LogoutButton handleLogout={handleLogout} />
    </div>
  );
}

export default Profile

