function InputField(
  { name, label, type, placeholder, error, fieldRef }
) {
  //alert('Input fielddYour ZIP is: ' + fieldRef.value);
  return (
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
  );
}

