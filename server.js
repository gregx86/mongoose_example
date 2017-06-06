var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./models/user');

var app = express();

mongoose.connect('mongodb://localhost/mongooseDb');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/users', function (req, res) {
   User.find({}, function (err, data) {
       console.log("Err", err, !!err);
       if (err) {return err}
       console.log(data);
       res.json(data);
   });
    // return User.find();
});

app.post("/addUser", function(req, res) {
    var body = req.body;

    console.log(req.body);

    var user = new User({id: body.id});

    user.projects.push(body.project);


    user.save(function (err, data) {
        if (err) { return err}

        console.log(data);
        return data;

    });

});

app.post('/updateUser', function(req, res) {

    var user = req.body;
    // console.log("User", user);
    User.find({id: user.id}, function (err, data) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", data);
    });

    User.findOneAndUpdate(
        {id: user.id},
        { $push : {projects: user.project}},
        {safe: true, upsert: true},
        function (err, model) {
            console.log(err);
        }
    );
});

app.listen(3000, function() {
    console.log("Listen on port 3000");
});