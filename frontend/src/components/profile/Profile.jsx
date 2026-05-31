import React from 'react'
import SideBar from './SideBar'
import ClothesSection from '../ClothesSection'
import './Profile.css'

const Profile = ({ clothingItems = [], handleOpenItemModal, handleOpenAddGarmentModal }) => {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection 
        clothingItems={clothingItems}
        handleOpenItemModal={handleOpenItemModal}
        handleOpenAddGarmentModal={handleOpenAddGarmentModal}
      />
    </div>
  )
}

export default Profile

