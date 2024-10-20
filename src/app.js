const express = require("express");

const app = express();


app.get("/users", (req,res,next)=>{
    console.log("1st response running");
    next();
    //res.send("get request");
    },
    (req,res,next)=>{
        console.log("2nd route running");
        //res.send("2nd response");
        next();
    },
    (req,res,next)=>{
        console.log("3rd response running");
        res.send("3rd response");
    });

app.post("/users", (req,res)=>{
    res.send("post request");
});

app.delete("/users", (req,res)=>{
    res.send("delete method");
});

app.use("/payments", (req,res)=>{
    res.send("it's payment section");
});

app.use("/admin", (req,res)=>{
    res.send("it's admins page");
});



app.listen(3333, ()=>{
    console.log("server is successfully listening...");
});