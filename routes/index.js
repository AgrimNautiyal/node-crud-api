var router = require('express').Router();
var request = require('request');


router.get('/', function(req, res){
  console.log("Home route activated");
    res.json({message : 'response'});
});


router.get('/login/:username/:password', function(req, res){
  console.log("Login Route activated");
  var username = req.params.username
  var password = req.params.password

  res.json({username : username,  password:password});
});




module.exports = router;
