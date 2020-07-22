var router = require('express').Router();
var request = require('request');


router.get('/', function(req, res){
  console.log("Home route activated");
    res.json({message : 'response'});
});

//to test if verify works or not
router.get('/login/:username/:password', function(req, res){
  console.log("Login Route activated");
  var username = req.params.username
  var password = req.params.password
  if (username == "agrim" && password == "password")
  res.json({status : "OK"});
  else {
    res.json({status: "NOT OK"});
  }
});






module.exports = router;
