class CreateUserController {
  async store(req, res) {
    return res.status(201).send();
  }
}

module.exports = new CreateUserController();
