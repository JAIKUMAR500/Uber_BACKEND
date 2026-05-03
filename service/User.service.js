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
        password: await UserModule.hashPassword(password)
        
    })
    return User;
}


