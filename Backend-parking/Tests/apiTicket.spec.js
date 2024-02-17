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
let authToken
describe("Pruebas con token", () => {
  test("Inicio de sesión y obtención de token", async () => {
    // Supongamos que tienes una ruta para iniciar sesión que devuelve un token
    const loginResponse = await request(app).post("/api/User/Validate").send({
      user: "juanse",
      password: "juanse",
    });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");
    // Almacena el token para usarlo en otras pruebas
     authToken = loginResponse.body.token;
  });
});


let idTicketNew;

//creacion de ticket
describe("Proceso de creacion y cierre de ticket ", () => {
  test("dene crar un ticket", async () => {
    const response = await request(app)
      .post("/api/Ticket")
      .set("Authorization", authToken)  // Usa el token aquí

      .send(  {  "plate": "cmc954",
      "color": "rojo",
      "type": "automovil",
      "tariff": "3"});
    expect(response.statusCode).toBe(200);
    idTicketNew = response.body._id;
    console.log(idTicketNew);
  }, 30000); // Aumentar el tiempo de espera a 30 segundos
});

test("Debe cerrar el ticket", async () => {
  console.log(idTicketNew);
 
  const response = await request(app)
    .post(`/api/ticket/Exit`)
    .set("Authorization", authToken)  // Usa el token aquí
    .send({ "idTicket": idTicketNew });
  expect(response.statusCode).toBe(200);
  const objeto1 = response.body[0];
  console.log(objeto1);
  const ticketUpdated = response.body.ticketUpdated;
  expect(ticketUpdated).toHaveProperty("price");});



describe("comprobar que hay tickets ", () => {
  test("debe tener hora de entrada y id puesto", async () => {
    const response = await request(app).get("/api/Ticket").send();
    expect(response.statusCode).toBe(200);
    const objeto1 = response.body[0];
    console.log(objeto1);
    expect(response.body[0]).toHaveProperty("_id");
    expect(response.body[0]).toHaveProperty("timeEntry");
    expect(response.body[0]).toHaveProperty("idPuesto");
  });

  test("debe ver si hay un ticket del user", async () => {
    const response = await request(app)
      .get("/api/Ticket/FindP")
      .set("Authorization", authToken)  // Usa el token aquí

      .send();
    expect(response.statusCode).toBe(200);
    const objeto1 = response.body[0];
    console.log(objeto1);
    expect(response.body[0]).toHaveProperty("_id");
    expect(response.body[0]).toHaveProperty("timeEntry");
    expect(response.body[0]).toHaveProperty("idPuesto");
  });
  // Aumentar el tiempo de espera a 30 segundos
});



// Aumentar el tiempo de espera a 30 segundos

// describe('Se pueda crear un puesto', () => {
//   test('should respond with a 200 status code', async () => {
//     const response = await request(app).post('/api/Puesto').send({
//       "nPuesto": "30",
//       "available": "true"
//   });
//     expect(response.statusCode).toBe(200);
//   }, 30000); // Aumentar el tiempo de espera a 30 segundos
// });
