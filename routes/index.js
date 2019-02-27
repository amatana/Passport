var express = require('express');
var router = express.Router();
const User = require('../models/users').User


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/new', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res, next) {
  User.create({
    email: req.body.email,
  }, {password : req.body.password})
  .then(usuario => {
    // console.log(usuario)
    res.json(usuario)
  })
  // res.render('index', { title: 'Express' });
  
});



module.exports = router;
