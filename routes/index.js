var express = require('express');
var router = express.Router();

const bodyparser = require("body-parser");
const urlencoded = bodyparser.urlencoded({extended: false});

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://logisxxx:logisxxx@cluster0-dhepn.gcp.mongodb.net/test?retryWrites=true&w=majority";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index' , {title: "Oceanarium"});
});

router.get('/about', function(req, res, next) {
  res.render('about' , {title: "About"});
});

router.get('/contacts', function(req, res, next) {
  res.render('contacts' , {title: "Contacts"});
});

router.post('/contacts', function(req, res, next) {
    mongoClient.connect(function(err, client) {
        var ObjectID = require('mongodb').ObjectID;
        const db = client.db("Oceanarium");
        const collection = db.collection("contact");

        if (err) return console.log(err);
        console.log(req.body);
        delete req.body['form-type'];
        delete req.body['counter'];
            collection.insertOne(req.body);
            console.log(req.body);

    });
    res.redirect("/contacts");
});

router.get('/about', function(req, res, next) {
  res.render('about' , {title: "About"});
});

router.get('/admin/personalsettings', function(req, res, next) {
  mongoClient.connect(function(err, client){

    const db = client.db("Oceanarium");
    const collection = db.collection("Personal");
    const active = ['active','','',''];
    if(err) return console.log(err);

    collection.find().toArray(function(err, results){

      res.render("CreateUser", {title: "admin" , writes: results , active: active});
      //console.log(results);

    });
  });



});

router.post('/admin/personalsettings', function(req, res, next) {
  //console.log(req.body)
  mongoClient.connect(function(err, client){
      var ObjectID = require('mongodb').ObjectID;
    const db = client.db("Oceanarium");
    const collection = db.collection("Personal");

    if(err) return console.log(err);
      console.log(req.body);


       if('addnew' in req.body){
           console.log(req.body);
         delete req.body['addnew'];
         delete req.body['_id'];

         collection.insertOne(req.body);
         console.log(req.body);
       }



       if('edit' in req.body){
           var count = Object.keys(req.body.id).length;
           for(var i=0;i<count; i++){

               console.log(req.body);
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
           }
       }
               if('del' in req.body) {
                   console.log(req.body.del);
                   collection.removeOne(
                       {_id : ObjectID(req.body.del)})
               }


  res.redirect("/admin/personalsettings")
});



});
router.post('/', function(req, res, next) {
    console.log(req.body);
    mongoClient.connect(function(err, client) {
        var ObjectID = require('mongodb').ObjectID;
        const db = client.db("Oceanarium");
        const collection = db.collection("BuyTickets");

        if (err) return console.log(err);
        console.log(req.body);
        delete req.body['form-type'];
        delete req.body['counter'];
        collection.insertOne(req.body);
        console.log(req.body);

    });
    res.redirect("/");
});


router.get('/admin/fishsettings', function(req, res, next) {
    mongoClient.connect(function(err, client){

        const db = client.db("Oceanarium");
        const collection = db.collection("FishSettings");
        const active = ['','active','',''];
        if(err) return console.log(err);

        collection.find().toArray(function(err, results){

            res.render("CreateUser", {title: "Fish Settings" , writes: results , active: active});
            //console.log(results);

        });
    });



});

router.post('/admin/fishsettings', function(req, res, next) {
    //console.log(req.body)
    mongoClient.connect(function(err, client){
        var ObjectID = require('mongodb').ObjectID;
        const db = client.db("Oceanarium");
        const collection = db.collection("FishSettings");

        if(err) return console.log(err);
        console.log(req.body);


        if('addnew' in req.body){
            console.log(req.body);
            delete req.body['addnew'];

            collection.insertOne(req.body);
            console.log(req.body);
        }



        if('edit' in req.body){
            var count = Object.keys(req.body.id).length;
            for(var i=0;i<count; i++){
                delete req.body['edit'];
                console.log(req.body);
                collection.updateOne(
                    {_id : ObjectID(req.body.id[i])},
                    {$set: {FIshName : req.body.FIshName[i] ,
                            Count : req.body.Count[i] ,
                            Surname : req.body.Surname[i] ,
                            CategoryID : req.body.CategoryID[i] ,
                             }},
                    {upsert: true}

                );
            }
        }
        if('del' in req.body) {
            console.log(req.body.del);
            collection.removeOne(
                {_id : ObjectID(req.body.del)})
        }


        res.redirect("/admin/fishsettings")
    });
});

