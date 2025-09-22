import { useState, useRef, useEffect } from "react";

export default function InputField(
  { id, name, className, initvalue, type, placeholder, onEnterValue }
) {
  const [fieldValue, setFieldValue] = useState(initvalue);
  
  const handleChange = (event) => {
    setFieldValue(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Prevent default form submission if the input is inside a form
      event.preventDefault(); 
      onEnterValue(fieldValue); // Update state on Enter
    }
  };

  return (
      <input
        id={id}
        name={name}
        className={className}
        type={type} 
        value={fieldValue} // Value is driven by state
        onChange={handleChange} // Updates state on change
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
  );

}

