const mongoose=require("mongoose");
const x=new mongoose.Schema({
    Id:{
        type:String,
        required:true
    },
    PostEmail:{
        type:String,
        required:true
    },
    LikedEmail:{
        type:String,
        required:true        
    }
})
const likeSchema=mongoose.model("Likes",x);
module.exports=likeSchema;