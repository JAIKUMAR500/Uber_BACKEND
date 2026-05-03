const UserModel = require('../Modules/User.module');
const UserModule = require('../Modules/User.module');


module.exports.CreateUser = async ({firstname, lastname, email, password}) => {
   if (!firstname  || !email || !password) {
        throw new Error("All fields are required");
    }
    const User = UserModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
        
    })
    return User;
},

module.exports.Login = async ({email,password})=>{
    if(!email || !password){
        throw new Error("All fields are required");
     }
     const user = await UserModel.findOne({email}).select("+password");
        if (!user){
            throw new Error("Invalid email or password");
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            throw new Error("Invalid email or password");
        }
        return user;
}




