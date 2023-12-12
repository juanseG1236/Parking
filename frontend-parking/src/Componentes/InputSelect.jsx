import React from 'react'; // Importa React
import './StyleSheets/InputTextLogin.css';

export default function InputSelect({ text, fieldName, value, onChange, options }) {
  // No necesitas las propiedades `pattern` y `title` en un elemento de selección

  const handleChange = (e) => {
    // Llama a la función onChange y pásale el campo y el valor seleccionado
    onChange(fieldName, e.target.value);
  };

  return (
    <div className="group">
      <select
        required
        className="input1"
        name={fieldName}
        value={value}
        onChange={handleChange}
      >
         <option value=""></option>
        {/* Agrega las opciones como componentes <option> */}
        {options.map((option) => (
          <option 
          key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="highlight" />
      <span className="bar" />
      <label>{text}</label>
    </div>
  );
}
