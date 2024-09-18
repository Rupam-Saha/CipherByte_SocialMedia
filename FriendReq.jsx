import { useState } from "react";
import { useEffect } from "react";
import "./friendreq.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export const Friendreq=()=>{
    const navi=useNavigate();
    const [req,setreq]=useState([]);
    const func=async ()=>{
        try{
            const respo=await fetch("http://localhost:4001/getfriendrequests",{
                method:"GET",
                headers:{"Authorization":localStorage.getItem("token")}
            });
            const x=await respo.json();
            //console.log(x);
            setreq(x);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        func();
    },[]);
    const func1=async (email)=>{
        //console.log(email);
        try{
            const respo=await fetch("http://localhost:4001/deletefriendrequest",{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"Email":email,"token":localStorage.getItem("token")})
            })
            const x=await respo.json();
            if(respo.status==200){
                Swal.fire({
                    text:x.msg,
                    icon:"success",
                    background:"white"
                });
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
            console.log(error);
        }
    }
    const func2=async (email)=>{
        //console.log(email);
        try{
            const respo=await fetch("http://localhost:4001/acceptfriendrequest",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"Email":email,"token":localStorage.getItem("token")})
            })
            const x=await respo.json();
            if(respo.status==200){
                Swal.fire({
                    text:x.msg,
                    icon:"success",
                    background:"white"
                });
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
            console.log(error);
        }
    }
    if(req.length==0){
        return(
            <>
            <h1>NO FRIEND REQUESTS PRESENT</h1>
            <div className="sayani">
                <center><button onClick={()=>{navi("/friendrequest")}}><span id="ab">BACK</span></button></center>
            </div>
            </>
        )       
    }
    else{
    return(
        <>
        <div className="users">
            <table border="2px">
            {
                    req.map((cur,index)=>{
                        return(
                            <tr key={index}>
                                <td><center><img src={`http://localhost:4001/${cur.Profile_pic}`} id="pc"/></center></td>
                                <td><h4>{cur.User_name}</h4></td>
                                <td><div className="sayani"><button className="de" onClick={()=>{func2(cur.Email)}}><span id="ab">ACCEPT</span></button></div></td>
                                <td><div className="sayani"><button className="de" onClick={()=>{func1(cur.Email)}}><span id="ab">DELETE</span></button></div></td>
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
    )}
}