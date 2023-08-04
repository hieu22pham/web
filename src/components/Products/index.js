import React from 'react';
// import Message from './SideBar/Message';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AthProvider';
import { Row, Col, Image, Space, Button, Avatar, Menu, Dropdown } from 'antd';
import { auth } from '../../firebase/config';
import "./styles.css"

export default function Home() {
  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthContext);

  const navigate = useNavigate([]);

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

  const handleLogo = () => {
    navigate("/");
  }

  return (
    <div>
      <header className='header'>
        {/* <Row>
          <Col span={24}> */}

        <div className="header-top">
          <h3>
            Đặt trước Galaxy Z 2023 - Nhận ưu đãi khủng đến 14 triệu</h3>
        </div>
        <div className='header-main'>

          <div className='logo'>
            <h2 onClick={handleLogo}>Logo</h2>
          </div>
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
        </div>
        {/* Sử dụng dữ liệu từ state để hiển thị */}

        {/* </Col>
        </Row> */}
      </header>

      <Row>
        <Col span={24}>
          <Outlet />
        </Col>
      </Row>
    </div >
  );
}