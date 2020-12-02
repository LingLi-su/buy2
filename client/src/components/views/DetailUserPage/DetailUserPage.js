import React, { useEffect, useState } from "react";
import Subscriber from "./Sections/Subscriber";
import { Icon, Col, Card, Row } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import  LikeDislikes from './Sections/LikeDislikes';
import axios from "axios";


const { Meta } = Card;


function DetailUserPage(props) {
  const [UserObj, setUserObj] = useState({});
  const [Name, setName] = useState("");
  // let userId = localStorage.getItem("userId");

  const [Posts, setPosts] = useState([]);
 

  
  console.log("kkkkkk");

  const userId = props.match.params.userId;
  const userTo = localStorage.getItem("userId");

  useEffect(() => {
    // axios.post("/api/users/userInfo", { userId }).then((response) => {
    //   if (response.data.success) {
    //     // setName(response.data.userInfo.name);
    //     console.log(response.data.userInfo);
    //     setUserObj(response.data.userInfo);
    //     setName(response.data.userInfo.name);
    //   } else {
    //     alert("nooooooo");
    //   }
   

    axios
      .get(`/api/users/user_by_id?id=${userId}&type=single`)
      .then((response) => {
        setUserObj(response.data.user[0]);
        setName(response.data.user[0].name);
        setPosts(response.data.posts)
        console.log(response);
      });
  }, []);

  

  const renderCards = Posts.map((post, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={
            <a href={`/post/${post._id}`}>
              {" "}
              <ImageSlider images={post.images} />
            </a>
          }
        >
          <Meta title={post.title} description={`$${post.price}`} />
          <LikeDislikes post postId={post._id} userId={localStorage.getItem('userId')}/>

        </Card>
      </Col>
    );
  });


  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          {Name}
        </h2>
        {userId !== userTo ? (
          <Subscriber userTo={userId} userFrom={userTo} />
        ) : null}
      </div>


      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      ></div>
      {Posts.length === 0 ? (
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>No post yet...</h2>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}
      <br />
      <br />

      
    </div>
  );
}

export default DetailUserPage;
