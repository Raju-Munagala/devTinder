const userAuth = (req,res,next)=>{
    const token = "xyz";
    const userAuth = token==="xyze";
    if(!userAuth){
        res.status(401).send("user not authorized");
    }
    else{
        next();
    }
};

const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const userAuth = token==="xyze";
    if(!userAuth){
        res.status(401).send("admin not authorized");
    }
    else{
        next();
    }
};

module.exports = {userAuth,adminAuth};