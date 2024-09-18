import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./friendlist.css";
import Swal from "sweetalert2";
export const Friendlist=()=>{
    const navi=useNavigate();
    const [friends,setfriends]=useState([]);
    const func=async ()=>{
        try{
            const respo=await fetch("http://localhost:4001/friends",{
                method:"GET",
                headers:{"Authorization":localStorage.getItem("token")}
            })
            const x=await respo.json();
            console.log(x);
            setfriends(x);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        func()
    },[])
    const func1=async (id,email)=>{
        console.log(id);
        Swal.fire({
            text:"Sure ?? You Want To Unfriend",
            background:"white",
            icon:"question",
            showCancelButton:true,
            showConfirmButton:true,
            cancelButtonText:"No",
            confirmButtonText:"Yes"
        }).then((x)=>{
            if(x.isConfirmed){
                func2(id,email);
            }
        })
    }
    const func2=async (id,email)=>{
        try{
            const respo=await fetch("http://localhost:4001/unfriend",{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"_id":id,"token":localStorage.getItem("token"),"email":email})
            })
            console.log(respo);
            const a=await respo.json();
            if(respo.status==200){
                Swal.fire({
                    text:a.msg,
                    icon:"success",
                    background:"white"
                });
                func();
            }
            else{
                Swal.fire({
                    text:a.msg,
                    icon:"error",
                    background:"white"
                })
            }
        }
        catch(error){
            console.log(error);
        }
    }
    const func3=(email)=>{
        navi(`/sentmessage/${email}`)
    }
    const func4=(email)=>{
        navi(`/getmessage/${email}`)
    }
    if(friends.length==0){
    return(
        <>
        <h1>NO FRIENDS PRESENT</h1>
        <div className="sayani">
            <center><button onClick={()=>{navi("/friendrequest")}}><span id="ab">BACK</span></button></center>
        </div>
        </>
    )}
    else{
        return(
            <>
            <div className="users">
            <table border="2px">
            {
                    friends.map((cur,index)=>{
                        return(
                            <tr key={index}>
                                <td><center><img src={`http://localhost:4001/${cur.Profile_pic}`} id="pc"/></center></td>
                                <td><h4>{cur.User_name}</h4></td>
                                <td><div className="sayani"><button className="def" onClick={()=>{func1(cur._id,cur.Email)}}><span id="ab">UNFRIEND</span></button></div></td>
                                <td><div className="sayani"><button className="def" onClick={()=>{func3(cur.Email)}}><span id="ab">MESSAGE</span></button></div></td>
                                <td><div className="sayani"><button className="def" onClick={()=>{func4(cur.Email)}}><span id="ab">CHATS</span></button></div></td>
                            </tr>
                        )}   
                    )
            }        
            </table>
            <div className="sayani">
                <center><button onClick={()=>{navi("/friendrequest")}}><span id="ab">BACK</span></button></center>
            </div>
            </div>
            </>
        )
    }
} 