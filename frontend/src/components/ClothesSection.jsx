import React from 'react'
import ItemCard from './ItemCard'
import './ClothesSection.css'
import addnew from '../assets/images/+ Addnew.svg'
import { useContext } from 'react';
import CurrentUserContext from '../Contexts/CurrentUserContext';

const ClothesSection = ({ clothingItems = [], handleOpenItemModal, handleOpenAddGarmentModal }) => {
  const currentUser = useContext(CurrentUserContext);

  const ownClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section-wrapper">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your Items</h2>
        <img 
          src={addnew} 
          alt="Add New" 
          className="clothes-section__add-clothes-icon"
          onClick={handleOpenAddGarmentModal}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className="clothes-section__grid">
      {ownClothingItems.length > 0 ? (
        ownClothingItems.map((item) => (
            <ItemCard
              key={item._id}
              name={item.name}
              link={item.imageUrl}
              onClick={() => handleOpenItemModal && handleOpenItemModal(item)}
            />
          ))
        ) : (
          <p>No clothing items to display</p>
        )}
      </div>
    </div>
  )
}

export default ClothesSection