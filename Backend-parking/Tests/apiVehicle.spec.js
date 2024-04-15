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
let authToken;

///////////////////////////////////
//Creacion y moficacion de vehiculo
//////////////////////////////////
let newobjectId;

describe("Creacion y moficacion del vehiculo", () => {
  test("Inicio de sesión y obtención de token", async () => {
    const loginResponse = await request(app).post("/api/User/Validate").send({
      user: "juanse",
      password: "juanse",
    });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");
    authToken = loginResponse.body.token;
  });
  
  
  test("Debe crear el vehiculo", async () => {
    console.log(authToken);

    const response = await request(app)
      .post("/api/Vehicles")
      .set("Authorization", authToken) // Usa el token aquí
      .send({
        plate: "jsi243",
        color: "negro",
        type: "automovil",
      });
    expect(response.statusCode).toBe(200);
    console.log(response.body);
    console.log(response.body[0]);
    console.log(response.body.objectId);
    newobjectId = response.body.objectId;
  });

  test("debe obtener los automoviles del usuario", async () => {
    const response = await request(app)
      .get("/api/Vehicles/Find")
      .set("Authorization", authToken) // Usa el token aquí
      .send();
    expect(response.statusCode).toBe(200);
    const objeto1 = response.body;
    console.log(objeto1);
    expect(response.body).toHaveProperty("plate");
    expect(response.body).toHaveProperty("userIdUser");
  });

  test("debe modificar el user", async () => {
    console.log(newobjectId);

    const response = await request(app)
      .put(`/api/Vehicles/${newobjectId}`)
      .set("Authorization", authToken) // Usa el token aquí
      .send({
        color: "azul",
        type: "automovil",
      });
    expect(response.statusCode).toBe(200);
  });

  test("debe borrar el vehiculo", async () => {
    console.log(newobjectId);

    const response = await request(app)
      .delete(`/api/Vehicles/${newobjectId}`)
      .set("Authorization", authToken) // Usa el token aquí
      .send();
    expect(response.statusCode).toBe(200);
  });
  // Aumentar el tiempo de espera a 30 segundos
});
