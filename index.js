/**
 * Created by lcom63 on 17/2/18.
 */
const express=require('express'),
    bodyparser=require('body-parser'),
    mongoose=require('mongoose'),
    db=require('./config/database');

var app=express();
app.use(bodyparser.json());
require('./router')(app);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect(db.url,
    (err, ress) => {
        if(!err)
            console.log("DB Connected.");
        else
            console.log("Not Connect DB.");
    });

let port=process.env.PORT || 5000
app.listen(port, console.log("listening port " + port + "."));