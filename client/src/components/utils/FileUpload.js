import React, { useEffect, useState, useCallback } from "react";
import Dropzone from "react-dropzone";
import Drag from "./Drag";
import Axios from "axios";
import { CloseOutlined } from "@ant-design/icons";
import { TagOutlined } from "@ant-design/icons";
import InputForm from "../views/TestPage/Sections/InputForm"
import Draggable, { DraggableCore } from "react-draggable";
import { Typography, Button, Form, message, Input, Icon } from "antd";


function FileUpload(props) {
  const [Images, setImages] = useState([]);
  const [UrlValue, setUrlValue] = useState("");
  const [ShowTag, setShowTag] = useState(false);
  const [Tag, setTag] = useState([]);
  const [Label, setLabel] = useState([]);
  const [X, setX] = useState(null);
  const [Y, setY] = useState(null);
  const [photoId, setPhotoId] = useState("");

  const user_id = localStorage.getItem("userId");

  const onUrlChange = (event) => {
    setUrlValue(event.currentTarget.value);
  };

  
  const submitTag = (event) => {
    event.preventDefault();
    setShowTag(true);

  };

  const newForm = (event) => {
    event.preventDefault();
    console.log('cccccccccc')
    console.log(event.clientX);
    console.log(event.clientY);
      const xaxis = event.clientX;
      const yaxis = event.clientY;
  //   console.log(event.);
    console.log('cccccccccc')

    setX(event.clientX-400)
    setY(event.clientY-183)

  //   setTag([...Tag, <InputForm posX ={X} posY={Y}/>])
}

useEffect(() => {
  setTag([...Tag, <InputForm photoId= {photoId} posX ={X} posY={Y}/>])

  

}, [X,Y])

const displayForm = Tag.map((item) => {
  return item
})

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

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    //save the Image we chose inside the Node Server

    let photoName = null;
    let photoUrl = null;
    Axios.post("/api/post/uploadImage", formData, config).then((response) => {
      if (response.data.success) {
        photoName = response.data.fileName;
        photoUrl = response.data.image;
        setImages([...Images, response.data.image]);
        props.refreshFunction([...Images, response.data.image]);

        let variable = {
          writer: user_id,
          title: photoName,
          location: photoUrl
        }
        Axios.post("/api/photo/uploadPhoto", variable).then((response) => {
          if (response.data.success) {
            console.log(response.data.photoId)
            setPhotoId(response.data.photoId);
            props.refreshId(response.data.photoId);

          } else {
            alert("Failed to save the Image in Server");
          }
        });
        
      } else {
        alert("Failed to save the Image in Server");
      }
    });
    

  };

  const onDelete = (image) => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    // <div style={{ display: "flex", justifyContent: "space-between" }}>
    <div>
    
    {Images.length ? 
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
            src={`${Images[0]}`}

        
            onClick={newForm}
          >
          </img>
          {displayLabel}
         {displayForm}
        <CloseOutlined style={{position:"absolute", top:"0", right: "0", color:"red"}} onClick={() => onDelete(Images[0])}/>

        </div>
        </div>
        : null}
     
    
    

      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: "300px",
              height: "240px",
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>
    </div>
  );
}

export default FileUpload;


    // <CloseOutlined style={{position:"absolute", top:"0", color:"red"}} onClick={() => onDelete(image)}/>



    // {Images.length > 0 ? <div
    //   style={{
    //     display: "flex",
    //     width: "700px",
    //     height: "500px",
    //     overflowX: "scroll",
    //   }}
    // >

    //   {Images.map((image, index) => (
    //     <div style={{position:"relative" }}>
    //       <img
    //         className="ppp"
    //         style={{ minWidth: "300px", width: "700px", height: "500px", position:"absolute" }}
    //         // src={`http://localhost:5000/${image}`}
    //         src={`${image}`}

    //         alt={`postImg-${index}`}
    //         onClick={newForm}
    //       >
    //       </img>
    //       {displayLabel}
    //      {displayForm}
    //     </div>
    //   ))}
    // </div> : null }




    // <div style={{position:"relative" }}>
    //       <img
    //         className="ppp"
    //         style={{ minWidth: "300px", width: "700px", height: "500px", position:"absolute" }}
    //         // src={`http://localhost:5000/${image}`}
    //         src={`${Images[0]}`}

        
    //         onClick={newForm}
    //       >
    //       </img>
    //       {displayLabel}
    //      {displayForm}
    //     <CloseOutlined style={{position:"absolute", top:"0", right: "0", color:"red"}} onClick={() => onDelete(Images[0])}/>

    //     </div>
    //     </div>
    //     : null}