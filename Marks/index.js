const mongoose=require('mongoose');

// Marks
var schemaMark=mongoose.Schema({
    id : Number,
    sid : Number,
    Subject : String,
    Mark : String
});
var tblMark=mongoose.model("Marks", schemaMark);

// Insert Mark
exports.insert=(req, res) => {

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
};

// Select Mark
exports.select=(req, res) => {
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
};

// Update Mark
exports.update=(req, res) => {
    tblMark.updateOne({"id":req.body.id}, {$set:{"Subject" : req.body.Subject, "Mark" : req.body.Mark}}, (err, ress) => {
        if(ress.n==1)
            res.send("Successfully Updated.");
        else
            res.send("Not updated record.");
    });
};

// Delete Mark
exports.delete=(req, res) => {
    tblMark.deleteOne({"id" : req.body.id}, (err, ress) => {
        if(ress.n==1)
            res.send("Successfully Deleted.");
        else
            res.send("Not deleted record.");
    });
};