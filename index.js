/**
 * Created by lcom63 on 17/2/18.
 */
const express=require('express'),
    bodyparser=require('body-parser'),
    mongoose=require('mongoose');

var app=express();
app.use(bodyparser.json());


// Student
mongoose.connect("mongodb://admin:admin@cluster0-shard-00-00-dyp71.mongodb.net:27017,cluster0-shard-00-01-dyp71.mongodb.net:27017,cluster0-shard-00-02-dyp71.mongodb.net:27017/exam?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",
    (err, ress) => {
      if(!err)
        console.log("DB Connected.");
      else
        console.log("Not Connect DB.");
  });

var schemaStud=mongoose.Schema({
  id : Number,
  name : String,
  Address : String
});
var tblStud=mongoose.model("Stud", schemaStud);

// tesing
app.get('/', (req, res) => {
  res.send('Hello');
});

// Select Stud
app.get('/api/student', (req, res) => {
  if (req.query.id != undefined) {
    tblStud.find({"id": req.query.id}, (err, ress) => {
      res.send(ress);
    });
  }
  else if (req.query.name != undefined) {
    tblStud.find({"name": req.query.name}, (err, ress) => {
      res.send(ress);
    });
  }
  else if (req.query.Address != undefined) {
    tblStud.find({"Address": req.query.Address}, (err, ress) => {
      res.send(ress);
    });
  }
  else
  {
    tblStud.find({}, (err, ress) => {
      res.send(ress);
    });
  }
});

// Insert Stud
app.post('/api/student', (req, res) => {
  tblStud.findOne({"id": req.body.id}, (err, ress) => {
    if(ress==null)
    {
      var tbl=tblStud();
      tbl.id=req.body.id;
      tbl.name=req.body.name;
      tbl.Address=req.body.Address;
      tbl.save();
      res.send("Successfully Inserted.");
    }
    else
      res.send("Already Exists Record.");
  });
});

// Update Stud
app.put('/api/student', (req, res) => {
  tblStud.updateOne({"id":req.body.id}, {$set:{"name" : req.body.name, "Address" : req.body.Address}}, (err, ress) => {
    if(ress.n==1)
      res.send("Successfully Updated.");
    else
      res.send("Not updated record.");
  });
});

// Delete Stud
app.del('/api/student', (req, res) => {
  tblStud.deleteOne({"id" : req.body.id}, (err, ress) => {
    if(ress.n==1)
    {
      tblMark.deleteMany({"sid" : req.body.id}, (err1, ress1) => {
        res.send("Successfully Deleted.");
      });
    }
    else
      res.send("Not deleted record.");
  });
});




// Marks
var schemaMark=mongoose.Schema({
  id : Number,
  sid : Number,
  Subject : String,
  Mark : String
});
var tblMark=mongoose.model("Marks", schemaMark);

// Insert Mark
app.post('/api/marks', (req, res) => {

  tblMark.find({"id": req.body.id}, (err, ress1) => {
    if(ress1.length==0) {
      tblStud.find({ "id": req.body.sid }, (err, ress) => {
        if (ress.length == 1) {
          var tbl = tblMark();
          tbl.id = req.body.id;
          tbl.sid = req.body.sid;
          tbl.Subject = req.body.Subject;
          tbl.Mark = req.body.Mark;
          tbl.save();
          res.send("Successfully Inserted.");
        }
        else
          res.send("Student not Exists.")
      });
    }
    else
      res.send("Already Exists Record.");
  });
});

// Select Mark
app.get('/api/marks', (req, res) => {
  if (req.query.id != undefined) {
    tblMark.find({"id": req.query.id}, (err, ress) => {
      res.send(ress);
    });
  }
  else if (req.query.sid != undefined) {
    tblMark.find({"sid": req.query.sid}, (err, ress) => {
      res.send(ress);
    });
  }
  else if (req.query.Subject != undefined) {
    tblMark.find({"Subject": req.query.Subject}, (err, ress) => {
      res.send(ress);
    });
  }
  else if (req.query.Mark != undefined) {
    tblMark.find({"Mark": req.query.Mark}, (err, ress) => {
      res.send(ress);
    });
  }
  else
  {
    tblMark.find({}, (err, ress) => {
      res.send(ress);
    });
  }
});

// Update Mark
app.put('/api/marks', (req, res) => {
  tblMark.updateOne({"id":req.body.id}, {$set:{"Subject" : req.body.Subject, "Mark" : req.body.Mark}}, (err, ress) => {
    if(ress.n==1)
      res.send("Successfully Updated.");
    else
      res.send("Not updated record.");
  });
});

// Delete Mark
app.del('/api/marks', (req, res) => {
  tblMark.deleteOne({"id" : req.body.id}, (err, ress) => {
    if(ress.n==1)
      res.send("Successfully Deleted.");
    else
      res.send("Not deleted record.");
  });
});

let port=process.env.PORT || 3000
app.listen(port, console.log("listening port " + port + "."));