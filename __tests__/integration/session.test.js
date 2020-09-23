const request = require("supertest");
const app = require("../../src/app");

describe("Register", () => {
  beforeEach(async () => {});

  it("should register a new user", async () => {
    const response = await request(app).post("/createUser").send({
      nome: "Paloma Arize",
      email: "paloma@paloma.com.br",
      genero: "feminino",
    });

    expect(response.status).toBe(201);
  });
});
