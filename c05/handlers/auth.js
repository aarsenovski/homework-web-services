const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const { getByEmail, create } = require("../models/account/index");
const { AccountLogin, AccountRegister } = require("../models/account/validate");
const validate = require("../helpers/validateSchema");
const { getSection } = require("../config/index");

const login = async (req, res) => {
  try {
    await validate(req.body, AccountLogin);
    const { email, password } = req.body;

    const account = await getByEmail(email);

    if (!account) {
      return res.status(400).send("Account not found");
    }
    if (!bcryptjs.compareSync(password, account.password)) {
      return res.status(400).send("Wrong password");
    }

    const payload = {
      id: account.id,
      username: account.username,
      email: account.email,
      exp: (new Date() / 1000) * 7 * 24 * 60 * 60,
    };

    const token = jwt.sign(payload, getSection("development").jwt_secret);

    return res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const register = async (req, res) => {
  try {
    await validate(req.body, AccountRegister);
    const { username, email, password, confirmPassword } = req.body;

    const exists = await getByEmail(email);

    if (exists) {
      return res.status(400).send("Account with this email already exists");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const data = {
      username,
      email,
      password: bcryptjs.hashSync(password),
    };

    const account = await create(data);
    return res.status(201).send(account);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  login,
  register,
};
