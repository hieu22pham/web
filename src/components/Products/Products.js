import { UserAddOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Image, Space, Button, Avatar, Menu, Dropdown } from 'antd';
import "./styles.css"
import { auth } from '../../firebase/config';
import { AuthContext } from '../Context/AthProvider';
import AppContext from 'antd/es/app/context';
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { deleteDocument } from '../Login/services';
import {
  UserOutlined,
  PlayCircleOutlined,
  CheckOutlined,
  HighlightOutlined,
  PlusSquareOutlined
} from "@ant-design/icons"

export default function Products() {
  const { products, setIsAddRoomVisible, setSelectedRoomId } =
    React.useContext(AppContext);
  const { categories, setCategories, cate, setCate } =
    React.useContext(AuthContext);

  const navigate = useNavigate([]);
  const [messagesData, setMessagesData] = useState([]);
  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthContext);
  const handleAddCategories = () => {
    setIsAddRoomVisible(true);
  };

  const handleCategoryClick = (item) => {
    setCate(item);
  };

  useEffect(() => {
    const messagesRef = db.collection('products');

    messagesRef
      .get()
      .then((querySnapshot) => {
        const messagesData = querySnapshot.docs.map((doc) => doc.data());
        setMessagesData(messagesData);
      })
      .catch((error) => {
        console.error('Error getting messages:', error);
      });
  }, []);
  console.log(displayName);

  const handleLogout = () => {
    if (displayName) {
      auth
        .signOut()
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error('Error signing out:', error);
        });
    }
    console.log(displayName);
  };

  const handleLogin = () => {
    navigate('/login');
  }

  const handleMenuClick = (e) => {
    if (e.key === 'profile') {
    } else if (e.key === 'settings') {
    } else if (e.key === 'logout') {
      handleLogout();
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">Thông tin cá nhân</Menu.Item>
      <Menu.Item key="settings">Cài đặt</Menu.Item>
      <Menu.Item key="logout">Đăng xuất</Menu.Item>
    </Menu>
  );

  return (
    <>
      < div className='products' >
        <Row>
          {messagesData.map((item) => (
            <Col key={item.id} span="8">
              <div className='products__item'>
                <div className='products_name'>
                  <h3 >{item.name}</h3>
                </div>

                <Image
                  width={300}
                  height={300}
                  src={item.photoURL}
                  style={{ objectFit: "cover" }}
                  preview={{
                    toolbarRender: (
                      _,
                      {
                        transform: { scale },
                        actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                      },
                    ) => (
                      <Space size={0} className="toolbar-wrapper">
                      </Space>),
                  }}
                />


              </div>
            </Col >
          ))}
        </Row>
      </div >
    </>
  )
}
