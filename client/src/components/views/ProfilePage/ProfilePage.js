import React, { useEffect, useState } from "react";
import {
  YoutubeOutlined,
  InstagramOutlined,
  TwitterOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import axios from "axios";
import MyPostPage from "../MyPostPage/MyPostPage";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";

function ProfilePage(props) {
  const [UserObj, setUserObj] = useState({});
  const [Name, setName] = useState("");
  const user = useSelector((state) => state.user);
  const userId = user.userData._id;
  // const userId = 11222;
  // const {
  //   userData: { _id },
  // } = user;
  console.log("kkkkkk");

  useEffect(() => {
    console.log(user);
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
      <div
        id="profileIntro"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h1>{Name}</h1>
      </div>

      <div id="profileBody">
        <MyPostPage />
      </div>
    </div>
  );
}

export default ProfilePage;
