const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const x=new mongoose.Schema({
    Email:{
        type:String,
        required:true
    },
    User_name:{
        type:String,
        required:true
    },
    Contact:{
        type:String,
        required:true
    },
    Profile_pic:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
});
x.methods.getToken=function(){
    try{
        return (
            jwt.sign({
                user_id:this._id.toString(),
                user_email:this.Email
            },process.env.secret_key)
        )
    }
    catch(error){
        console.log(error);
    }
}
const regSchema=mongoose.model("register",x);
module.exports=regSchema;