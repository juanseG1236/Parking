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

///////////////////////////////////
//Prueba de autenticacion
//////////////////////////////////

let authToken;
describe("Prueba de autentiacion", () => {
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

  test("debe obtener la info del user", async () => {
    const response = await request(app)
      .get("/api/User/Data")
      .set("Authorization", authToken) // Usa el token aquí
      .send();
    expect(response.statusCode).toBe(200);
    const objeto1 = response.body;
    console.log(objeto1);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("password");
  });
});

///////////////////////////////////
//Creacion y moficacion de usuario
//////////////////////////////////
let newobjectId;

describe("operaciones CRUD user", () => {
  test("Debe crear el user", async () => {
    const response = await request(app).post("/api/User").send({
      user: "deku123",
      name: "deku",
      password: "takoma",
      lastname: "deku",
    });
    expect(response.statusCode).toBe(200);
    console.log(response.body);
    console.log(response.body[0]);
    console.log(response.body.objectId);
    newobjectId = response.body.objectId;
  });


  test("Inicio de sesión y obtención de token", async () => {
    // Supongamos que tienes una ruta para iniciar sesión que devuelve un token
    const loginResponse = await request(app).post("/api/User/Validate").send({
      user: "deku123",
      password: "takoma",
    });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");
    // Almacena el token para usarlo en otras pruebas
    authToken = loginResponse.body.token;
  });


  test("debe modificar el user", async () => {
    console.log(newobjectId);

    const response = await request(app)
      .put(`/api/User/${newobjectId}`)
      .set("Authorization", authToken) // Usa el token aquí
      .send({
        user: "jipnsempai",
        name: "jin",
        password: "takoma",
        lastname: "Sam1",
      });
    expect(response.statusCode).toBe(200);
  });

  test("debe borrar el user", async () => {
    console.log(newobjectId);

    const response = await request(app)
      .delete(`/api/User/${newobjectId}`)
      .set("Authorization", authToken) // Usa el token aquí
      .send();
    expect(response.statusCode).toBe(200);
  });
  // Aumentar el tiempo de espera a 30 segundos
});

///////////////////////////////////
//Errores de validacion
//////////////////////////////////

describe("Manejo de errores al crear user", () => {
  test("debería devolver un error 'usuario repetido' si se intenta crear un usuario duplicado", async () => {
    const response = await request(app).post("/api/User").send({
      name: "juanse",
      lastname: "juanse",
      user: "juanse",
      password: "juanse",
    });

    // Verificamos que la respuesta contenga el mensaje de error adecuado
    expect(response.status).toBe(500);
    expect(response.text).toBe("usuario repetido");
  });

  test("debería devolver un error 'el usuario no cumple con las validaciones' si el usuario es demasiado corto", async () => {
    // Intentamos crear un usuario con un nombre de usuario demasiado corto
    const response = await request(app).post("/api/User").send({
      name: "a",
      lastname: "a",
      user: "a",
      password: "a",
      role: "a",
    });

    // Verificamos que la respuesta contenga el mensaje de error adecuado
    expect(response.status).toBe(501);
    expect(response.text).toBe("el usuario no cumple con las validaciones");
  });

});

