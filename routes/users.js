var express = require('express');
var router = express.Router();
var {User} = require("../models/users")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function (req, res, next) {
  res.render('users.ejs', { title: 'Express Registration' });
})

router.post('/register', function (req, res, next) {
  User.create({
    email: req.body.email,
    username : req.body.username,
  }, {password : req.body.password})
  .then(usuario => {
    console.log(usuario, "-----------------------------")
    res.json(usuario)
  })
  
})

router.get("/")

module.exports = router;
