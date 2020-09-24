const { request } = require("../../src/app");
const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("Email repetition", async () => {
    const user = await User.create({
      name: "Frodo",
      email: "frodo@bolseiro.com",
      genre: "M",
    });

    const response = await request(app).post("/createUser").send({
      email: "frodo@bolseiro.com",
    });

    expect(response.status).toBe(401);
  });
  
  it("Valid email", async () => {
    const user = await User.create({
      name: "Frodo",
      email: "frodo@bolseiro.com",
      genre: "M",
    });

    const response = await request(app).post("/createUser").send({
      email: "samwise@gamgee.com",
    });

    expect(response.status).toBe(200);
  });
});
