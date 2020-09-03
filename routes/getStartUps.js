var express = require('express');
var assert = require('assert');

var router = express.Router();

router.get('/', function(req, res, next) {

    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://admin:D1cQVd3aaegpWrLx@fikrimiz.ak9yx.gcp.mongodb.net/fikrimiz?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    
    client.connect(err => {
     
        const collection = client.db("fikrimiz").collection("fikirler");

        collection.find({}).limit(20).toArray(function (err, result) {
            if (err) {
              res.send(err);
            } else if (result.length) {
              res.json(result)
            } else {
              res.json({"error" : 'No documents found'});
            }
            client.close();
          });

    });
});


module.exports = router;
