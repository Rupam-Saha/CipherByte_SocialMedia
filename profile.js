const multer=require("multer");
const mystorage=multer.diskStorage({
    destination:"pic",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});
const upload=multer({
    storage:mystorage
}).single("Profile_pic");
module.exports=upload;