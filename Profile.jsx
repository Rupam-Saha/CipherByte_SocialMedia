import { useEffect } from "react";
import { useState } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart,faComment,faShare,faPenToSquare,faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
export const Profile=()=>{
    const navi=useNavigate();
    const [details,setdetails]=useState({});
    const [posts,setposts]=useState([]);
    const func=async ()=>{
        const token=localStorage.getItem("token");
        //console.log(token);
        try{
            const respo=await fetch("http://localhost:4001/profile",{
                method:"GET",
                headers:{Authorization:`Header ${token}`},
            })
            //console.log(respo);
            const x=await respo.json();
            setdetails(x);
        }
        catch(error){
            console.log(error);
        }
    }
    const getpost=async ()=>{
        try{
            const respo=await fetch("http://localhost:4001/getpost",{
                method:"GET",
                headers:{"Authorization":localStorage.getItem("token")}
            });
            console.log(respo);
            if(respo.status==200){
                const xy=await respo.json();
                setposts(xy.data);
            }
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        func();
    },[]);
    useEffect(()=>{
        getpost()
    });
    const gotoback=()=>{
        navi("/home");
    }
    const func3=()=>{
        navi("/friendrequest");
    }
    const func4=()=>{
        Swal.fire({
            text:"Are You Sure ??",
            icon:"question",
            showConfirmButton:true,
            showCancelButton:true,
            confirmButtonText:"Yes",
            cancelButtonText:"No",
            background:"white"
        }).then((x)=>{
            if(x.isConfirmed){
                logout();
            }
        })
    }
    const logout=()=>{
        localStorage.removeItem("token");
        navi("/");
    }
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
                    getpost();
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
                    getpost();
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
    const gotoedit=()=>{
        navi("/editprofile");
    }
    const gotopic=()=>{
        navi("/editprofilepic");
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
    const dele=(id)=>{
        Swal.fire({
            text:"Are You Want To Delete??",
            icon:"question",
            background:"white",
            showCancelButton:true,
            showConfirmButton:true,
            confirmButtonText:"Yes",
            cancelButtonText:"No"
        }).then((x)=>{
            if(x.isConfirmed){
                delfunc(id);
            }
        })
    }
    const delfunc=async(id)=>{
        try{
            const respo=await fetch("http://localhost:4001/deletepost",{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"id":id})
            })
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
        <div className="a1">
        <div className="nav">
            <h2><b id="head">CONNECTSPHERE</b></h2>
            <div className="list">
                <p id="p1"><b onClick={gotoback}>HOME</b></p>
                <p ><b id="here">PROFILE</b></p>
                <p><b onClick={func1}>ADD POST</b></p>
                <p onClick={func3}><b>FREIND REQUESTS</b></p>
                <p onClick={func4}><b>LOGOUT</b></p>
            </div>
        </div>
        <div className="data">
            <div className="image">
                <img id="y1" src={`http://localhost:4001/${details.Profile_pic}`}/>
                <div className="sayani">
                    <button id="z" onClick={gotopic}><span id="ab">UPDATE</span></button>
                </div>
            </div>
            <div className="info" id="xcx">
                <div className="name" id="x1">
                    <p><b>NAME</b></p>
                    <input value={details.User_name}/>
                </div>
                <div className="name">
                    <p><b>EMAIL</b></p>
                    <input value={details.Email}/>
                </div>
                <div className="name">
                    <p><b>CONTACT</b></p>
                    <input value={details.Contact}/>
                </div>
                <div className="sayani">
                    <button onClick={gotoedit}><span id="ab"><FontAwesomeIcon icon={faPenToSquare} />EDIT</span></button>
                </div>
            </div>
        </div>
        <div className="post1" id="xbx">
            {
                posts.map((cur,index)=>{
                    return(
                        <div className="rupam1"  id="xax" key={index}>
                            <div className="des">
                                <center><h5>{cur.Description}</h5>
                                </center>
                                <hr/>
                                <center><img src={`http://localhost:4001/${cur.Photo}`} id="pics"/></center>
                                <hr/>
                                <FontAwesomeIcon icon={faHeart} className="icon1" color="white" onClick={()=>addlike1(cur._id,cur.Email)} />
                                <span id="like"><b>{cur.Likes} likes</b></span>
                                <FontAwesomeIcon icon={faComment} id="icon2" color="white" onClick={()=>{navi(`/postcomment/${cur._id}`)}}/>
                                <span id="comment"><b>{cur.Comments} comments</b></span>
                                <FontAwesomeIcon icon={faShare} id="icon3" color="white" onClick={()=>{funct(cur._id)}}/>
                                <span id="share"><b>share</b></span>
                                <FontAwesomeIcon icon={faTrash}  color="white" id="del" onClick={()=>{dele(cur._id)}}/>
                                <span id="delete"><b>Delete</b></span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        </div>
        </>
    )
}