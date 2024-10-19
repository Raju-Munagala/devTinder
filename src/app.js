const express = require("express");

const app = express();


app.get("/users/:userid/:name/:password", (req,res)=>{
    console.log(req.params);
    res.send("get request");
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