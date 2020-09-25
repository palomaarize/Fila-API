const { User } = require("../models");
const express = require('express');
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

  async queueRefresh(req, res){
    const endOfTheLine = ((User.max('linePosition')) + 1)
    console.log(endOfTheLine)
    const { id } = req.params
    try{
      await User.update(endOfTheLine, {where: { id: Number (id) }})
      const updateQueue = await User.findOne({where: { id: Number (id) }})
      return res.status(200).json(updateQueue)
    } catch (error){
      return res.status(500).json(error.message)
    }
    
  }
}
module.exports = new UserController();
