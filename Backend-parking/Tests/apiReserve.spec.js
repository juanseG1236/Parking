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
  ///////////////////////////////////
  //Creacion y moficacion de vehiculo
  //////////////////////////////////
  let newobjectId;

  describe("Creacion y moficacion de la reserva", () => {
    test("Debe crear la reserva", async () => {
      console.log(authToken);

      const response = await request(app)
        .post("/api/Reserve")
        .set("Authorization", authToken) // Usa el token aquí
        .send({
          date: "2023-12-11T05:00:00.000+00:00",
          vehiclePlate: "65ce86acbae8293f25cf5ec1",
        });
      expect(response.statusCode).toBe(200);
      console.log(response.body);
      console.log(response.body[0]);
      console.log(response.body.objectId);
      newobjectId = response.body.objectId;
    });

    test("debe obtener las reservas del usuario", async () => {
      const response = await request(app)
        .get("/api/Reserve/Find")
        .set("Authorization", authToken) // Usa el token aquí
        .send();
      expect(response.statusCode).toBe(200);
      const objeto1 = response.body;
      console.log(objeto1);
      expect(response.body[0]).toHaveProperty("date");
      expect(response.body[0]).toHaveProperty("vehiclePlate");
    });

    test("debe modificar la reserva", async () => {
      console.log(newobjectId);

      const response = await request(app)
        .put(`/api/Reserve/${newobjectId}`)
        .set("Authorization", authToken) // Usa el token aquí
        .send({
          date: "2024-10-11T05:00:00.000+00:00",
          vehiclePlate: "65ce86acbae8293f25cf5ec1",
        });
      expect(response.statusCode).toBe(200);
    });

    test("debe borrar la reserva", async () => {
      console.log(newobjectId);

      const response = await request(app)
        .delete(`/api/Reserve/${newobjectId}`)
        .set("Authorization", authToken) // Usa el token aquí
        .send();
      expect(response.statusCode).toBe(200);
    });
   // Aumentar el tiempo de espera a 30 segundos
  });

