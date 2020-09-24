const { User } = require("../models");

class CreateUserController {
  async store(req, res) {
    const { name, email, gender } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(404).send({ msg: "User already registered" });
    }
    const newUser = await User.create({ name, email, gender });
    return res.status(201).send({ msg: "User registered", newUser });

    return res.json({ user });
  }
}

module.exports = new CreateUserController();
