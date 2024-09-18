import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./editpic.css";
export const Editpic=()=>{
    const navi=useNavigate();
    const [image,setimage]=useState("");
    const func=(e)=>{
        setimage(e.target.files[0]);
    }
    const uploadfunc=async(e)=>{
        e.preventDefault();
        const formdata=new FormData();
        formdata.append("token",localStorage.getItem("token"));
        formdata.append("Profile_pic",image);
        try{
            const respo=await fetch("http://localhost:4001/editpic",{
                method:"PATCH",
                body:formdata
            })
            const x=await respo.json();
            if(respo.status==200){
                Swal.fire({
                    text:x.msg,
                    icon:"success",
                    background:"white"
                })
                navi("/profile");
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
            <div className="info">
                <p><b>UPLOAD PROFILE PIC</b></p>
                <input
                type="file"
                name="Profile_pic"
                id="i1"
                onChange={func}
                />
                </div>
                <div className="sayani">
                    <center>
                    <button onClick={uploadfunc}><span id="ab"><FontAwesomeIcon icon={faUpload} />UPLOAD</span></button>
                    <button onClick={()=>{navi("/profile")}}><span id="ab">BACK</span></button>
                    </center>
                </div>
        </div>
        </>
    )
}