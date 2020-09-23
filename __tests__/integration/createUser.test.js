const request = require("supertest");
const app = require("../../src/app");
const truncate = require("../../src/utils/truncate");
const { User } = require("../../src/app/models");

// describe("Mini teste", () => {
//   it("Add user no db", async () => {
//     const user = await User.create({
//       name: "Diego",
//       email: "diego@bol",
//       genre: "M",
//     });

//     console.log(user);
//     expect(user.name).toBe("Diego");
//   });
// });

describe("Register", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should register a new user", async () => {
    const response = await request(app).post("/createUser").send({
      nome: "Paloma Arize",
      email: "paloma@paloma.com.br",
      gender: "F",
    });

    expect(response.status).toBe(201);
  });
});
