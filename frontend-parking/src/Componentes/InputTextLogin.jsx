import './StyleSheets/InputTextLogin.css'
import { useState } from 'react';

export default function InputTextLogin({ text, fieldName, value, onChange, pattern , title }) {
  
  const handleChange = (e) => {
    // Llama a la función onChange y pásale el evento completo (e)
    onChange(fieldName, e.target.value);
  };

  return (
    <div className="group">
      <input
        required
        type="text"
        className="input1"
        name={fieldName}
        value={value}
        onChange={handleChange}
        pattern={pattern}
        title={title}
      />
      <span className="highlight" />
      <span className="bar" />
      <label>{text}</label>
    </div>
  );
}