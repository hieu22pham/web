import { UserAddOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Image, Space, Button, Avatar, Menu, Dropdown } from 'antd';
import "./styles.css"
import { auth } from '../../firebase/config';
import { AuthContext } from '../Context/AthProvider';
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { deleteDocument } from '../Login/services';

// Import thêm useEffect nếu bạn chưa import

// ...
// const WrapperStyled = styled.div`
//   height: 100vh;
// `;

export default function Products() {
  const navigate = useNavigate([]);
  const [messagesData, setMessagesData] = useState([]);
  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthContext);

  useEffect(() => {
    const messagesRef = db.collection('products');

    messagesRef
      .get()
      .then((querySnapshot) => {
        const messagesData = querySnapshot.docs.map((doc) => doc.data());
        setMessagesData(messagesData); // Lưu trữ dữ liệu vào state
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
      // Xử lý khi người dùng chọn "Thông tin cá nhân"
    } else if (e.key === 'settings') {
      // Xử lý khi người dùng chọn "Cài đặt"
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
      <div className='account__info'>
        {displayName ?
          <Dropdown overlay={menu} trigger={['click']}>
            <Avatar size="large" className='account__avatar' src={photoURL}>
              {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
            </Avatar>
          </Dropdown>
          : <Button className='button__login' type='text' onClick={handleLogin}>Đăng nhập</Button>}
        {/* {displayName ? (
          <Button >
            Đăng xuất
          </Button>

        ) : (
          <Button onClick={handleLogin}>
            Đăng nhập
          </Button >
        )
        } */}
      </div>
      {/* Sử dụng dữ liệu từ state để hiển thị */}
      < div className='products' >
        <Row>
          {messagesData.map((item) => (
            <Col key={item.id} span="6">
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
