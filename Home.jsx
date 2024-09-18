import { useState } from "react";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart,faComment,faShare,faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./home.css";
export const Home=()=>{
    const navi=useNavigate();
    const [post,setpost]=useState([]);
    const func=async ()=>{
        try{
            const respo=await fetch("http://localhost:4001/getallposts",{
                method:"GET",
                headers:{"Authorization":localStorage.getItem("token")}
            });
            //console.log(respo);
            if(respo.status==200){
                const xy=await respo.json();
                //console.log(xy);
                setpost(xy);
            }
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        func();
    },[]);
    const addlike1=async(id,email)=>{
        const a=await sayani1(id,email);
        if(a=="false"){
            //console.log(id,email);
            try{
                const respo=await fetch("http://localhost:4001/addlikes",{
                    method:"PATCH",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({"id":id})
                });
                //console.log(respo);
                if(respo.status==200){
                    if(document.querySelector(".icon1").getAttribute("color")=="white"){
                        document.querySelector(".icon1").setAttribute("color","black");
                    }
                    func();
                    xyz(id,email);
                } 
            }
            catch(error){
                console.log(error);
            }
        }
        else{
            try{
                const respo1=await fetch("http://localhost:4001/removelikes",{
                    method:"PATCH",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({"id":id})
                });
                //console.log(respo);
                if(respo1.status==200){
                    if(document.querySelector(".icon1").getAttribute("color")=="black"){
                        document.querySelector(".icon1").setAttribute("color","white");
                    }
                    func();
                    xyz(id,email);
                } 
            }
            catch(error){
                console.log(error);
            }
        }
    }
    const sayani1=async(id,email)=>{
        try{
            const respo=await fetch("http://localhost:4001/checklike",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"Id":id,"Email":email,"token":localStorage.getItem("token")})
            });
            if(respo.status==200){
                const x=await respo.json();
                //console.log(parseInt(x.msg));
                return (x.msg);
            }
            else{
                console.log("hii");
            }
        }
        catch(error){
            console.log(error);
        }
    }
    const xyz=async(id,email)=>{
        try{
            const respo=await fetch("http://localhost:4001/storelikedetails",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"Id":id,"Email":email,"token":localStorage.getItem("token")})
            })
        }
        catch(error){
            console.log(error);
        }
    }
    const func1=()=>{
        navi("/addpost");
    }
    const func2=()=>{
        navi("/profile");
    }
    const func3=()=>{
        navi("/friendrequest");
    }
    const func4=()=>{
        Swal.fire({
            text:"Are You Want To Logout??",
            background:"white",
            icon:"question",
            showCancelButton:true,
            showConfirmButton:true,
            confirmButtonText:"Yes",
            cancelButtonText:"No"
        }).then((x)=>{
            if(x.isConfirmed){
                func5();
            }
        })
    }
    const func5=()=>{
        localStorage.removeItem("token");
        navi("/");
    }
    const funct=(id)=>{
        Swal.fire({
            text:"Are You Want To Share This Post??",
            icon:"question",
            background:"white",
            showCancelButton:true,
            showConfirmButton:true,
            confirmButtonText:"Yes",
            cancelButtonText:"No",
        }).then((x)=>{
            if(x.isConfirmed){
                funct1(id);
            }
        })
    }
    const funct1=async(id)=>{
        try{
            const respo=await fetch("http://localhost:4001/sharepost",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"id":id,"token":localStorage.getItem("token")})
            });
            //console.log(respo);
            const x=await respo.json();
            if(respo.status==200){
                Swal.fire({
                    text:x.msg,
                    icon:"success",
                    background:"white"
                })
                func();
            }
            else{
                Swal.fire({
                    text:x.msg,
                    icon:"error",
                    background:"white"
                })
            }
        }
        catch(error){
            Swal.fire({
                text:"Error",
                icon:"error",
                background:"white"
            })
        }
    }
    return(
        <>
        <div className="nav">
            <h2><b id="head">CONNECTSPHERE</b></h2>
            <div className="list">
                <p id="p1"><b id="here">HOME</b></p>
                <p><b onClick={func2}>PROFILE</b></p>
                <p><b onClick={func1}>ADD POST</b></p>
                <p onClick={func3}><b>FREIND REQUESTS</b></p>
                <p onClick={func4}><b>LOGOUT</b></p>
            </div>
        </div>
        <div className="post1">
            {
                post.map((cur,index)=>{
                    return(
                        <div className="rupam1" key={index}>
                            <div className="des">
                                <center><img src={`http://localhost:4001/${cur.Profile_pic}`} id="pic"/>
                                <span><b id="abc">{cur.User_name}</b></span></center>
                                <hr/>
                                <center><h5>{cur.Description}</h5></center>
                                <hr/>
                                <center><img src={`http://localhost:4001/${cur.Photo}`} id="pics"/></center>
                                <hr/>
                                <FontAwesomeIcon icon={faHeart} className="icon1" color="white" onClick={()=>addlike1(cur._id,cur.Email)} />
                                <span id="like"><b>{cur.Likes} likes</b></span>
                                <FontAwesomeIcon icon={faComment} color="white" id="icon2" onClick={()=>{navi(`/postcomment/${cur._id}`)}}/>
                                <span id="comment"><b>{cur.Comments} comments</b></span>
                                <FontAwesomeIcon icon={faShare} color="white" id="icon3" onClick={()=>funct(cur._id)}/>
                                <span id="share"><b>share</b></span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}