import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./postcomment.css";
export const Postcomment=()=>{
    const [msg,setmsg]=useState("");
    const [com,setcom]=useState([]);
    const id=useParams("id");
    const navi=useNavigate();
    const changfunc=(e)=>{
        setmsg(e.target.value);
    }
    const func=async()=>{
        try{
            const respo=await fetch(`http://localhost:4001/allcomments/${id.id}`,{
                method:"GET"
            });
            const x=await respo.json();
            if(respo.status==200){
                //console.log(x);
                setcom(x);
            }
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        func();
    },[]);
    const submitfunc=async (e)=>{
        e.preventDefault();
        try{
            const respo=await fetch("http://localhost:4001/postcomment",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"id":id.id,"token":localStorage.getItem("token"),"comment":msg})
            })
            const x=await respo.json();
            if(respo.status==200){
                Swal.fire({
                    text:x.msg,
                    icon:"success",
                    background:"white"
                });
                setmsg("");
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
                background:"white",
                icon:"error"
            })
        }
    }
    return(
        <>
        <div className="all">
            {
                com.map((cur,index)=>{
                    return(
                        <div className="x" key={index}>
                            <div className="bio">
                                <img src={`http://localhost:4001/${cur.Profile_pic}`} id="pic"/>
                                <h4 id="xex">{cur.User_name}</h4>
                            </div>
                            <p id="pp"><b>{cur.Comment}</b></p>
                            <hr/>
                        </div>
                    )
                })
            }
        </div>
        <div className="msg">
            <input
            type="text"
            placeholder="Enter Your Comment"
            value={msg}
            onChange={changfunc}/>
        </div>
        <div className="sayani">
            <center>
            <button onClick={submitfunc}>
                <span id="ab">SENT</span>
            </button>
            <button onClick={()=>{navi("/home")}}>
                <span id="ab">BACK</span>
            </button>
            </center>
        </div>
        </>
    )
} 