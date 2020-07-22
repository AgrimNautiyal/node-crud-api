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
  res.json({message : "HOME"});
});




//function to create a record
async function createListing(client, newListing){

    //first find if username exists in our collection or not. If not then CREATE shouldn't be allowed
    var uname = newListing.username
    const check1 = await client.db(db_name).collection(users_coll).findOne({username : uname});
    if (check1){
      return(-1);
    }
    else{
    const result = await client.db(db_name).collection(users_coll).insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
    return(1);
  }
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
    var r = await createListing(client, listing);

    if (r==-1){
      res.json({status : "duplicate record - failed"});
    }
    else{
    res.json({status : "INSERTED"});
  }
}
  catch (e)
  {
    console.error(e);
    res.json({status : "INSERTION FAILED"});
  }




//to READ
async function find(client, username, password){
    const result = await client.db(db_name).collection(users_coll).findOne({
      username : username,
      password : password
    });
    if (result){
    return 1;
  }
    else {
      return 0;
    }
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

//route to READ from mongodb and verify login
router.get('/login/:username/:password', async function(req, res){
  console.log("Login Route activated");
  var username = req.params.username
  var password = req.params.password
  try{
  await client.connect();
  console.log('Connected successfully');
  var status  = await find(client, username, password)

  if (status == 1){
    res.json({login : "SUCCESSFULL"});

  }
  else{
    res.json({login: "UNSUCCESSFULL"});
  }
}
catch (e){
  console.error(e);
  res.json({login : "error"});
}

});






module.exports = router;
