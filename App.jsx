import {BrowserRouter} from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Forgotpwd } from "./pages/Forgot";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Addpost } from "./pages/Addpost";
import { Friend } from "./pages/Friend";
import { Editprofile } from "./pages/Editprofile";
import { Editpic } from "./pages/Editpic";
import { Friendreq } from "./pages/FriendReq";
import { Friendlist } from "./pages/Friendlist";
import { Message } from "./pages/Message";
import { Chat } from "./pages/Chat";
import { Postcomment } from "./pages/Postcomment";
function App() {
    const x=localStorage.getItem("token");
    if(x){
    return(
      <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/forgotpassword" element={<Forgotpwd/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/addpost" element={<Addpost/>}/>
          <Route path="/friendrequest" element={<Friend/>}/>
          <Route path="/editprofile" element={<Editprofile/>}/>
          <Route path="/editprofilepic" element={<Editpic/>}/>
          <Route path="/friendrequests" element={<Friendreq/>}/>
          <Route path="/friends" element={<Friendlist/>}/>
          <Route path="/sentmessage/:email" element={<Message/>}/>
          <Route path="/getmessage/:email" element={<Chat/>}/>
          <Route path="/postcomment/:id" element={<Postcomment/>}/>
        </Routes>
      </BrowserRouter>
      </>
    )
  }
  else{
      return(
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/forgotpassword" element={<Forgotpwd/>}/>
          </Routes>
        </BrowserRouter>
      )    
  }
}

export default App
