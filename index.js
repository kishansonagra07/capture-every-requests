const express = require("express");
const fs = require('fs');
const port = 3000;

const app = express();

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    var data = `\n${req.url} Route Accessed at ${req.requestTime}`;
    fs.appendFile('log.txt',data, 'utf8',(err)=>{});
    next();
});


app.get('/emp', (req,res)=>{
    let emp = [{
        "id":1,
        "name":"Mr.Prashant Sumel",
        "Age":26,
        "dob":"12/08/1990"
    },{
        "id":2,
        "name":"Mrs.Janki Dunda",
        "Age":24,
        "dob":"05/01/1995"
    }];
    res.status(200).json({
        status : 'success',
        requestedAt : req.requestTime,
        data: {
            emp
        }
    });
});
app.get('/admin',(req,res)=>{
    const admin = [{
        "id":1,
        "name":"Mr.Jayant Panchal",
        "Age":32,
        "role":"Product Manager"
    },{
        "id":2,
        "name":"Mr.Lakshay Pandey",
        "Age":35,
        "role":"HR"
    }];
    res.status(200).json({
        status : 'success',
        requestedAt : req.requestTime,
        data: {
            admin
        }
    });
});

app.use(function(req, res){
    res.status(404).json({message:"Ooopss !! wrong URL.."});
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});