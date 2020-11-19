import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Icon, Col, Card, Row, Avatar } from "antd";

import ImageSlider from "../../utils/ImageSlider";


const { Meta } = Card;

function LandingPage() {
  const [Posts, setPosts] = useState([]);
  const [Follows, setFollows] = useState([]);


    let ppp = [];

  const user_id = localStorage.getItem("userId");
  useEffect(() => {


    let followsArray = [];

    const getFollow = async () => {
        await Axios.post("/api/post/getfollows", {user_id}).then((response) => {
            if (response.data.success) {
              followsArray = response.data.follows;
              console.log(followsArray)
            // for(let i = 0; i < followsArray.length; ++i) {
            //     setFollows([...Follows, followsArray[i].userTo])
            // }
            } else {
              alert("Failed to fectch post datas");
            }
          });
          followsArray.forEach((follow) => {
              let variable = {
                  user_id: follow.userTo
              }
            Axios.post("/api/post/newsfeed", variable).then((response) => {
            if (response.data.success) {
                console.log(response.data);
                // setPosts([...Posts, response.data.posts]);
            setPosts(prev => {
                    console.log(prev)
                    return [...prev, response.data.posts]
                })
            }else {
                            alert("Failed to fectch post datas");
                          }
        })
            // setFollows((prev) =>{
            //    return [...prev, follow.userTo]
            // });
            // console.log(follow.userTo);
            // setFollows([...Follows, follow.userTo]);
        })

        // for(var i = 0; i<followsArray.length; i++) {
        //     Axios.post("/api/post/mypost", {user_id: followsArray[i].userTo}).then((response) => {
        //         if (response.data.success) {
        //             console.log(response.data.posts);
        //             return setPosts([...Posts, response.data.posts]);
        //             // ppp.push(response.data.posts);
        //         }else {
        //                         alert("Failed to fectch post datas");
        //                       }
        //     })
        // }

    }

    getFollow();

      //   followsId.push(follow.userTo);
      // setFollows([...Follows, ...follow.userTo])
    // followsId.map(async (user_id) => {
    //     await Axios.post("/api/post/mypost", {user_id}).then((response) => {
    //         if (response.data.success) {
    //             console.log(response);
    //             // setPosts((prev) => {
    //             //     prev.push(response.data.posts);
    //             //     console.log(Posts);
    //             // });
    //             setPosts(prev => {
    //                 console.log(prev)
    //                 return [...prev, response.data.posts]
    //             })
    //           } else {
    //             alert("Failed to fectch post datas");
    //           }
    //         });
    // })

  }, []);






  const renderCards = Posts.flat().map((post, index) => {
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
          Let's OOTD <Icon type="rocket" />{" "}
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
          <h2>{Follows}</h2>
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