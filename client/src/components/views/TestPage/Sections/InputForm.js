import React, { useEffect, useState, useCallback } from "react";
import { TagOutlined } from "@ant-design/icons";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Draggable, { DraggableCore } from "react-draggable";
import Axios from 'axios'


function InputForm(props) {

    const [UrlValue, setUrlValue] = useState("http://");
    const [ShowTag, setShowTag] = useState(false);
    const [activeDrags, setActiveDrags] = useState(0);

    useEffect(() => {

        console.log(props)
    },[props.posX, props.posY]);
    const onStart = () => {
        setActiveDrags((prevState) => ++prevState);
      };
    
     const onStop = () => {
        setActiveDrags((prevState) => --prevState);
      };

    const onUrlChange = (event) => {
        setUrlValue(event.currentTarget.value);
      };

      const submitTag = (event) => {
        event.preventDefault();
        setShowTag(true);
        let variable = {
            photoId: props.photoId,
            x: props.posX,
            y: props.posY,
            url: UrlValue,
        }
        Axios.post("/api/photo/uploadTag", variable).then((response) => {
            if (response.data.success) {
              console.log("Tag Successfully Uploaded");
            } else {
              console.log("Failed to upload tag");
            }
          });

      };
    //   const dragHandlers = {onStart: onStart, onStop: onStop};
    console.log('bbbbbbbbbb')
    console.log(props.posX);
    console.log(props.posY);
    console.log('bbbbbbbbbb')

    return (
        
        

        
        (props.posX && props.posY) ?
        <span>

        {ShowTag ?
            <Draggable style ={{width:'1px'}}handle="#imhandle">
            <div className="drag-box">
        <TagOutlined id="imhandle" />
        <a href={UrlValue}>Link</a>
      </div>
      </Draggable>
        :
        <Draggable defaultPosition={{x: props.posX, y: props.posY}}>
        <form onSubmit={submitTag}>
        <Input style ={{zIndex:"2", position:"absolute", width:"100px"}} onChange={onUrlChange} value={UrlValue} />
      </form>
      </Draggable>

        }
        </span>

        : null
    )
}

export default InputForm




// {ShowTag ?
                
//     <div className="drag-box">
// <TagOutlined id="imhandle" />
// <a href={UrlValue}>Link</a>
// </div>
// :
// <form onSubmit={submitTag}>
// <Input style ={{zIndex:"2"}} onChange={onUrlChange} value={UrlValue} />
// </form>
// }