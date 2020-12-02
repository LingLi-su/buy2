import React, { useEffect, useState } from "react";
import { YoutubeOutlined, InstagramOutlined, TwitterOutlined, ShareAltOutlined } from '@ant-design/icons';
import axios from "axios";
import MyPostPage from "../MyPostPage/MyPostPage";
import './ProfilePage.css';

function ProfilePage(props) {
  const [UserObj, setUserObj] = useState({});
  const [Name, setName] = useState("");
  let userId = localStorage.getItem("userId");
  console.log("kkkkkk");


  useEffect(() => {
    axios.post("/api/users/userInfo", { userId }).then((response) => {
      if (response.data.success) {
        // setName(response.data.userInfo.name);
        console.log(response.data.userInfo);
        setUserObj(response.data.userInfo);
        setName(response.data.userInfo.name);
      } else {
      }
      console.log(userId);
    });
  }, []);
  return (
  <div>
    <div id= "profileIntro" style={{display:'flex',justifyContent:'center'}}>
    <h1>{Name}</h1>
    </div>
    
                <div id="profileBody">
                <MyPostPage />
                </div>
        
  </div>

  )
}

export default ProfilePage;
