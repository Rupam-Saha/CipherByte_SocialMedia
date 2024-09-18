const multer=require("multer");
const mystorage=multer.diskStorage({
    destination:"posts",
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})
const post=multer({
    storage:mystorage
}).single("Photo");
module.exports=post;