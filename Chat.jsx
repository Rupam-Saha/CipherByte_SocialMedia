import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./chat.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export const Chat=()=>{
    const [data,setdata]=useState([]);
    const [msg,setmsg]=useState({
        Message:""
    })
    const navi=useNavigate();
    const email=useParams("email");
    const func=async ()=>{
        try{
            const respo=await fetch(`http://localhost:4001/getmessage/${email.email}`,{
                method:"GET",
                headers:{"Authorization":localStorage.getItem("token")}
            })
            const x=await respo.json();
            console.log(x);
            if(respo.status==200){
                setdata(x);
            } 
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        func();
    },[]);
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
                setmsg({
                    Message:""
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
    if(data.length!=0){
    return(
        <>
        <div className="messagebox">
            {
                data.map((cur,index)=>{
                    return(<div key={index} className="abcd">
                        <img src={`http://localhost:4001/${cur.Profile_pic}`} id="pc"/>
                        <h4>{cur.Message}</h4>
                    </div>)
                })
            }
        </div>
        <div className="sent">
            <input
            placeholder="Enter your message"
            value={msg.Message}
            name="Message"
            onChange={changfunc}
            />
            <div className="sayani">
                <button onClick={submit}>
                    <span id="ab">
                        SENT
                    </span>
                </button>
            </div>
        </div>
        <div className="sayani">
            <center>
                <button onClick={()=>{
                    navi("/friends")
                }}>
                    <span id="ab">
                        BACK
                    </span>
                </button>
            </center>
        </div>
        </>
    )}
    else{
        return(
            <>
            <h1>No Conversation Occured</h1>
            <div className="sayani">
            <center>
                <button onClick={()=>{
                    navi("/friends")
                }}>
                    <span id="ab">
                        BACK
                    </span>
                </button>
            </center>
            </div>
            </>
        )
    }
}