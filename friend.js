const mongoose=require("mongoose");
const x=new mongoose.Schema({
    SenderEmail:{
        type:String,
        required:true
    },
    RecieverEmail:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model("Friendlist",x);