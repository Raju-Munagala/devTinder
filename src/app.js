const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routers/auth.js");
const profileRouter = require("./routers/profile.js");
const userRouter = require("./routers/user.js");
const requestRouter = require("./routers/request.js");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",userRouter);
app.use("/",requestRouter);

connectDB()
    .then(()=>{
        console.log("connection successfully done");
        app.listen(3333, ()=>{
            console.log("server is successfully listening...");
        });
    })
    .catch((error)=>{
        console.log(error.message)
    });
