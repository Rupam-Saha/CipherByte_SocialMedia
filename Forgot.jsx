import picture from "../images/socialmedia.webp";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
export const Forgotpwd=()=>{
    const [data,setdata]=useState({
        Email:"",
        Password:""
    });
    const navi=useNavigate();
    const gotoback=()=>{
        navi("/login");
    }
    const changval=(e)=>{
        let nm=e.target.name;
        let val=e.target.value;

        setdata({
            ...data,
            [nm]:val
        })
    }
    const submitfunc=async(e)=>{
        e.preventDefault();
        
        try{
            const respo=await fetch("http://localhost:4001/forgotpassword",{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data)
            })
            const x=await respo.json();
            if(respo.status==200){
                Swal.fire({
                    text:x.msg,
                    icon:"success",
                    background:"white"
                })
                navi("/login");
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
    return(
        <>
        <div className="rupam">
        <div className="detail">
                <h1><b><u>CONNECTSPHERE</u></b></h1>
                <img src={picture} id="picture"/>
        </div>
        <div className="login">
                <div className="email">
                    <p><b>EMAIL</b></p>
                    <input 
                    type="email"
                    name="Email"
                    placeholder="Enter Your Email"
                    value={data.Email}
                    onChange={changval}
                    />
                </div>
                <div className="pwd">
                    <p><b>NEW PASSWORD</b></p>
                    <input 
                    type="password"
                    name="Password"
                    placeholder="Enter Your New Password"
                    value={data.Password}
                    onChange={changval}
                    />
                </div>
                <div className="sayani">
                    <button onClick={submitfunc}><span id="ab">UPDATE</span></button>
                    <button><span id="ab" onClick={gotoback}>BACK</span></button>
                </div>
            </div>
        </div>
        </>
    )
}