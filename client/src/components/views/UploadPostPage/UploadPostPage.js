import React, { useEffect, useState, useCallback }  from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import FileUpload from "../../utils/FileUpload";
import TestPage from '../TestPage/TestPage';
import { TagOutlined } from "@ant-design/icons";
import InputForm from "../TestPage/Sections/InputForm"
import Draggable, { DraggableCore } from "react-draggable";


import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" },
];

function UploadPostPage(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [PriceValue, setPriceValue] = useState();
  const [ContinentValue, setContinentValue] = useState(1);
  const [PhotoId, setPhotoId] = useState("");

  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };
  

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value);
  };

  const onContinentsSelectChange = (event) => {
    setContinentValue(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const updatePhotoId = (id) => {
    setPhotoId(id);
  }
  const onSubmit = (event) => {
    event.preventDefault();

    

    if (!TitleValue || !DescriptionValue || !PriceValue || Images.length < 1) {
      return alert("fill all the fields first!");
    }

    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      images: Images,
      photoId: PhotoId,
      continents: ContinentValue,
    };

    Axios.post("/api/post/uploadPost", variables).then((response) => {
      if (response.data.success) {
        alert("Post Successfully Uploaded");
        props.history.push("/");
      } else {
        alert("Failed to upload Post");
      }
    });
    // Axios.post("/api/users/mypost", variables).then((response) => {
    //   if (response.data.success) {
    //     alert("Post Successfully Uploaded");
    //     props.history.push("/");
    //   } else {
    //     alert("Failed to upload Post");
    //   }
    // });
    
  };

  

  


  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Upload Post</Title>
      </div>

      

      <Form>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} refreshId ={updatePhotoId}/>
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <label>Price($)</label>
        <Input onChange={onPriceChange} value={PriceValue} type="number" />
        <br />
        <br />

        <Button type ="button" onClick={onSubmit}>Submit</Button>
      </Form>

    </div>
  );
}

export default UploadPostPage;


// <TestPage photoUrl={Images[0]}/>
