module.exports=(app)=>{
    //Student
    const Stud = require('../Student');
    app.get('/', Stud.home);
    app.get('/api/student', Stud.select);
    app.post('/api/student', Stud.insert);
    app.put('/api/student', Stud.update);
    app.del('/api/student', Stud.delete);

    // Marks
    const Marks = require('../Marks');
    app.post('/api/marks', Marks.insert);
    app.get('/api/marks', Marks.select);
    app.put('/api/marks', Marks.update);
    app.del('/api/marks', Marks.delete);
};