var express = require('express');
var assert = require('assert');

var router = express.Router();

router.post('/', function(req, res, next) {

    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://admin:D1cQVd3aaegpWrLx@fikrimiz.ak9yx.gcp.mongodb.net/fikrimiz?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    
    client.connect(err => {
     
      const collection = client.db("fikrimiz").collection("fikirler");
  
      const fikirInfo = { 
            projeAdi: req.body.projeAdi,
            projeMetni: req.body.projeMetni,
            projeKategori: req.body.projeKategori,
            projeKeywords: req.body.projeKeywords
        };
  
      collection.insertOne(fikirInfo, function (err, result){
        if (err) {
          console.log(err);
        } else {
          console.log("ADDED ", fikirInfo);
          res.send("SUCCESS");
        }
        client.close();
      });
    });
});

module.exports = router;
