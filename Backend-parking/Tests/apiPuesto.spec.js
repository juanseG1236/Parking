//apiUser.spec.js

import request from "supertest";
import app from "../src/app.js";

let server;

beforeAll(() => {
  // Iniciar el servidor antes de que comiencen las pruebas
  server = app.listen(3000);
});

afterAll((done) => {
  // Cerrar el servidor después de que todas las pruebas hayan terminado
  server.close(done);
});

describe('creacion y consulta de puestos', () => {
  
  
  test('should respond with a 200 status code', async () => {
    const response = await request(app).post('/api/Puesto').send({
      "nPuesto": "39",
      "available": "true"
  });
    expect(response.statusCode).toBe(200);
  }, 30000); // Aumentar el tiempo de espera a 30 segundos

  test('should respond with a 200 status code', async () => {
    const response = await request(app).get('/api/Puesto').send();
    expect(response.statusCode).toBe(200);
    const objeto1 = response.body[0]
    console.log(objeto1)
    expect(response.body[0]).toHaveProperty("nPuesto");

  }, 30000); // Aumentar el tiempo de espera a 30 segundos
});  


