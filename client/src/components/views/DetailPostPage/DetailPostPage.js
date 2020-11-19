import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col, Card } from "antd";
import PostImage from "./Sections/PostImage";
import PostInfo from "./Sections/PostInfo";
import { addToCart } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

const { Meta } = Card;

function DetailPostPage(props) {
  const dispatch = useDispatch();
  const postId = props.match.params.postId;
  const [Post, setPost] = useState([]);
  const [Author, setAuthor] = useState("");
  const [AuthorId, setAuthorId] = useState("");

  useEffect(async () => {
    let authorId = null;
    await Axios.get(`/api/post/posts_by_id?id=${postId}&type=single`).then(
      (response) => {
        console.log(response.data[0].writer._id);
        authorId = response.data[0].writer._id;
        setAuthorId(response.data[0].writer._id);
        setPost(response.data[0]);
      }
    );
    Axios.post(`/api/users/userInfo`, { userId: authorId }).then((response) => {
      console.log(authorId);
      console.log(response.data);
      setAuthor(response.data.userInfo.name);
    });
    
  }, []);

  const addToCartHandler = (postId) => {
    dispatch(addToCart(postId));
    console.log(AuthorId);
  };

  return (
    <div className="postPage" style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Post.title}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <PostImage detail={Post} />

        </Col>
        <Col lg={12} xs={24}>
          <PostInfo author= {Author} addToCart={addToCartHandler} detail={Post} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailPostPage;
