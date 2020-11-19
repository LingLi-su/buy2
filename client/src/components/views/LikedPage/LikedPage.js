import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Icon, Col, Card, Row, Avatar } from "antd";

import ImageSlider from "../../utils/ImageSlider";


const { Meta } = Card;

function LandingPage() {
  const [Posts, setPosts] = useState([]);
  const [Likes, setLikes] = useState([]);



  const user_id = localStorage.getItem("userId");
  useEffect(() => {
    const getLikedPost = async () => {
    let LikesArray = [];
    await Axios.get('/api/users/getLiked')
    .then(response => {
        if (response.data.success) {
          console.log(response.data.liked);
          // setLikes(response.data.liked);
          LikesArray = response.data.liked;
        } else {
            alert('Failed to get liked post list')
        }
    })
    
    console.log(LikesArray);
    LikesArray.forEach((postId) => {
      console.log(postId)
      Axios.post('/api/post/likedlist', {postId})
      .then(response => {
      if (response.data.success) {
        console.log(response.data.postInfo);
        setPosts(prev => {
          console.log(prev)
          return [...prev, response.data.postInfo]
      })
      } else {
          alert('Failed to get liked post')
      }
      })

    })

    } 
    
    getLikedPost();


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
          <Meta 
            title={post.title} 
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            description={`$${post.price}`} 
          />
          <Icon type="heart" />
        </Card>
      </Col>
    );
  });

  return (
      
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          {" "}
          Liked Posts <Icon type="rocket" />{" "}
        </h2>
      </div>

      {/* Filter  */}

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
          <h2>jjj</h2>
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

export default LandingPage;