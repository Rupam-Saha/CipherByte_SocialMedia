import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";
import "./friend.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
export const Friend=()=>{
    const navi=useNavigate();
    const [allusers,setallusers]=useState([]);
    //localStorage.setItem("value",8);
    const func=async()=>{
        try{
            const respo=await fetch("http://localhost:4001/getallusers",{
                method:"GET",
                headers:{"Authorization":localStorage.getItem("token")}
            })
            const x=await respo.json();
            console.log(x);
            setallusers(x);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        func();
    },[100]);
    const func1=()=>{
        navi("/home");
    }
    const func2=()=>{
        navi("/profile");
    }
    const func3=()=>{
        navi("/addpost");
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
    const sentreq=async (email)=>{
        try{
            const respo=await fetch("http://localhost:4001/sendfriendrequest",{
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
                <p id="p1"><b onClick={func1}>HOME</b></p>
                <p onClick={func2}><b>PROFILE</b></p>
                <p><b onClick={func3}>ADD POST</b></p>
                <p><b>FREIND REQUESTS</b></p>
                <p onClick={func4}><b>LOGOUT</b></p>
            </div>
        </div>
        <div className="opt">
            <p onClick={()=>{navi("/friendrequests")}}><b><h2>FRIEND REQUESTS</h2></b></p>
            <p onClick={()=>{navi("/friends")}}><b><h2>FRIENDS</h2></b></p>
        </div>
        <div className="users">
            <table border="2px">
                <tr>
                    <th>PROFILE PIC</th>
                    <th>USER NAME</th>
                    <th>REQUEST BUTTON</th>
                </tr>
                {
                    allusers.map((cur,index)=>{
                        return(
                            <tr key={index}>
                                <td><center><img src={`http://localhost:4001/${cur.Profile_pic}`} id="pc"/></center></td>
                                <td><h4>{cur.User_name}</h4></td>
                                    <td><div className="sayani">
                                        <button className="cd" onClick={()=>sentreq(cur.Email)}><center><FontAwesomeIcon icon={faPlus} className="ico"/><span id="ab"><b>ADD FREIND</b></span></center></button>
                                    </div></td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>       
        </>
    )
}