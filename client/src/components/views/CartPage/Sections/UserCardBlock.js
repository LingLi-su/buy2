import React from "react";

function UserCardBlock(props) {
  const renderCartImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `http://localhost:5000/${image}`;
    }
  };

  const renderItems = () =>
    props.posts &&
    props.posts.map((post) => (
      <tr key={post._id}>
        <td>
          <img
            style={{ width: "70px" }}
            alt="post"
            src={renderCartImage(post.images)}
          />
        </td>
        <td>{post.quantity} EA</td>
        <td>$ {post.price} </td>
        <td>
          <button onClick={() => props.removeItem(post._id)}>Remove </button>{" "}
        </td>
      </tr>
    ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Post Image</th>
            <th>Post Quantity</th>
            <th>Post Price</th>
            <th>Remove from Cart</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
}

export default UserCardBlock;
