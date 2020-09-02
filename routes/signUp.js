var express = require('express');
var assert = require('assert');

var router = express.Router();

router.post('/', function(req, res, next) {

    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://admin:D1cQVd3aaegpWrLx@fikrimiz.ak9yx.gcp.mongodb.net/fikrimiz?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    
    client.connect(err => {
     
      const collection = client.db("fikrimiz").collection("users");
  
      const registerInfo = { 
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            type: req.body.type,
            topics: req.body.topics
        };
  
      collection.insertOne(registerInfo, function (err, result){
        if (err) {
          console.log(err);
        } else {
          console.log("ADDED ", registerInfo);
          res.send("SUCCESS");
        }
        client.close();
      });
    });
});


module.exports = router;
