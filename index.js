require("dotenv").config();
const express=require("express");
const cors=require("cors");
const connectTodb=require("./connection/connecttodb");
const r=require("./route/route");
const port=process.env.port;
const app=express();
const corsOption=({
    origin:"http://localhost:5173",
    methods:"POST,PATCH,GET,DELETE,PUT,HEAD",
    Credential:true
})
app.use(express.json());
app.use(cors(corsOption));
app.use("/pic",express.static("pic"));
app.use("/posts",express.static("posts"));
app.use("",r);
connectTodb().then(()=>{
    app.listen(port,(req,res)=>{
        console.log(`server is running at ${port}`);
    })
});