var router = require('express').Router();
var request = require('request');
router.get('/', function(req, res){
  console.log("Home route activated");
    res.json({message : 'response'});
});
module.exports = router;
