const { User } = require("../models");
const express = require("express");
const database = require("../../config/database");

class UserController {
  async store(req, res) {
    const { name, email, gender } = req.body;
    console.log(email);
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(401).send({ msg: "User already registered" });
    }
    const newUser = await User.create({ name, email, gender });
    return res.status(201).send({ msg: "User registered", newUser });
    return res.json({ user });
  }

  async queueRefresh(req, res) {
    let endOfTheLine = await User.findOne({
      order : [
        ['line_position'],
        ['line_position', 'DESC'],
        // sequelize.fn('max', sequelize.col('line_position'))
      ]
      });
    endOfTheLine += 1;
    // == null
    //   ? 1
    //   : User.findOne({ order: [["line_position", "DESC"]] }).line_position + 1;
    // User.max('line_position');
    console.log(endOfTheLine);
    const { id } = req.params;
    try {
      await User.update(
        { line_position: endOfTheLine },
        { where: { id: Number(id) } }
      );
      const lastQueue = await User.findOne({ where: { id: Number(id) } });
      return res.status(200).json(lastQueue);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}
module.exports = new UserController();
