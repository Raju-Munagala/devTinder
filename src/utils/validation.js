
const userSignUpValidation = (req)=>{
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("enter valid user name");
    }
}

module.exports = userSignUpValidation;