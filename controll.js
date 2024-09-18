const regSchema=require("../models/register-model");
const postSchema=require("../models/posts");
const likeSchema=require("../models/likes");
const FriendreqSchema=require("../models/friend_req");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const register=async(req,res)=>{
    try{
        const data=req.body;
        const pic=req.file;
        const ch=await regSchema.findOne({Email:data.Email});
        if(!ch){
            const newpwd=await bcrypt.hash(data.Password,10);
            const x=await regSchema.create({Email:data.Email,User_name:data.User_name,Contact:data.Contact,Profile_pic:pic.path,Password:newpwd});
            res.status(200).json({msg:"Successfully Registered"});
        }
        else{
            res.status(400).json({msg:"This Email Id Is Already Registered"});
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const login=async (req,res)=>{
    try{
        const data=req.body;
        const check=await regSchema.findOne({Email:data.Email});
        if(check){
            const check1=await bcrypt.compare(data.Password,check.Password);
            if(check1){
                res.status(200).json({msg:"Login Successfully",token:check.getToken()});
            }
            else{
                res.status(400).json({msg:"Wrong Password"});
            }
        }
        else{
            res.status(400).json({msg:"Invalid Email Id"});
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const forgotpwd=async(req,res)=>{
    try{
        const data=req.body;
        const check=await regSchema.findOne({Email:data.Email});
        if(check){
            const newpwd=await bcrypt.hash(data.Password,10);
            const x=await regSchema.updateOne({Email:data.Email},{$set:{Password:newpwd}});
            res.status(200).json({msg:"Update Password Succesfully"});
        }
        else{
            res.status(400).json({msg:"Invalid Email Id"});
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const profile=async (req,res)=>{
    try{
        const token=req.header("Authorization");
        //console.log(token);
        const updToken=token.replace("Header ","").trim();
        const verify=jwt.verify(updToken,process.env.secret_key);
        //console.log(verify);
        const user=await regSchema.findOne({Email:verify.user_email},{Password:0});
        res.status(200).json(user);
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const uploadpost=async(req,res)=>{
    try{
        const data=req.body;
        const pic=req.file;
        const veri=jwt.verify(data.token,process.env.secret_key);
        const date=new Date();
        const x=date.getDate()+"."+date.getMonth()+"."+date.getFullYear();
        const y=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        const z=await postSchema.create({Email:veri.user_email,Description:data.Description,Photo:pic.path,Likes:"0",Comments:"0",Date:x,Time:y});
        res.status(200).json({msg:"Posted Successfully"});
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const getallposts=async(req,res)=>{
    try{
        const data=await postSchema.find({});
        //console.log(data.length)
        const result=[];
        var i;
        var j=0;
        for(i=data.length-1;i>=0;i--){
            const details=await regSchema.findOne({Email:data[i].Email});
            result[j]=({Profile_pic:details.Profile_pic,User_name:details.User_name,_id:data[i]._id,Email:data[i].Email,Description:data[i].Description,Photo:data[i].Photo,Likes:data[i].Likes,Comments:data[i].Comments});
            j=j+1;
        }
        res.status(200).json(result);
    }
    catch(error){
        res.status(400).json({msg:Error});
    }
}
const addLikes=async(req,res)=>{
    try{
        const id=req.body.id;
        const data=await postSchema.findOne({_id:id});
        if(parseInt(data.Likes)>=0){
            const x=parseInt(data.Likes)+1;
            const upd=await postSchema.updateOne({_id:id},{$set:{Likes:x.toString()}});
            res.status(200).json({msg:"Updated"});
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const removeLikes=async(req,res)=>{
    try{
        const id=req.body.id;
        const data=await postSchema.findOne({_id:id});
        if(data.Likes!='0'){
            const x=parseInt(data.Likes)-1;
            const upd=await postSchema.updateOne({_id:id},{$set:{Likes:x.toString()}});
            res.status(200).json({msg:"Updated"});
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const storelikedetails=async(req,res)=>{
    try{
        const data=req.body;
        const veri=jwt.verify(data.token,process.env.secret_key);
        const user=await regSchema.findOne({"Email":veri.user_email});
        const y=await likeSchema.findOne({Id:data.Id,PostEmail:data.Email,LikedEmail:user.Email});
        if(y){
            const x=await likeSchema.deleteOne({Id:data.Id,PostEmail:data.Email,LikedEmail:user.Email});
        }
        else{
            const x=await likeSchema.create({Id:data.Id,PostEmail:data.Email,LikedEmail:user.Email});
            res.status(200).json({msg:"success"});

        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const checklike=async (req,res)=>{
    try{
        const data=req.body;
        const veri=jwt.verify(data.token,process.env.secret_key);
        const user=await regSchema.findOne({"Email":veri.user_email});
        const check=await likeSchema.findOne({Id:data.Id,PostEmail:data.Email,LikedEmail:user.Email});
        if(check){
            res.status(200).json({msg:"true"});
        }
        else{
            res.status(200).json({msg:"false"});
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"})
    }
}
const getpost=async (req,res)=>{
    try{
        const result=[];
        var j=0;
        const token=req.header("Authorization");
        const veri=jwt.verify(token,process.env.secret_key);
        const x=await postSchema.find({Email:veri.user_email});
        if(!x){
            res.status(400).json({msg:"No Post Yet"});
        }
        else{
            for (var i=x.length-1;i>=0;i--){
                result[j]=x[i];
                j=j+1;
            }
           // console.log(result);
            res.status(200).json({msg:"success",data:result});
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const sendfriendreq=async (req,res)=>{
    try{
        const data=req.body;
        const veri=jwt.verify(data.token,process.env.secret_key);
        const check=await FriendreqSchema.findOne({SenderEmail:veri.user_email,RecieverEmail:data.Email});
        if(!check){
            const x=await FriendreqSchema.create({SenderEmail:veri.user_email,RecieverEmail:data.Email});
            res.status(200).json({msg:"Successfully Sent"});
        }
        else{
            res.status(400).json({msg:"Friend Request Already Sent"});
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const checkfriendreq=async (req,res)=>{
    try{
        const data=req.body;
        const veri=jwt.verify(data.token,process.env.secret_key);
        const check=await FriendreqSchema.findOne({SenderEmail:veri.user_email,RecieverEmail:data.Email});
        if(!check){
            res.status(300).json({msg:"false"});
        }
        else{
            res.status(200).json({msg:"true"});
        }        
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const delfriendreq=async (req,res)=>{
    try{
        const data=req.body;
        //console.log(data);
        const veri=jwt.verify(data.token,process.env.secret_key);
        const check=await FriendreqSchema.findOne({RecieverEmail:veri.user_email,SenderEmail:data.Email});
        if(check){
            const x=await FriendreqSchema.deleteOne({RecieverEmail:veri.user_email,SenderEmail:data.Email});
            res.status(200).json({msg:"Successfully Deleted"});
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const friendlist=require("../models/friend");
const acceptreq=async(req,res)=>{
    try{
        const data=req.body;
        //console.log(data);
        const veri=jwt.verify(data.token,process.env.secret_key);
        const x=await friendlist.create({RecieverEmail:veri.user_email,SenderEmail:data.Email});
        res.status(200).json({msg:"Successfully Accepted"});
        //const del=await  FriendreqSchema.deleteOne({RecieverEmail:veri.user_email,SenderEmail:data.Email});      
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const editdetails=async (req,res)=>{
    try{
        const data=req.body;
        //console.log(data);
        const oldemail=await regSchema.findOne({_id:data._id.toString()});
        console.log(oldemail);
        const x=await regSchema.updateOne({_id:data._id},{$set:{User_name:data.User_name,Email:data.Email,Contact:data.Contact}});
        if(x.acknowledged){
            //console.log(oldemail.Email);
            const y=await postSchema.updateMany({Email:oldemail.Email},{$set:{Email:data.Email}});
            const z=await likeSchema.updateMany({LikedEmail:oldemail.Email},{$set:{LikedEmail:data.Email}});
            const a=await likeSchema.updateMany({PostEmail:oldemail.Email},{$set:{PostEmail:data.Email}});
            const user=await regSchema.findOne({_id:data._id});
            res.status(200).json({msg:"Successfully Updated",token:user.getToken()});
        }
        else{
            res.status(400).json({msg:"Error While Updating"})
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const editpic=async (req,res)=>{
    try{
        const pic=req.file;
        const data=req.body;
        if(pic){
            const veri=jwt.verify(data.token,process.env.secret_key);
            console.log(veri);
            const id=await regSchema.findOne({_id:veri.user_id});
            //console.log(pic);
            const x=await regSchema.updateOne({_id:id},{$set:{Profile_pic:pic.path}});
            if(x.acknowledged){
                res.status(200).json({msg:"Profile Pic Updated Successfully"});
            }   
            else{
                res.status(400).json({msg:"Error While Updating Profile Pic"});
            }
        }
        else{
            res.status(400).json({msg:"Please Select Profile Pic"});
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const getallusers=async(req,res)=>{
    try{
        const token=req.header("Authorization");
        const veri=jwt.verify(token,process.env.secret_key);
        //console.log(veri);
        const user=await regSchema.findOne({Email:veri.user_email});
        const datas=await regSchema.find({});
        const result=[];
        const result1=[];
        var j1=0,j2=0,temp=0;
        const ch1=await FriendreqSchema.find({SenderEmail:user.Email});
        const ch2=await FriendreqSchema.find({RecieverEmail:user.Email});
        if(ch1.length!=0 && ch2.length!=0){
             for( i=0;i<datas.length;i++){
                for(var k=0;k<ch1.length;k++){
                    if(datas[i].Email==ch1[k].RecieverEmail || user.Email==datas[i].Email){
                        temp=1;
                        break;
                    }
                }
                if(temp==0){
                    const x=await regSchema.findOne({Email:datas[i].Email});
                    result1[j1]=({Profile_pic:x.Profile_pic,User_name:x.User_name,Email:x.Email});
                    j1+=1;
                }
                temp=0;
            }
            for(var i=0;i<result1.length;i++){
                for(var k=0;k<ch2.length;k++){
                    if(result1[i].Email==ch2[k].SenderEmail){
                        temp=1;
                        break;
                    }
                }
                if(temp==0){
                        const x=await regSchema.findOne({Email:result1[i].Email});
                        result[j2]=({Profile_pic:x.Profile_pic,User_name:x.User_name,Email:x.Email});
                        j2+=1;
                }
                temp=0;
            }
            res.status(200).json(result);
        }
        else if (ch2.length==0 && ch1.length!=0){
            var temp=0;
            for(var i=0;i<datas.length;i++){
                for(var k=0;k<ch1.length;k++){
                    if(datas[i].Email==ch1[k].RecieverEmail || user.Email==datas[i].Email){
                        temp=1;
                        break;
                    }
                }
                if(temp==0){
                    const x=await regSchema.findOne({Email:datas[i].Email});
                    result1[j1]=({Profile_pic:x.Profile_pic,User_name:x.User_name,Email:x.Email});
                    j1+=1;
                }
                temp=0;
            }
            res.status(200).json(result1);
        }
        else if(ch2.length!=0 && ch1.length==0){
            var temp=0;
            for(var i=0;i<datas.length;i++){
                for(var k=0;k<ch2.length;k++){
                    if(datas[i].Email==ch2[k].SenderEmail || user.Email==datas[i].Email){
                       temp=1;
                       break; 
                    }
                }
                if(temp==0){
                    const x=await regSchema.findOne({Email:datas[i].Email});
                    result1[j1]=({Profile_pic:x.Profile_pic,User_name:x.User_name,Email:x.Email});
                    j1+=1;
                }
                temp=0;
            }
            res.status(200).json(result1);
        }
        else{
            for(var i=0;i<datas.length;i++){
                if(datas[i].Email!=user.Email){
                    const x=await regSchema.findOne({Email:datas[i].Email});
                    result1[j1]=({Profile_pic:x.Profile_pic,User_name:x.User_name,Email:x.Email});
                    j1+=1;
                }
            }
            res.status(200).json(result1);
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const getfriendreq=async (req,res)=>{
    try{
        const token=req.header("Authorization");
        const veri=jwt.verify(token,process.env.secret_key);
        const data=await FriendreqSchema.find({RecieverEmail:veri.user_email});
        const data1=await friendlist.find({});
        const result=[];
        var j=0;
        if(data1.length!=0 && data.length!=0){
            var temp=0;
            for(var i=data.length-1;i>=0;i--){
                for(var k=0;k<data1.length;k++){
                    if((data[i].SenderEmail==data1[k].RecieverEmail && data[i].RecieverEmail==data1[k].SenderEmail) || (data[i].RecieverEmail==data1[k].RecieverEmail && data[i].SenderEmail==data1[k].SenderEmail)){
                        temp=1;
                        break;
                    }
                }
                if(temp==0){
                    const details=await regSchema.findOne({Email:data[i].SenderEmail});
                    result[j]=({Profile_pic:details.Profile_pic,User_name:details.User_name,Email:details.Email});
                    j=j+1;
                }
                temp=0
            }
            res.status(200).json(result);
        }
        else {
        for(var i=data.length-1;i>=0;i--){
            const details=await regSchema.findOne({Email:data[i].SenderEmail});
            result[j]=({Profile_pic:details.Profile_pic,User_name:details.User_name,Email:details.Email});
            j=j+1;
        }
        res.status(200).json(result);
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const friends=async (req,res)=>{
    try{
        const token=req.header("Authorization");
        const veri=jwt.verify(token,process.env.secret_key);
        const data=await friendlist.find({});
        const result=[];
        var j=0;
        for(var i=0;i<data.length;i++){
            if(data[i].SenderEmail==veri.user_email)
            {
                const details=await regSchema.findOne({Email:data[i].RecieverEmail});
                result[j]=({Profile_pic:details.Profile_pic,User_name:details.User_name,Email:details.Email,_id:data[i]._id});
                j=j+1;
            }
            else if(data[i].RecieverEmail==veri.user_email){
                const details=await regSchema.findOne({Email:data[i].SenderEmail});
                result[j]=({Profile_pic:details.Profile_pic,User_name:details.User_name,Email:details.Email,_id:data[i]._id});
                j=j+1;
            }
        }
        res.status(200).json(result);
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const unfriend=async (req,res)=>{
    try{
        const id=req.body._id;
        const token=req.body.token;
        const email=req.body.email;
        const veri=jwt.verify(token,process.env.secret_key);
        const x=await friendlist.deleteOne({_id:id});
        if(x.acknowledged){
            const y=await FriendreqSchema.deleteOne({SenderEmail:veri.user_email,RecieverEmail:email});
            //console.log(y);
            if(y.acknowledged){
                const z=await FriendreqSchema.deleteOne({SenderEmail:email,RecieverEmail:veri.user_email});
            }
            res.status(200).json({msg:"Successfully Unfriend"});
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const messageSchema=require("../models/message");
const sentmsg=async (req,res)=>{
    try{
        const data=req.body;
        const veri=jwt.verify(data.token,process.env.secret_key);
        const x=await messageSchema.create({SenderEmail:veri.user_email,RecieverEmail:data.Email,Message:data.Message});
        res.status(200).json({msg:"Successfully Sent"});
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const getmsg=async (req,res)=>{
    try{
        const token=req.header("Authorization");
        const email=req.params.email;
        const veri=jwt.verify(token,process.env.secret_key);
        const x=await messageSchema.find({});
        var result=[];
        var j=0;
        for(var i=0;i<x.length;i++){
            //cosnole.log("hii");
            if((x[i].SenderEmail==veri.user_email && x[i].RecieverEmail==email) || (x[i].SenderEmail==email && x[i].RecieverEmail==veri.user_email)){
                const pic=await regSchema.findOne({Email:x[i].SenderEmail});
                result[j]=({"Message":x[i].Message,"Profile_pic":pic.Profile_pic});
                j++;
            }                    
        }
        res.status(200).json(result);

    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const commentSchema=require("../models/comments");
const postcomment=async(req,res)=>{
    try{
        const data=req.body;
        const veri=jwt.verify(data.token,process.env.secret_key);
        const x=await commentSchema.create({Id:data.id,CommentEmail:veri.user_email,Comment:data.comment});
        const a=await postSchema.findOne({_id:data.id});
        const b=parseInt(a.Comments)+1;
        const y=await postSchema.updateOne({_id:data.id},{$set:{Comments:b.toString()}});
        res.status(200).json({msg:"Successfully Sent"}); 
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const allcomments=async(req,res)=>{
    try{
        const id=req.params.id;
        console.log(id);
        const x=await commentSchema.find({Id:id});
        const result=[];
        for(var i=0;i<x.length;i++){
            const y=await regSchema.findOne({Email:x[i].CommentEmail});
            result[i]=({User_name:y.User_name,Profile_pic:y.Profile_pic,Comment:x[i].Comment});
        }
        res.status(200).json(result);
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}






const share=async(req,res)=>{
    try{
        const data=req.body;
        const pic=await postSchema.findOne({_id:data.id});
        const veri=jwt.verify(data.token,process.env.secret_key);
        const date=new Date();
        const x=date.getDate()+"."+date.getMonth()+"."+date.getFullYear();
        const y=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        const z=await postSchema.create({Email:veri.user_email,Description:pic.Description,Photo:pic.Photo,Likes:"0",Comments:"0",Date:x,Time:y});
        res.status(200).json({msg:"Posted Successfully"});
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}



const deletepic=async (req,res)=>{
    try{
        const id=req.body.id;
        const x=await postSchema.deleteOne({_id:id});
        res.status(200).json({msg:"Deleted Successfully"});
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
module.exports={register,login,forgotpwd,profile,uploadpost,getallposts,addLikes,removeLikes, storelikedetails, checklike,getpost, sendfriendreq,checkfriendreq,delfriendreq, editdetails, editpic, getallusers, getfriendreq, acceptreq, friends, unfriend, sentmsg, getmsg,postcomment,allcomments,share,deletepic};