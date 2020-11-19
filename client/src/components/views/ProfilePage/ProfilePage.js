import React, { useEffect, useState } from "react";
import { YoutubeOutlined, InstagramOutlined, TwitterOutlined, ShareAltOutlined } from '@ant-design/icons';
import axios from "axios";
import MyPostPage from "../MyPostPage/MyPostPage";
import './ProfilePage.css';

function ProfilePage(props) {
  const [UserObj, setUserObj] = useState({});
  const [Name, setName] = useState("");
  let userId = localStorage.getItem("userId");
  console.log("kkkkkk");


  useEffect(() => {
    axios.post("/api/users/userInfo", { userId }).then((response) => {
      if (response.data.success) {
        // setName(response.data.userInfo.name);
        console.log(response.data.userInfo);
        setUserObj(response.data.userInfo);
        setName(response.data.userInfo.name);
      } else {
        alert("nooooooo");
      }
      console.log(userId);
    });
  }, []);
  return <div>
    <div className='creatorIntro' >
    <h1
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    Hello {Name}
  </h1>
                {/* {!this.state.cutFile && this.state.profile.preview && */}
                    <div className='creatorIntroChangeBG'>
                        {/* <div onClick={this.uploadBG}> */}
                          <span>Upload</span>
                        {/* </div> */}
                    </div>
                  {/* } */}
                <div className='creatorIntroContainer'>
                    <div className='creatorIntroLeft'>
                        {/* <img className="creatorIntroPic" src={this.props.photo ? this.props.photo : "https://www.w3schools.com/howto/img_avatar.png"} alt="Avatar"></img> */}
                    </div>
                    <div className='creatorIntroRight'>

                        <div className="creatorIntroTitle">
                            {/* {this.props.nameTag} */}
                            <div className="creatorIntroName">
                                {/* {this.props.planetName} */}
                                planet name
                            </div>
                            {/* <div className="creatorIntroName">
                                    @{this.props.creatorName}
                                </div> */}
                            <div className="creatorIntroTags">
                                {/* {this.props.category&&<div>{this.props.category}</div>} */}
                                <div 
                                  className="planetShareButton" style={{ padding: '0 10px', cursor: 'pointer', display: 'inline-block' }} 
                                  // onClick={this.shareFuc}
                                >
                                </div>
                            </div>

                        </div>

                        <div className="creatorIntroSns">
                            <span>@xiuyan</span>
                            {/* <YoutubeOutlined />
                            <InstagramOutlined />
                            <TwitterOutlined /> */}
                        </div>
                        {/* <div className="creatorTag">Fashion</div> */}

                        {/* {this.state.followers ? */}
                            <div className="creatorIntroFollowingPlanets">
                                <span>
                                {/* {this.props.followers}  */}
                                Following Planets | 0 Online
                                </span>
                            </div> : <div></div>
                          {/* } */}

                        <div className="creatorIntroDescription">
                            {/* {this.props.description ? this.props.description.substring(0, 17) + '...' : "The best is yet to come.."} */}
                            {/* <span onClick={this.showDetailHandler}>
                              Expand
                              </span> */}
                        </div>
                    </div>
                </div>
                {/* <DialogOverlay className='creatorIntroDetailBG'
                    isOpen={this.state.showDetail}
                    onDismiss={this.showDetailHandler}
                    style={{ top: '72px', height: document.body.offsetHeight - 72 + 'px' }}
                >
                    <DialogContent aria-label='creatorIntro'>
                        <CreatorIntroDetailComponent {...this.props}
                            share={this.shareFuc}
                            hide={this.showDetailHandler}
                        />
                    </DialogContent>
                </DialogOverlay> */}
                {/* <DialogOverlay className='creatorIntroDetailBG'
                    isOpen={this.state.showShare}
                    onDismiss={this.hideShare}
                    style={{ top: '72px', height: document.body.offsetHeight - 72 + 'px' }}
                >
                    <DialogContent aria-label='creatorIntro'>
                        <div className='creatorIntroContainer'style={{top: '300px'}}>
                            <div className='creatorIntroLeft'>
                                <img className="creatorIntroPic" src={this.props.photo?this.props.photo:"https://www.w3schools.com/howto/img_avatar.png"} alt="Avatar"></img>
                            </div>
                            <div className='creatorIntroRight'>
                                <div className="planetShareLink">{window.location.href}</div>
                                <div className="planetShareButtonText" style={{textAlign: 'center', marginTop: '30px'}}>
                                    <CopyToClipboard text={window.location.href}>
                                        <button className="planetShareButtonIn"   type='button' onClick={()=>{this.props.alert.show('copied to clipboard');console.log(1)}}>
                                            Share to your friend
                                        </button>
                                    </CopyToClipboard>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </DialogOverlay> */}

                <MyPostPage />

            </div>
  </div>;
}

export default ProfilePage;
