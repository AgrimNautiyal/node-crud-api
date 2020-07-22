var router = require('express').Router();
var request = require('request');
const {MongoClient} = require('mongodb');

require('dotenv').config();
var uname = process.env.uname;
var password = process.env.password;
var db_name = process.env.db_name;

const uri = `mongodb+srv://${uname}:${password}@cluster0.ntbt5.mongodb.net/${db_name}?retryWrites=true&w=majority`;

router.get('/', async function(req, res){
  console.log("Home route activated");
  const client = new MongoClient(uri ,{ useNewUrlParser: true, useUnifiedTopology: true });
  try {
       // Connect to the MongoDB cluster
       await client.connect();
       console.log('connected Successfully');
       // Make the appropriate DB calls
       await  listDatabases(client);

   } catch (e) {
       console.error(e);
   } finally {
       await client.close();
   }
   res.json({message : 'Successfully connected to mongo'});
});

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

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
