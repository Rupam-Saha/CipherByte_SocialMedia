import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./addpost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDisplay, faUpload } from "@fortawesome/free-solid-svg-icons";
export const Addpost=()=>{
    const navi=useNavigate();
    const [desp,setdesp]=useState({
        Description:""
    });
    //const [desp,setdesp]=useState("");
    const [image,setimage]=useState("");
    const [a,seta]=useState("");
    const func1=()=>{
        navi("/home");
    }
    const func2=()=>{
        navi("/profile")
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
    const changfunc=(e)=>{
        let nm=e.target.name;
        let val=e.target.value;

        setdesp({
            [nm]:val
        })
        //setdesp(val);
    }
    const submitfunc=async (e)=>{
        e.preventDefault();
        const formdata=new FormData();
        formdata.append("token",localStorage.getItem("token"));
        formdata.append("Description",desp.Description);
        formdata.append("Photo",image);
        try{
            const respo=await fetch("http://localhost:4001/uploadpost",{
                method:"POST",
                body:formdata
            });
            console.log(respo);
            const x=await respo.json();
            if(respo.status==200){
                Swal.fire({
                    text:x.msg,
                    icon:"success",
                    background:"white"
                });
                setdesp({
                    Description:""
                });
                //setdesp("");
                setimage("");
            }
            else{
                Swal.fire({
                    text:x.msg,
                    icon:"error",
                    background:"white"
                });
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
    const changfunc1=(e)=>{
        setimage(e.target.files[0]);
        //document.querySelector(".showimage").removeAttribute("display");
        //seta(e.target.files[0].name);
    }
    return(
        <>
        <div className="abc">
        <div className="nav">
            <h2><b id="head">CONNECTSPHERE</b></h2>
            <div className="list">
                <p id="p1" onClick={func1}><b>HOME</b></p>
                <p onClick={func2}><b>PROFILE</b></p>
                <p><b id="here">ADD POST</b></p>
                <p onClick={func3}><b>FREIND REQUESTS</b></p>
                <p onClick={func4}><b>LOGOUT</b></p>
            </div>
        </div>
        </div>
        <div className="addpostform">
            <div className="descrip">
                <p><b>DESCRIPTION</b></p>
                <input
                type="text"
                placeholder="Enter Your Description"
                id="input1"
                name="Description"
                value={desp.Description}
                onChange={changfunc}
                />
            </div>
            <div className="imag">
                <p><b>IMAGE</b></p>
                <input
                type="file"
                onChange={changfunc1}
                />
            </div>
        <div className="sayani">
            <button onClick={submitfunc}><FontAwesomeIcon icon={faUpload} id="ab"/><span id="ab">UPLOAD</span></button>
            <button onClick={()=>{navi("/home")}}><span id="ab">BACK</span></button>
            </div>            
        </div>
        </>
    )
}




