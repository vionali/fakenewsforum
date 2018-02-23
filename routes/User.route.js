const express = require('express');
const router  = express.Router();
const dateFormat = require('dateformat');


function makeRouter(Users) {
  router.get('/login', (req, res) => {
    if (req.session.username) {
      res.status(400).send("You are already loggin in")
    }

    res.render('pages/login', {
      username: req.session.username || null,
      loggedIn: req.session.username? true: false
    })
  })

  router.get('/register', (req, res) => {
    if (req.session.username) {
      res.status(400).send("You are already loggin in")
    }

    res.render('pages/register', {
      username: req.session.username || null,
      loggedIn: req.session.username? true: false
    })
  })

  router.post('/register', (req, res) => {
    try {
      if (req.body.password !== req.body.password2) {
        throw new Error("The Passwords you provided do not match")
      }
      console.log(req.body)
      Users.create(req.body)
      login(req.body.name, req)
      res.status(201).send("User created")
    }
    catch(err) {
      res.status(400).send(err.message)
    }
    //  res.render('pages/index',{articles: []})
  });

  router.post('/login', (req, res) => {
    console.log("Login")
    console.log(req.body)

    let u = req.body;
    if (Users.isPassword(u.Username, u.password)) {
      login(u.Username, req)
      return res.status(200).send("Login successful")
    }
    else {
      res.status(403).send("Wrong User / Password")
    }
  })

  router.get('/logout', (req, res) => {
    logout(req)
    res.redirect('/')
  })
  return router;
}
function login(username, req) {
  console.log("Logged in as "+username)
  req.session.username=username;
}
function logout(req) {
  delete req.session.username
}
module.exports=makeRouter
