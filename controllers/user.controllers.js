const { validationResult } = require('express-validator')
const UserModule = require('../Modules/User.module')
const UserService = require('../service/User.service')

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

        const hashPassword = await UserModule.hashPassword(password);

        const user = await UserService.CreateUser({
        firstname: fullname.firstname,
        lastname : fullname.lastname,

            email,
            password: hashPassword
        });

        const token = user.generateAuthToken();

        res.status(201).json({ user, token });

    } catch (err) {
        next(err);
    }
};

//login user

module.exports.loginUser = async (req,res,next)=>{

      try {
        const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
     
    const user = await UserModule.findOne({email}.select("+password"));

    if (!user){
        return res.status(400).json({message:"Invalid email or password"});
    }
    const isMatch = await UserModule.comparePassword(password,user.password);

}
catch (err) {    next(err); 
}



}
