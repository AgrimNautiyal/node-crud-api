var router = require('express').Router();
var request = require('request');
const {MongoClient} = require('mongodb');

require('dotenv').config();
var uname = process.env.uname;
var password = process.env.password;
var db_name = process.env.db_name;
var users_coll = process.env.users_coll;

const uri = `mongodb+srv://${uname}:${password}@cluster0.ntbt5.mongodb.net/${db_name}?retryWrites=true&w=majority`;
//connect to mongodb client
const client = new MongoClient(uri ,{ useNewUrlParser: true, useUnifiedTopology: true });


router.get('/', function(req, res){
  console.log("Home route activated");
  res.json({message : "HI"});
});




//function to create a record
async function createListing(client, newListing){

    const result = await client.db(db_name).collection(users_coll).insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}
//route to sign up and CREATE a record in the collection
router.get('/signup/:username/:password', async function(req, res){

    console.log("Signup route is active");
    var username = req.params.username
    var password = req.params.password

    var listing = {
        username : username,
        password : password
    }


    try{
      await client.connect();
      console.log("client connected successfully");
    await createListing(client, listing);

    res.json({status : "INSERTED"});
  }
  catch (e)
  {
    console.error(e);
    res.json({status : "INSERTION FAILED"});
  }
  finally
  {
    await client.close();
    res.json({status : "INSERTION TRIAL HAS ENDED"});
  }
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
