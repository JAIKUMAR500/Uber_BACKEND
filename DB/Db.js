const mongoose = require("mongoose");

function DataBaseConnect(){
   mongoose.connect(process.env.Db_CONNECT,{

    

   }

)
.then(() => console.log("Db is connected"))


.catch(err =>console.log(err));
}

module.exports = DataBaseConnect