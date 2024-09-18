import "./editprofile.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
export const Editprofile=()=>{
    const navi=useNavigate();
    const [details,setdetails]=useState({});
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
            console.log(x);
            setdetails(x);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        func()
    },[]);
    const changfunc=(e)=>{
        let nm=e.target.name;
        let val=e.target.value;

        setdetails({
            ...details,
            [nm]:val
        })
    }
    const updatefunc=async(e)=>{
        e.preventDefault();
        try{
            const respo=await fetch("http://localhost:4001/editdetails",{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"_id":details._id,"User_name":details.User_name,"Email":details.Email,"Contact":details.Contact})
            })
            const x=await respo.json();
            console.log(x);
            if(respo.status==200){
                Swal.fire({
                    text:x.msg,
                    icon:"success",
                    background:"white"
                });
                localStorage.removeItem("token");
                localStorage.setItem("token",x.token);
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
        <div className="data1">
            <div className="info" id="xdx">
                <div className="name" id="x1">
                    <p><b>NAME</b></p>
                    <input
                    name="User_name" 
                    value={details.User_name}
                    onChange={changfunc}
                    />
                </div>
                <div className="name">
                    <p><b>EMAIL</b></p>
                    <input 
                    name="Email"
                    value={details.Email}
                    onChange={changfunc}
                    />
                </div>
                <div className="name">
                    <p><b>CONTACT</b></p>
                    <input 
                    name="Contact"
                    value={details.Contact}
                    onChange={changfunc}
                    />
                </div>
                <div className="sayani">
                    <button onClick={updatefunc}><span id="ab">UPDATE</span></button>
                    <button onClick={()=>{navi("/profile")}}><span id="ab">BACK</span></button>
                </div>
        </div>
        </div>
        </>
    )
}