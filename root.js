const express = require("express");
const Router = express.Router();
const Scheme = require("./module/scheme");
const king = require("./king"); // Assuming 'king' is your model for database queries

Router.get("/", (req, res) => {
  res.render("goo", { title: "login form", password: '', email: '' });
});

Router.post('/goo', async (req, res) => {
  try {
    const { name, number, email, password, cpassword } = req.body;

    if (password === cpassword) {
      const userData = new Scheme({ name, number, email, password, cpassword });

      await userData.save();
      const usermail = await king.findOne({ email: email });

      if (usermail) {
        res.render("goo", { title: "", password: '', email: 'Email already exists' });
      } else {
        res.render("goo", { title: "Success", password: '', email: 'User registered successfully' });
      }
    } else {
      res.status(400).render("goo", { title: "login form", password: 'Passwords do not match', email: '' });
    }
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).render("goo", { title: "Error", password: '', email: 'Error in the code' });
  }
});

module.exports = Router;
