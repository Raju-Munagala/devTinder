
const userSignUpValidation = (req)=>{
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("enter valid user name");
    }
};

const validateUserEditData = (req)=>{
    const updatableData = [
        "firstName",
        "lastName",
        "age",
        "gender",
        "skills",
        "about"    
    ];
    const isValidData = Object.keys(req.body).every(key=>updatableData.includes(key));
    return isValidData;
};

module.exports = {userSignUpValidation,validateUserEditData};