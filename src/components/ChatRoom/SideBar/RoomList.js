import React from 'react';
import { Collapse, Typography, Button } from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';
import { AppContext } from '../../Context/AppProvider';

export default function RoomList() {
  const { products, setIsAddRoomVisible, setSelectedRoomId } =
    React.useContext(AppContext);

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  return (
    // <Collapse ghost defaultActiveKey={['1']}>
    //   <PanelStyled header='Danh mục sản phẩm' key='1'>

    //   </PanelStyled>
    // </Collapse>
    <>
      {/* {products.map((room) => (
        <div key={room.id} onClick={() => setSelectedRoomId(room.id)}>
          {room.name}
        </div>
      ))} */}
      {/* <Button
        type='text'
        icon={<PlusSquareOutlined />}
        className='add-room'
        onClick={handleAddRoom}
      >
        Thêm sản phẩm
      </Button> */}
    </>
  );
}