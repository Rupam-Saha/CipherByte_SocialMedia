const regVali=require("../validator/register-validate");
const check=()=>async(req,res,next)=>{
    try{
        const data=req.body;
        const pic=req.file;
        const x=await regVali.parseAsync({Email:data.Email,User_name:data.User_name,Contact:data.Contact,Profile_pic:pic,Password:data.Password});
        next();
    }
    catch(error){
        const y=error.issues[0].message;
        res.status(400).json({msg:y});
    }
}
module.exports=check;