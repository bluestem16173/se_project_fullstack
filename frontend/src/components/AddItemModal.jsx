import React, { useEffect, useMemo } from 'react'
import { useFormWithValidation } from '../hooks/useFormWithValidation'
import './AddItemModal.css'
import ModalWithForm from './ModalWithForm'

function AddItemModal({isOpen, onClose, onSubmit}) {
  // Memoize initial values to prevent hook order issues
  const initialValues = useMemo(() => ({
    name: '',
    link: '',
    weather: 'hot'
  }), [])
  
  const {values, handleChange, errors, isValid, resetForm, validateForm, hasSubmitted} = useFormWithValidation(initialValues)

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form and show errors - this will set hasSubmitted to true and update errors
    const validationResult = validateForm();
    
    console.log('Form submission - validation result:', validationResult);
    
    // Only submit if form is valid
    if (validationResult.isValid && onSubmit) {
      const submitData = {
        name: validationResult.values.name.trim(),
        link: validationResult.values.link.trim(),
        weather: validationResult.values.weather
      };
      console.log('Submitting form with data:', submitData);
      onSubmit(submitData);
      // Reset form after successful submission
      resetForm();
      onClose();
    } else {
      console.log('Form is invalid, not submitting. Errors:', validationResult.errors);
    }
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Add Garment"
      name="addgarment"
      buttonText="Add Garment"
      onSubmit={handleSubmit}
    >
      <div className="modal__form-field">
        <label htmlFor='add-garment-name-input' className='modal__label'>
          Name
        </label>
        <input 
          type='text' 
          id='add-garment-name-input' 
          className={`modal__input ${hasSubmitted && errors.name ? 'modal__input_error' : ''}`}
          name='name'
          value={values.name} 
          onChange={handleChange}
          placeholder="Name"
        />
        {hasSubmitted && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </div>

      <div className="modal__form-field">
        <label htmlFor='add-garment-link-input' className='modal__label'>
          Image
        </label>
        <input 
          type='text' 
          id='add-garment-link-input' 
          className={`modal__input ${hasSubmitted && errors.link ? 'modal__input_error' : ''}`}
          name='link'
          value={values.link} 
          onChange={handleChange}
          placeholder="Image URL"
        />
        {hasSubmitted && errors.link && (
          <span className="modal__error">{errors.link}</span>
        )}
      </div>

      <div className="modal__form-field">
        <p className="modal__label-text">Select the weather type:</p>
        <div className="modal__radio-group">
          <label className="modal__radio-label">
            <input 
              type='radio' 
              className='modal__radio' 
              name='weather'
              value='hot'
              checked={values.weather === 'hot'} 
              onChange={handleChange}
            />
            <span>Hot</span>
          </label>
          <label className="modal__radio-label">
            <input 
              type='radio' 
              className='modal__radio' 
              name='weather'
              value='warm'
              checked={values.weather === 'warm'} 
              onChange={handleChange}
            />
            <span>Warm</span>
          </label>
          <label className="modal__radio-label">
            <input 
              type='radio' 
              className='modal__radio' 
              name='weather'
              value='cold'
              checked={values.weather === 'cold'} 
              onChange={handleChange}
            />
            <span>Cold</span>
          </label>
        </div>
        {hasSubmitted && errors.weather && (
          <span className="modal__error">{errors.weather}</span>
        )}
      </div>
    </ModalWithForm>
  )
}

export default AddItemModal



