const mongoose=require("mongoose");
const connectTodb=async()=>{
    try{
        const x=await mongoose.connect(process.env.url);
        console.log("server is connected");
    }
    catch(error){
        console.log("failed connection to database");
    }
}
module.exports=connectTodb;