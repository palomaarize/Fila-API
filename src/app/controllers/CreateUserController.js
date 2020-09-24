const { User } = require("../models");

class CreateUserController {
  async store(req, res) {
    const { name, email, genre } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(201).json({ message: "Valid for registration!" });
    } else {
      return res
        .status(401)
        .json({ message: "This email is already registered!" });
    }

    return res.jason ({ user });
  }
}

module.exports = new CreateUserController();
