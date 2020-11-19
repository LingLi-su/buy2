import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Icon, Col, Card, Row, Avatar } from "antd";
import Comments from './Sections/Comments';
import { TagOutlined } from "@ant-design/icons";
import Draggable, { DraggableCore } from "react-draggable";

import PostImage from "./Sections/PostImage";
// import PostInfo from "./Sections/PostInfo";
import { addToCart } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import './PostPage.css';

const { Meta } = Card;
function PostPage(props) {
  const dispatch = useDispatch();
  const postId = props.match.params.postId;
  const [Post, setPost] = useState([]);
  const [Author, setAuthor] = useState("");
  const [AuthorId, setAuthorId] = useState("");
  const [CommentLists, setCommentLists] = useState([])
  const [Label, setLabel] = useState([]);
  const [PhotoId, setPhotoId] = useState("");




  useEffect(async () => {
    let authorId = null;
    await Axios.get(`/api/post/posts_by_id?id=${postId}&type=single`).then(
      (response) => {
        console.log(response.data[0].writer._id);
        authorId = response.data[0].writer._id;
        setAuthorId(response.data[0].writer._id);
        setPost(response.data[0]);
        console.log('innnnnnnnnnnnn')
        console.log(response.data[0].photoId)
        console.log(response.data[0]);

        console.log('innnnnnnnnnnnn')

        setPhotoId(response.data[0].photoId);
      }
    );

    Axios.post('/api/comment/getComments', {postId})
        .then(response => {
            if (response.data.success) {
                console.log('response.data.comments',response.data.comments)
                setCommentLists(response.data.comments)
            } else {
                alert('Failed to get comment Info')
            }
        })

    Axios.post(`/api/users/userInfo`, { userId: authorId }).then((response) => {
      console.log(authorId);
      console.log(response.data);
      setAuthor(response.data.userInfo.name);
    });

  
    
  }, []);


  useEffect(()=> {
    let variable = {
      photoId: PhotoId
    }
  
  console.log('photooooooooo')
  console.log(variable)
  console.log('photooooooooo')

    Axios.post("/api/photo/getAllTag", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data.tags)
        setLabel(response.data.tags);
        console.log(Label)
      } else {
          console.log('sorry');
      }
    });
  },[PhotoId])
  const displayLabel = Label.map((item) => {
    return (
        <Draggable defaultPosition={{x: item.x, y: item.y}}>
            <div className="drag-box">
        <TagOutlined id="imhandle" />
        <a href={item.url}>Link</a>
        </div>
        </Draggable>

    //     <Draggable defaultPosition={{x: item.x, y: item.y}}>
    //     <form>
    //     <Input style ={{zIndex:"2", position:"absolute"}} value={item.url} />
    //   </form>
    //   </Draggable>
        )
  })

  const addToCartHandler = (postId) => {
    dispatch(addToCart(postId));
  };

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment))
}

  return (
    <div className="postPage"
      // style={{ width: "100%", padding: "3rem 4rem" }}
    >
      {/* <div 
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h1>{Post.title}</h1>
      </div> */}

      <br />

      {/* <Row gutter={[16, 16]}>
      </Row> */}

      {
        // <PostImage detail={Post} />
    }

    
      <div
      style={{
        width: "700px",
        height: "500px",
      }}
    >
    <div style={{position:"relative" }}>
          <img
            className="ppp"
            style={{ minWidth: "300px", width: "700px", height: "500px", position:"absolute" }}
            // src={`http://localhost:5000/${image}`}
            src={`${Post.images}`}

        
          >
          </img>
          {displayLabel}

        </div>
        </div>
    


      <div class="card">
        <div class="container">
          <h4 className="cardTopic"><b>Creator Name</b></h4> 
          <Meta 
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          />
          <a href={`/user/${AuthorId}`}>        {Author}

</a> 
        </div>
      </div>
      <div class="card">
        <div class="container">
          <h4><b>tags</b></h4> 
          <h4><b>tags</b></h4> 
          <h4><b>tags</b></h4> 
        </div>
      </div>
      <div class="card">
        <div class="container">
          <h4><b>relevant tags</b></h4> 
        </div>
      </div>
      <Comments CommentLists = {CommentLists} postId = {Post._id} refreshFunction={updateComment}/>

        {/* <PostInfo addToCart={addToCartHandler} detail={Post} /> */}
        {/* <Descriptions.Item label="Description">
          {" "}
          <h1>topic</h1>
          {Post.description}
        </Descriptions.Item> */}
    </div>
  );
}

export default PostPage;
