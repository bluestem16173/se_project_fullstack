import { useState } from 'react';

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    
    // Reset error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const resetForm = (newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setIsValid(false);
  };

  const setValue = (name, value) => {
    setValues({
      ...values,
      [name]: value
    });
  };

  return {
    values,
    handleChange,
    errors,
    setErrors,
    isValid,
    setIsValid,
    resetForm,
    setValue
  };
}


