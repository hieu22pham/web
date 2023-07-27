import React from 'react';
import { Row, Col } from 'antd';
import UserInfo from './SideBar/inforUser';
import RoomList from './SideBar/RoomList';
import styled from 'styled-components';


export default function Sidebar() {
  return (
    <Row>
      <Col span={24}>
        <UserInfo />
      </Col>
      <Col span={24}>
        <RoomList />
      </Col>
    </Row>
  );
}