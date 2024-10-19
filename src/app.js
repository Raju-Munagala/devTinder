const express = require("express");

const app = express();


app.use("/users", (req,res)=>{
    res.send("it's users page");
});

app.use("/payments", (req,res)=>{
    res.send("it's payment section");
});

app.use("/admin", (req,res)=>{
    res.send("it's admins page");
});

app.use("/", (req,res)=>{
    res.send("it's dashboard page");
});


app.listen(3333, ()=>{
    console.log("server is successfully listening...");
});