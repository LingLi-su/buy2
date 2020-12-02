import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import ImageSlider from "../../utils/ImageSlider";

const { Meta } = Card;

function LandingPage() {
  const [Posts, setPosts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();
  const [SearchTerms, setSearchTerms] = useState("");

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };

    getPosts(variables);
  }, []);

  const getPosts = (variables) => {
    Axios.post("/api/post/mypost", variables).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setPosts([...Posts, ...response.data.posts]);
        } else {
          setPosts(response.data.posts);
        }
        setPostSize(response.data.postSize);
      } else {
      }
    });
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;

    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };
    getPosts(variables);
    setSkip(skip);
  };

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
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          {" "}
          Posts{" "}
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
          <h2>No post yet...</h2>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}
      <br />
      <br />

      {
      //   PostSize >= Limit && (
      //   <div style={{ display: "flex", justifyContent: "center" }}>
      //     <button onClick={onLoadMore}>Load More</button>
      //   </div>
      // )
    }
    </div>
  );
}

export default LandingPage;
