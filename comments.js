const mongoose=require("mongoose");
const x=new mongoose.Schema({
    Id:{
        type:String,
        required:true,
    },
    CommentEmail:{
        type:String,
        required:true
    },
    Comment:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("comment",x);