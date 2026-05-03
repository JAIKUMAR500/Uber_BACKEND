const { validationResult } = require('express-validator')
const UserModul = require('../Modules/User.module')
const UserService = require('../service/User.service')

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

        const hashPassword = await UserModul.hashPassword(password);

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

module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { email, password } = req.body;
        
        const user = await UserService.Login({ email, password });
        if (!user) {
            return res.status(400).json({message:"User not exsited"})
        }
        const token = user.generateAuthToken();
        
        res.status(200).json({ token, user });
    } catch (err) {
        next(err);
    }
};