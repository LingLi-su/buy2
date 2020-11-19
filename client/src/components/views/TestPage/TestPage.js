import React, { useEffect, useState, useCallback } from "react";
import ImageMapper from 'react-image-mapper';
import { TagOutlined } from "@ant-design/icons";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import InputForm from "./Sections/InputForm";
import Draggable, { DraggableCore } from "react-draggable";
import { relative } from "path";
import Axios from 'axios'



function TestPage(props) {
    const [query, setQuery] = useState(1);
    const [UrlValue, setUrlValue] = useState("");
    const [ShowTag, setShowTag] = useState(false);
    const [Tag, setTag] = useState([]);
    const [Label, setLabel] = useState([]);
    const [X, setX] = useState(null);
    const [Y, setY] = useState(null);


  const [mapAreas, setMapAreas] = useState({
    name: "my-map",
    areas: [
      { id: 5, shape: "circle", coords: [170, 100, 5], preFillColor: 'rgba(52, 52, 52, alpha)', href:'google.com'} 
    ]
  });

  const onUrlChange = (event) => {
    setUrlValue(event.currentTarget.value);
  };

  const afterClick = evt => 
  updateMapArea(5, [evt.nativeEvent.layerX, evt.nativeEvent.layerY, 5]);

  const handleUpdateMapArea = useCallback(
    evt => {
        console.log(evt)
  updateMapArea(5, [evt.nativeEvent.layerX, evt.nativeEvent.layerY, 5])
},[]
  );


  const updateMapArea = (id, coords) => {
    console.log(coords)
    const areas = mapAreas.areas.map(item =>
      item.id === id ? { ...item, coords } : item
    );
    setMapAreas({
      name: mapAreas.name,
      areas
    });
  };


  const submitTag = (event) => {
    event.preventDefault();
    setShowTag(true);
  };

  useEffect(() => {
    setQuery(Math.random());
  }, [mapAreas]);
  
  const newForm = (event) => {
      event.preventDefault();
      console.log('cccccccccc')
      console.log(event.clientX);
      console.log(event.clientY);
        const xaxis = event.clientX;
        const yaxis = event.clientY;
    //   console.log(event.);
      console.log('cccccccccc')

      setX(event.pageX)
      setY(event.pageY-78)

    //   setTag([...Tag, <InputForm posX ={X} posY={Y}/>])
  }

  useEffect(() => {
    setTag([...Tag, <InputForm posX ={X} posY={Y}/>])

    let variable = {
        photoId: '5fa32135fea544456b39d8be'
    }

  }, [X,Y])

  useEffect(() => {
    let variable = {
        photoId: '5fa32135fea544456b39d8be'
    }
    Axios.post("/api/photo/getAllTag", variable).then((response) => {
        if (response.data.success) {
          console.log(response.data.tags)
          setLabel(response.data.tags);
          console.log(Label)
        } else {
            console.log('sorry');
        }
      });
  },[])

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

    return (
        <div>
        
        <div style ={{position:"relative", width: "400px",
        height: "200px"}}>
        <img style ={{position:"absolute", width: "700px",
        height: "400px", top: "0", left: "0"}} onClick={newForm} src={`https://buykitlist-media.s3.amazonaws.com/1604526388127_france.jpg`}>
            
         </img>
         {displayLabel}
         {displayForm}

         </div>

            

            

        </div>
    )
}

export default TestPage

// <button onClick={newForm}>aaaaaaaaaaa</button>


// {ShowTag ?
                
//     <div className="drag-box">
// <TagOutlined id="imhandle" />
// <a href={UrlValue}>Link</a>
// </div>
// :
// <form onSubmit={submitTag}>
// <Input onChange={onUrlChange} value={UrlValue} />
// </form>
// }





// <ImageMapper
//               src={`https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg?&q=${query}`}
//               //onClick={area => getTipPosition(area)}
//               onImageClick={handleUpdateMapArea}
//               map={mapAreas}
//               width={500}
//               onClick={newForm}
//             />