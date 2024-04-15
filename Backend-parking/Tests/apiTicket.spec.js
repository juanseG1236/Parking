//apiUser.spec.js
import request from "supertest";
import app from "../src/app.js";
import Ticket from "../src/models/ticketMd.js";

let server;

beforeAll(() => {
  // Iniciar el servidor antes de que comiencen las pruebas
  server = app.listen(3000);
});

afterAll((done) => {
  // Cerrar el servidor después de que todas las pruebas hayan terminado
  server.close(done);
});
let authToken;

let idTicketNew;

//creacion de ticket
describe("Proceso de creacion y cierre de ticket", () => {
  test("Inicio de sesión y obtención de token", async () => {
    const loginResponse = await request(app).post("/api/User/Validate").send({
      user: "juanse",
      password: "juanse",
    });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");
    authToken = loginResponse.body.token;
  });

  test("debe crar un ticket", async () => {
    const response = await request(app)
      .post("/api/Ticket")
      .set("Authorization", authToken) // Usa el token aquí

      .send({ plate: "cmc954", color: "rojo", type: "automovil", tariff: "3" });
    expect(response.statusCode).toBe(200);
    idTicketNew = response.body._id;
    console.log(idTicketNew);
  }, 30000); // Aumentar el tiempo de espera a 30 segundos

  test("Debe cerrar el ticket", async () => {
    console.log(idTicketNew);

    const response = await request(app)
      .post(`/api/ticket/Exit`)
      .set("Authorization", authToken) // Usa el token aquí
      .send({ idTicket: idTicketNew });
    expect(response.statusCode).toBe(200);
    const objeto1 = response.body[0];
    console.log(objeto1);
    const ticketUpdated = response.body.ticketUpdated;
    expect(ticketUpdated).toHaveProperty("price");
  });

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
        .set("Authorization", authToken) // Usa el token aquí

        .send();
      expect(response.statusCode).toBe(200);
      const objeto1 = response.body;
      console.log(objeto1);
      expect(response.body[0]).toHaveProperty("timeEntry");
      expect(response.body[0]).toHaveProperty("idPuesto");
    });
    // Aumentar el tiempo de espera a 30 segundos
  });

///////////////////////////////////
//Pueba de calculo de precio de tocket
//////////////////////////////////

describe("Pruebas para el método calculatePrice de ticketSchema", () => {
  // Crear un ticket de ejemplo
  const ticket = new Ticket({
    timeEntry: new Date(),
    idPuesto: "6531d20b6e557c3c9a86e910",
    idVehicle: "65762a51532cae15b31d0224",
    tariff: 10, // Tarifa por hora
  });

  test("Calcular el precio para un período de estacionamiento", () => {
    // Establecer la hora de salida
    const exitDate = new Date(); // Hora de salida

    // Calcular el precio
    const price = ticket.exit();
    console.log(ticket.timeEntry);

    // Comprobar que el precio calculado es correcto
    expect(price[1]).toBe(10); // La tarifa es de 10 por hora, por lo que 2.5 horas equivalen a 30
  });

  test("Calcular el precio para un período de estacionamiento corto", () => {
    // Establecer la hora de salida
    const ahora = new Date();

    // Sumarle 30 minutos
    const exitDate = new Date(ahora.getTime() + 120 * 60000);

    // Calcular el precio
    const price = ticket.calculatePrice(exitDate);

    // Comprobar que el precio calculado es correcto
    expect(price).toBe(20); // La tarifa mínima es de 10, incluso para períodos de estacionamiento cortos
  });
});
