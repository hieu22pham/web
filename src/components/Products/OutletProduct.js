import { UserAddOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Row, Col, Image, Space, Button, Avatar, Menu, Dropdown } from 'antd';
import "./styles.css"
import { auth } from '../../firebase/config';
import { AuthContext } from '../Context/AthProvider';
import AppContext from 'antd/es/app/context';
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { deleteDocument } from '../Login/services';
import { DoubleRightOutlined } from '@ant-design/icons';
import "./outletProduct.css"

import {
  UserOutlined,
  PlayCircleOutlined,
  CheckOutlined,
  HighlightOutlined,
  PlusSquareOutlined
} from "@ant-design/icons"


// Import thêm useEffect nếu bạn chưa import

// ...
// const WrapperStyled = styled.div`
//   height: 100vh;
// `;

function OutletProduct() {
  const [productsCate, setProductsCate] = useState([]);
  const { products, setIsAddRoomVisible, setSelectedRoomId } =
    React.useContext(AppContext);
  const { categories, setCategories, cate, setCate } =
    React.useContext(AuthContext);

  var messagesRef;
  if (cate.category) {
    messagesRef = db.collection(cate.category);
  }

  console.log(cate.category)


  const navigate = useNavigate([]);
  const [messagesData, setMessagesData] = useState([]);
  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthContext);
  const handleAddCategories = () => {
    setIsAddRoomVisible(true);
    // this.forceUpdate();
  };

  const fetchMessagesData = () => {
    if (messagesRef) {
      messagesRef
        .get()
        .then((querySnapshot) => {
          const productsData = querySnapshot.docs.map((doc) => doc.data());
          setProductsCate(productsData); // Update state with the data
        })
        .catch((error) => {
          console.error('Error getting messages:', error);
        });
    }
  };

  const memoizedFetchMessagesData = useMemo(() => fetchMessagesData, [productsCate]);

  useEffect(() => {
    // Fetch data from Firestore when the component mounts
    fetchMessagesData();
    console.log(productsCate)
  }, [cate.category]);

  const handleHome = () => {
    navigate("/");
  }

  const handleShowProductDetail = () => {
    navigate("/");
  }

  const handleCategory = () => {
    navigate(`/mobile/${cate?.category}`);
  }

  return (
    <>
      <div className='link__category'>
        <span className="textHome" onClick={handleHome}>Trang chủ </span>
        <DoubleRightOutlined />
        <span >Điện thoại</span>
        <DoubleRightOutlined />
        <span className="textCategory" onClick={handleCategory}>{cate.category}</span>

      </div>
      <div className='product'>
        {productsCate.map((item) => (
          <div key={item.id} >
            {
              item.name && (
                <div className='product_item' onClick={handleShowProductDetail}>
                  <div className='product_name'>
                    <h3>{item.name}</h3>
                  </div>
                  <div className='product_image'>
                    <img src={item.photoURL} alt="Anh" />
                  </div>
                </div>
              )
            }
          </div>
        ))}
      </div>
    </>
  )
}

export default OutletProduct;
