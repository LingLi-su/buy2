import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import UploadPostPage from "./views/UploadPostPage/UploadPostPage";
import PostPage from "./views/PostPage/PostPage";
import CartPage from "./views/CartPage/CartPage";
import HistoryPage from "./views/HistoryPage/HistoryPage";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import DetailUserPage from "./views/DetailUserPage/DetailUserPage";
import FollowsPostPage from "./views/FollowsPostPage/FollowsPostPage"
import LikedPage from "./views/LikedPage/LikedPage";
import TestPage from "./views/TestPage/TestPage";


function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "75px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/post/upload"
            component={Auth(UploadPostPage, true)}
          />
          <Route
            exact
            path="/post/:postId"
            component={Auth(PostPage, null)}
          />
          <Route
            exact
            path="/user/likedpage"
            component={Auth(LikedPage,true)}
          />
          <Route exact path="/user/cart" component={Auth(CartPage, true)} />
          <Route exact path="/history" component={Auth(HistoryPage, true)} />
          <Route exact path="/user/posts" component={Auth(HistoryPage, true)} />
          <Route
            exact
            path="/user/myprofile"
            component={Auth(ProfilePage, true)}
          />
          <Route
            exact
            path="/user/:userId"
            component={Auth(DetailUserPage, true)}
          />
          <Route
            exact
            path="/follow/post"
            component={Auth(FollowsPostPage,true)}
          />
          <Route
            exact
            path="/test"
            component={Auth(TestPage,null)}
          />
          
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
