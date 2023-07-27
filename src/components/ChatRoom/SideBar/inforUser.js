import React, { useEffect } from 'react';
import { Button, Avatar, Typography, Menu } from 'antd';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';
import {
  UserOutlined,
  PlayCircleOutlined,
  CheckOutlined,
  HighlightOutlined,
} from "@ant-design/icons"

import { auth } from '../../../firebase/config';
import { AuthContext } from '../../Context/AthProvider';
import { AppContext } from '../../Context/AppProvider';


export default function UserInfo() {
  const { products, setIsAddRoomVisible, setSelectedRoomId } =
    React.useContext(AppContext);

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
    // this.forceUpdate();
  };

  // useEffect(() => {
  //   products = products
  //   // You can perform other actions here based on the updated 'products' state
  // }, [products]);

  const items = [
    {
      label: <Link to="/list-room">Trang chủ</Link>,
      icon: <HighlightOutlined />,
      key: "/admin",
    },
    {
      label: "Danh mục sản phẩm",
      icon: <PlayCircleOutlined />,
      key: "menu-1",
      children: [
        {
          label: <Link to="/admin/products">Xem tất cả</Link>,
          key: "/admin/products",
        },
        // <Button
        //   type='text'
        //   icon={<PlusSquareOutlined />}
        //   className='add-room'
        //   onClick={handleAddRoom}
        // >
        //   Thêm sản phẩm
        // </Button>
        {
          label: <Button
            type='text'
            icon={<PlusSquareOutlined />}
            className='add-room'
            onClick={handleAddRoom}
          >
            Thêm sản phẩm
          </Button>,
          key: "/admin/a",
        },
        // {
        //   label: <Link to="/admin/b">SamSung</Link>,
        //   key: "/admin/",
        // },
        // {
        //   label: <Link to="/c">Oppo</Link>,
        //   key: "/c",
        // }
      ]
    },
    {
      label: "Menu 2",
      icon: <CheckOutlined />,
      key: "menu-2",
      children: [

        {
          label: <Link to="/">Dashboard</Link>,
          key: "menu-2-1",
        },
        {
          label: <Link to="/">Dashboard</Link>,
          key: "menu-2-2",
        },
        {
          label: <Link to="/">Dashboard</Link>,
          key: "menu-2-3",
        }
      ]
    },
    {
      label: "Menu 3",
      icon: <HighlightOutlined />,
      key: "menu-3",
    }, {
      label: <Link to="/create-room">Tạo phòng</Link>,
      icon: <HighlightOutlined />,
      key: "/create-room",
    },
    {
      label: <Link to="/book-room">Đặt phòng</Link>,
      icon: <HighlightOutlined />,
      key: "/book-room",
    }, {
      label: <Link to="/list-room">Danh sách phòng</Link>,
      icon: <HighlightOutlined />,
      key: "/list-room",
    },
  ];

  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthContext);
  // const { clearState } = React.useContext(AppContext);

  return (
    <div style={{ width: 256 }}>
      <div>
        <Avatar src={photoURL}>
          {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className='username'>{displayName}</Typography.Text>
      </div>
      <Button
        ghost
        onClick={() => {
          // clear state in App Provider when logout
          // clearState();
          auth.signOut();
        }}
      >
        Đăng xuất
      </Button>
      <Menu theme="light" mode="inline" items={items} defaultSelectedKeys={["/"]} defaultOpenKeys={["menu-1"]} />
    </div >

    // <WrapperStyled>
    // <div>
    //   <Avatar src={photoURL}>
    //     {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
    //   </Avatar>
    //   <Typography.Text className='username'>{displayName}</Typography.Text>
    // </div>
    // <Button
    //   ghost
    //   onClick={() => {
    //     // clear state in App Provider when logout
    //     // clearState();
    //     auth.signOut();
    //   }}
    // >
    //   Đăng xuất
    // </Button>
    // </WrapperStyled>
  );
}