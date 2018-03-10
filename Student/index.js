const mongoose=require('mongoose');

// Student
var schemaStud=mongoose.Schema({
    id : Number,
    name : String,
    Address : String
});
var tblStud=mongoose.model("Stud", schemaStud);

// tesing
exports.home=(req, res) => {
    res.send('Hello, Varsha');
};

// Select Stud
exports.select = (req, res) => {
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
};

// Insert Stud
exports.insert=(req, res) => {
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
};

// Update Stud
exports.update=(req, res) => {
    tblStud.updateOne({"id":req.body.id}, {$set:{"name" : req.body.name, "Address" : req.body.Address}}, (err, ress) => {
        if(ress.n==1)
            res.send("Successfully Updated.");
        else
            res.send("Not updated record.");
    });
};

// Delete Stud
exports.delete=(req, res) => {
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
};
