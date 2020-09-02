var express = require('express');
var assert = require('assert');

var router = express.Router();

router.post('/', function(req, res, next) {

    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://admin:D1cQVd3aaegpWrLx@fikrimiz.ak9yx.gcp.mongodb.net/fikrimiz?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    
    client.connect(err => {
     
        const collection = client.db("fikrimiz").collection("users");

        const loginInfo = { 
            email: req.body.email,
            password: req.body.password,
            type: req.body.type
        };
        
        const userQuery = {
            email: req.body.email
        }
        
        console.log(loginInfo)

        collection.findOne(userQuery, function (err, result){
            if (err) {
                console.log(err);
             } else if(result != null){
                console.log("result: ", result);
                if(result.password != loginInfo.password) {
                    console.log("PASSWORD_NOT_FOUND");
                    res.send("PASSWORD_ERROR");
                }
                else {
                    console.log("SUCCESS");
                    res.send("SUCCESS");
                }
            }
            else {
                console.log("USER_NOT_FOUND");
                res.send("EMAIL_ERROR");
            }
            client.close();
        });
    });
});


module.exports = router;
