const mongoose=require("mongoose");
const x=new mongoose.Schema({
    Email:{
        type:String,
        required:true
    },
    Description:{
        type:String
    },
    Photo:{
        type:String
    },
    Likes:{
        type:String,
        required:true
    },
    Comments:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    Time:{
        type:String,
        required:true
    }
});
const postSchema=mongoose.model("post",x);
module.exports=postSchema;