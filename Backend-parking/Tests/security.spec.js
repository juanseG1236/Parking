import bcrypt from 'bcrypt';
import User from "../src/models/userMd.js";

describe('Prueba de la función encripted', () => {
  test('Debería devolver una cadena encriptada', () => {
    // Definir una contraseña de prueba
    const password = 'password123';

    // Llamar a la función encripted con la contraseña de prueba
    const hashedPassword = User.encripted(password);

    // Verificar si el resultado es una cadena no vacía
    expect(typeof hashedPassword).toBe('string');
    expect(hashedPassword.length).toBeGreaterThan(0);

    // Verificar si la contraseña encriptada es diferente a la contraseña original
    expect(hashedPassword).not.toBe(password);

    // Puedes realizar más pruebas aquí según tus necesidades
  });
});
