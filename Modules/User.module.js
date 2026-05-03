const mongoose =require("mongoose");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
      fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname:{
            type: String,
           
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength: [3,'minimul 5 chacter use in email']
    
    },
    password:{
       type:String,
       required: true,
        select: false,
    },
    socketId:{
    
      type:String
    }


});

UserSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.Jwt_Secret,{expiresIn:'1h'});
    return token;
}

UserSchema.methods.comparePassword = async function(password){
    return await brcypt.compare(password,this.password);
}

UserSchema.statics.hashPassword = async function(password){
  return await brcypt.hash(password,10);
}

const UserModel = mongoose.model("User",UserSchema);

module.exports = UserModel;