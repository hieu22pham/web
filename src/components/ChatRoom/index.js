import React from 'react';
import { Row, Col } from 'antd';
import Sidebar from './SideBar';
import ChatWindow from './ChatWindow';
import Message from './SideBar/Message';
import { Outlet } from 'react-router-dom';
import { Route } from 'react-router-dom';
import AdminProducts from './AdminProducts.js';

export default function ChatRoom() {
  return (
    <div>
      <Row>
        <Col span={6}>
          <Sidebar />
        </Col>
        <Col span={18}>
          <Outlet />
        </Col>
      </Row>
    </div>
  );
}