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
})
const FriendreqSchema=mongoose.model("FriendReq",x);
module.exports=FriendreqSchema;