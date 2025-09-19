import { useState, useRef, useEffect } from "react";

export default function InputField(
//  { name, label, type, placeholder, error, fieldRef }
  { id, name, className, initvalue, type, placeholder, onEnterValue }
) {
  const [fieldValue, setFieldValue] = useState(initvalue);
  
  const handleChange = (event) => {
    //console.log('handleChange='+event.target.value);
    setFieldValue(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Prevent default form submission if the input is inside a form
      event.preventDefault(); 
      //console.log('handleKeyDown ENTER');
      onEnterValue(fieldValue); // Update state on Enter
      //setCurrentZip(''); // Clear the input after submission (optional)
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

  //alert('Input fielddYour ZIP is: ' + fieldRef.value);
  /*return (
    <Form.Group controlId={name} className="left">
      {label && <Form.Label className="left">{label}</Form.Label>}
      <Form.Control
        className="left"
        type={type || 'text'}
        placeholder={placeholder}
        ref={fieldRef}
        defaultValue={fieldRef.value}
      />
      <Form.Text className="left">{error}</Form.Text>
    </Form.Group>
  );*/
}