router.get('/admin/sectionsettings', function(req, res, next) {
    mongoClient.connect(function(err, client){

        const db = client.db("Oceanarium");
        const collection = db.collection("SectionOfOceanarium");
        const active = ['','','active',''];
        if(err) return console.log(err);

        collection.find().toArray(function(err, results){

            res.render("CreateUser", {title: "Section of Oceanarium" , writes: results , active: active});
            //console.log(results);

        });
    });



});

router.post('/admin/sectionsettings', function(req, res, next) {
    //console.log(req.body)
    mongoClient.connect(function(err, client){
        var ObjectID = require('mongodb').ObjectID;
        const db = client.db("Oceanarium");
        const collection = db.collection("SectionOfOceanarium");

        if(err) return console.log(err);
        console.log(req.body);


        if('addnew' in req.body){
            console.log(req.body);
            delete req.body['addnew'];

            collection.insertOne(req.body);
            console.log(req.body);
        }



        if('edit' in req.body){
            var count = Object.keys(req.body.id).length;
            for(var i=0;i<count; i++){
                delete req.body['edit'];
                console.log(req.body);
                collection.updateOne(
                    {_id : ObjectID(req.body.id[i])},
                    {$set: {SectionName : req.body.SectionName[i] ,
                            ManagerSectionID : req.body.Count[i] ,

                        }},
                    {upsert: true}

                );
            }
        }
        if('del' in req.body) {
            console.log(req.body.del);
            collection.removeOne(
                {_id : ObjectID(req.body.del)})
        }


        res.redirect("/admin/sectionsettings")
    });
});

router.get('/admin/fishcategory', function(req, res, next) {
    mongoClient.connect(function(err, client){

        const db = client.db("Oceanarium");
        const collection = db.collection("CategoryFish");
        const active = ['','','','active'];
        if(err) return console.log(err);

        collection.find().toArray(function(err, results){

            res.render("CreateUser", {title: "Fish Category" , writes: results , active: active});
            //console.log(results);

        });
    });



});

router.post('/admin/fishcategory', function(req, res, next) {
    //console.log(req.body)
    mongoClient.connect(function(err, client){
        var ObjectID = require('mongodb').ObjectID;
        const db = client.db("Oceanarium");
        const collection = db.collection("CategoryFish");

        if(err) return console.log(err);
        console.log(req.body);


        if('addnew' in req.body){
            console.log(req.body);
            delete req.body['addnew'];

            collection.insertOne(req.body);
            console.log(req.body);
        }



        if('edit' in req.body){
            var count = Object.keys(req.body.id).length;
            for(var i=0;i<count; i++){
                delete req.body['edit'];
                console.log(req.body);
                collection.updateOne(
                    {_id : ObjectID(req.body.id[i])},
                    {$set: {CategoryName : req.body.CategoryName[i]}},
                    {upsert: true}

                );
            }
        }
        if('del' in req.body) {
            console.log(req.body.del);
            collection.removeOne(
                {_id : ObjectID(req.body.del)})
        }


        res.redirect("/admin/fishcategory")
    });
});

router.get('/admin/contactsettings', function(req, res, next) {
    mongoClient.connect(function(err, client){

        const db = client.db("Oceanarium");
        const collection = db.collection("contact");
        const active = ['','','','','active'];
        if(err) return console.log(err);

        collection.find().toArray(function(err, results){

            res.render("CreateUser", {title: "Contacts Settings" , writes: results , active: active});
            //console.log(results);

        });
    });



});

router.post('/admin/contactsettings', function(req, res, next) {
    //console.log(req.body)
    mongoClient.connect(function(err, client){
        var ObjectID = require('mongodb').ObjectID;
        const db = client.db("Oceanarium");
        const collection = db.collection("contact");

        if(err) return console.log(err);
        console.log(req.body);


        if('addnew' in req.body){
            console.log(req.body);
            delete req.body['addnew'];

            collection.insertOne(req.body);
            console.log(req.body);
        }



        if('edit' in req.body){
            var count = Object.keys(req.body.id).length;
            for(var i=0;i<count; i++){
                delete req.body['edit'];
                console.log(req.body);
                collection.updateOne(
                    {_id : ObjectID(req.body.id[i])},
                    {$set: {name : req.body.name[i] ,
                            email : req.body.email[i],
                            phone : req.body.phone[i],
                            message : req.body.message[i]
                            }},
                    {upsert: true}

                );
            }
        }
        if('del' in req.body) {
            console.log(req.body.del);
            collection.removeOne(
                {_id : ObjectID(req.body.del)})
        }


        res.redirect("/admin/contactsettings")
    });
});

module.exports = router;
