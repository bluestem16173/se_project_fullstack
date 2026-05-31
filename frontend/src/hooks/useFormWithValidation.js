import { useState, useCallback, useRef, useEffect } from 'react';

export function useFormWithValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  // Use ref to track current values for synchronous access
  const valuesRef = useRef(values);
  // Use ref to store initial values so resetForm doesn't need to depend on it
  const initialValuesRef = useRef(initialValues);
  
  // Keep ref in sync with state - update immediately
  useEffect(() => {
    valuesRef.current = values;
  }, [values]);
  
  // Update initial values ref when they change (but don't cause re-renders)
  useEffect(() => {
    initialValuesRef.current = initialValues;
  }, [initialValues]);
  
  // Validation function (pure function, doesn't need useCallback)
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value || (typeof value === 'string' && value.trim().length === 0)) {
          error = 'Name is required';
        } else if (typeof value === 'string') {
          const trimmedLength = value.trim().length;
          if (trimmedLength <= 1) {
            error = 'name must be at least 1 character';
          } else if (trimmedLength >= 30) {
            error = 'name must be at most 30 characters';
          }
        }
        break;
      
      case 'link':
        if (!value || (typeof value === 'string' && value.trim().length === 0)) {
          error = 'Image URL is required';
        } else if (typeof value === 'string' && value.trim().length > 0) {
          // Simple URL regex validation - checks for http:// or https:// followed by domain
          const urlRegex = /^(https?:\/\/)?[^\s]+\.[^\s]+/i;
          if (!urlRegex.test(value.trim())) {
            error = 'Enter a valid URL';
          }
        }
        break;
      
      case 'weather':
        if (!value) {
          error = 'Please select a weather type';
        } else {
          error = '';
        }
        break;
      
      default:
        error = '';
        break;
    }

    return error;
  };

  // Check if entire form is valid
  const checkFormValidity = useCallback((currentValues, currentErrors) => {
    // Check if all required fields have values
    const hasAllValues = 
      currentValues.name?.trim() &&
      currentValues.link?.trim() &&
      currentValues.weather;
    
    // Check if there are no errors
    const hasNoErrors = Object.values(currentErrors).every(error => error === '');
    
    return hasAllValues && hasNoErrors;
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle radio buttons and checkboxes
    const fieldValue = type === 'checkbox' ? checked : value;
    
    // Update values
    setValues((prevValues) => {
      const newValues = {
        ...prevValues,
        [name]: fieldValue
      };

      // Always validate to keep isValid accurate, but errors only shown after submit
      const error = validateField(name, fieldValue);
      
      setErrors((prevErrors) => {
        const newErrors = {
          ...prevErrors,
          [name]: error
        };

        // Check overall form validity
        const formIsValid = checkFormValidity(newValues, newErrors);
        setIsValid(formIsValid);

        return newErrors;
      });

      return newValues;
    });
  }, [checkFormValidity]);

  const resetForm = useCallback((newValues) => {
    // Use initialValues from ref, but allow override
    const resetValues = newValues !== undefined ? newValues : initialValuesRef.current;
    setValues(resetValues);
    setErrors({});
    setIsValid(false);
    setHasSubmitted(false);
  }, []);

  const validateForm = useCallback(() => {
    // Get current values from ref (should be in sync via useEffect)
    const currentValues = valuesRef.current;
    const newErrors = {};
    
    // Validate all fields
    Object.keys(currentValues).forEach((name) => {
      const error = validateField(name, currentValues[name]);
      newErrors[name] = error;
    });
    
    // Update errors and hasSubmitted state - these will trigger re-render
    setErrors(newErrors);
    setHasSubmitted(true);
    
    // Check overall form validity
    const formIsValid = checkFormValidity(currentValues, newErrors);
    setIsValid(formIsValid);
    
    // Return both validity and the validated values
    return { isValid: formIsValid, values: currentValues, errors: newErrors };
  }, [checkFormValidity]);

  const setValue = useCallback((name, value) => {
    setValues((prevValues) => {
      const newValues = {
        ...prevValues,
        [name]: value
      };

      // Validate when setting value programmatically
      const error = validateField(name, value);
      
      setErrors((prevErrors) => {
        const newErrors = {
          ...prevErrors,
          [name]: error
        };

        // Check overall form validity
        const formIsValid = checkFormValidity(newValues, newErrors);
        setIsValid(formIsValid);

        return newErrors;
      });

      return newValues;
    });
  }, [checkFormValidity]);

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValue,
    validateForm,
    hasSubmitted
  };
}

