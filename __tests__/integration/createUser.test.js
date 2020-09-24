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
      nome: "Paloma Arize",
      email: "paloma@ufba.br",
      gender: "F",
    });

    expect(response.status).toBe(201);
  });
});
