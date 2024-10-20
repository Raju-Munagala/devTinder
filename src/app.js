const express = require("express");

const app = express();

const {userAuth,adminAuth} = require("./middleware/auth.js");

app.use("/admin", adminAuth);

app.use("/admin/alldata", (req,res,next)=>{
    res.send("it's admins all data");
});

app.get("/users", userAuth,
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

app.listen(3333, ()=>{
    console.log("server is successfully listening...");
});