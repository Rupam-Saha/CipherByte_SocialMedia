import { useState } from "react";
import "./message.css";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export const Message=()=>{
    const [msg,setmsg]=useState({
        Message:""
    });
    const navi=useNavigate();
    const email=useParams("email");
    const changfunc=(e)=>{
        let nm=e.target.name;
        let val=e.target.value;

        setmsg({
            ...msg,
            [nm]:val
        })
    }
    const submit=async (e)=>{
        e.preventDefault();
        //console.log(msg);
        try{
            const respo=await fetch("http://localhost:4001/sentmessage",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"Email":email.email,"token":localStorage.getItem("token"),"Message":msg.Message})
            })
            const x=await respo.json();
            if(respo.status==200){
                Swal.fire({
                    text:x.msg,
                    icon:"success",
                    background:"white"
                })
                setmsg({
                    Message:""
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
    return(
        <>
        <div className="msgbox">
            <input
            placeholder="Enter Your Message"
            name="Message"
            value={msg.Message}
            onChange={changfunc}
            />
        </div>
        <div className="sayani">
            <center><button onClick={submit}><span id="ab">SENT</span></button>
            <button onClick={()=>{navi("/friends")}}><span id="ab">BACK</span></button></center>
        </div>
        </>
    )
}