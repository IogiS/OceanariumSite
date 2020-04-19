var express = require('express');
var router = express.Router();

const bodyparser = require("body-parser");
const urlencoded = bodyparser.urlencoded({extended: false});

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://logisxxx:logisxxx@cluster0-dhepn.gcp.mongodb.net/test?retryWrites=true&w=majority";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index' , {title: "Hi"});
});
router.get('/about', function(req, res, next) {
  res.render('about' , {title: "Hi"});
});
router.get('/contacts', function(req, res, next) {
  res.render('contacts' , {title: "Hi"});
});
router.get('/about', function(req, res, next) {
  res.render('about' , {title: "Hi"});
});

router.get('/admin', function(req, res, next) {
  mongoClient.connect(function(err, client){

    const db = client.db("Oceanarium");
    const collection = db.collection("Personal");

    if(err) return console.log(err);

    collection.find().toArray(function(err, results){

      res.render("CreateUser", {title: "admin" , writes: results});
      //console.log(results);

    });
  });



});

router.post('/admin', function(req, res, next) {
  //console.log(req.body)
  mongoClient.connect(function(err, client){

    const db = client.db("Oceanarium");
    const collection = db.collection("Personal");

    if(err) return console.log(err);
    var count = Object.keys(req.body.id).length;

     for(var i=0;i<count; i++){

       if(req.body.addnew){
         delete req.body.addnew;
         collection.insertOne(req.body);
         //console.log(req.body);
       }
       if('edit' in req.body){

         var ObjectID = require('mongodb').ObjectID;

         collection.updateOne(
             {_id : ObjectID(req.body.id[i])},
             {$set: {Username : req.body.Username[i] , Name : req.body.Name[i] ,Surname : req.body.Surname[i] ,
                            Adress : req.body.Adress[i] ,
                            City : req.body.City[i] ,
                            Country : req.body.Country[i] ,
                            Description : req.body.Description[i] ,
                            Post : req.body.Post[i] }},
             {upsert: true}
         );

        console.log(req.body);
         //collection.insertOne(req.body);
       }
    }

      //console.log(req.body);


  res.redirect("/admin")
});
});

module.exports = router;
