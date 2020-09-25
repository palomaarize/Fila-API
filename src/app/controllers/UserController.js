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
    try {
      const { id } = req.params;
      const theLastUser = await User.findOne({
        order: [["line_position", "DESC"]],
      });
      console.log("Ultima posição");
      console.log(theLastUser.line_position);
      let newValue = Number(theLastUser.line_position) + 1;
      console.log("Nova ultima posição");
      console.log(newValue);
      await User.update(
        { line_position: newValue },
        { where: { id: Number(id) }, returning: true, plain: true }
      );
      const lastQueue = await User.findOne({ where: { id: Number(id) } });
      console.log(lastQueue);
      return res.status(200).json(lastQueue);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async searchByEmail(req, res) {
    const { email } = req.params;
    try {
      const userEmail = await User.findOne({
        where: {
          email: String(email),
        },
      });
      return res
        .status(200)
        .json(
          userEmail.name + ", sua posição na fila é: " + userEmail.line_position
        );
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async showLineInOrder(req, res) {
    try {
      const line = await User.findAll({
        order: [["line_position", "ASC"]],
        attributes: ["line_position", "gender", "name", "email"],
      });

      const newLine = line.filter((User) => User.line_position > 0);
      return res.status(200).json(newLine);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async queueParameterGender(req, res) {
    const { gender } = req.params;
    try {
      const lineGender = await User.findAll({
        where: {
          gender: String(gender),
        },
        attributes: ["line_position", "gender", "name", "email"],
        order: [["line_position", "ASC"]],
      });
      return res.status(200).json(lineGender);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  async queueParameterName(req, res) {
    const { name } = req.params;
    try {
      const lineName = await User.findAll({
        where: {
          name: String(name),
        },
        attributes: ["line_position", "gender", "name", "email"],
        order: [["line_position", "ASC"]],
      });
      return res.status(200).json(lineName);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  async queueParameterEmail(req, res) {
    const { email } = req.params;
    try {
      const lineEmail = await User.findAll({
        where: {
          email: String(email),
        },
        attributes: ["line_position", "gender", "name", "email"],
        order: [["line_position", "ASC"]],
      });
      order: [["line_position", "ASC"]];
      return res.status(200).json(lineEmail);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
/// Tentei criar um fluxo de pensamento para que pudesse por em prática o popLine, mas após muitas tentativas, 
///não consegui achar a forma certa. Espero que trabalhando na equipe com vocÊs possamos encontrar respostas como essa!
  // async queueDelete(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const firstUSer = await User.findOne({
  //       order: [["line_position", "ASC"]],
  //     });

  //     let newValue =
  //       Number(firstUSer.line_position) - Number(firstUSer.line_position);
  //     console.log(newValue);

  //     await User.update(
  //       { line_position: newValue },
  //       { where: { id: firstUSer.id } }
  //     );
  //     return res.status(200).json(newValue);
  //   } catch (error) {
  //     return res.status(500).json(error.message);
  //   }
  // }
}
module.exports = new UserController();
