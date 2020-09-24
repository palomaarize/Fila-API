const request = require("supertest");
const app = require("../../src/app");
const truncate = require("../utils/truncate");
const { User } = require("../../src/app/models");

describe("Register", () => {
  beforeEach(async () => {
    await truncate();
  });  

  it("should register a new user", async () => {
    const response = await request(app).post("/createUser").send({
      name: "Paloma Arize",
      email: "palomaarize@ufba.br",
      gender: "F",
    });

    expect(response.status).toBe(201);
  });

  it("should not register two user with the same e-mail", async () => {
    const response = await request(app).post("/createUser").send({
      name: "Paulo Arize",
      email: "palomaarize@ufba.br",
      gender: "M",
    });
    expect(response.status).toBe(201);
    const secondResponse = await request(app).post("/createUser").send({
      name: "Paulo Arize",
      email: "palomaarize@ufba.br",
      gender: "M",
    });
    expect(secondResponse.status).toBe(401);
  });
});
