import React, { useEffect, useState } from "react";
import { Button, Descriptions } from "antd";

function PostInfo(props) {
  const [Post, setPost] = useState({});

  useEffect(() => {
    setPost(props.detail);
  }, [props.detail]);

  const addToCarthandler = () => {
    props.addToCart(props.detail._id);
  };

  return (
    <div>
      
      {/* <Descriptions title="Post Info">
        <Descriptions.Item label="Price"> {Post.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{Post.sold}</Descriptions.Item>
        <Descriptions.Item label="View"> {Post.views}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {" "}
          {Post.description}
        </Descriptions.Item>
      </Descriptions> */}

      <div>
        Hello 
      </div>
    </div>
  );
}

export default PostInfo;
