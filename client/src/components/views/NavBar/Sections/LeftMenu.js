import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">Home</a>
      </Menu.Item>
      <SubMenu title={<span>Menu</span>}>
        <MenuItemGroup>
          <Menu.Item key="profile">
            <Link to="/user/myprofile">My Profile</Link>
          </Menu.Item>
          <Menu.Item key="mypost">
            <Link to="/user/mypost">My Posts</Link>
          </Menu.Item>
          <Menu.Item key="newsfeed">
            <Link to="/follow/post">Newsfeed</Link>
          </Menu.Item>
          <Menu.Item key="likedpost">
            <Link to="/user/likedpage">Liked Post</Link>
          </Menu.Item>
          <Menu.Item key="test">
          <Link to="/test">test</Link>
          </Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  );
}

export default LeftMenu;
