const {z}=require("zod");
const regVali=z.object({
    Email:z
    .string({required_error:"Email feild can't be empty"})
    .trim()
    .min(4,{message:"Email feild can't be less than 4 letters"})
    .max(25,{message:"Email feild can't ne more than 25 letters"}),
    User_name:z
    .string({required_error:"User name feild can't be empty"})
    .trim()
    .min(6,{message:"User name feild can't be less than 6 letters"})
    .max(25,{message:"User name feild can't ne more than 25 letters"}),
    Contact:z
    .string({required_error:"Contact feild can't be empty"})
    .trim()
    .min(10,{message:"Contact feild can't be less than 10 letters"})
    .max(10,{message:"Contact feild can't ne more than 10 letters"}),
    Password:z
    .string({required_error:"Password feild can't be empty"})
    .trim()
    .min(8,{message:"Password feild can't be less than 8 letters"})
    .max(25,{message:"Password feild can't ne more than 25 letters"})  
})
module.exports=regVali;