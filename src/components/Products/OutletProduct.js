import { UserAddOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Row, Col, Image, Space, Button, Avatar, Menu, Dropdown, Badge } from 'antd';
import "./styles.css"
import { auth } from '../../firebase/config';
import { AuthContext } from '../Context/AthProvider';
import AppContext from 'antd/es/app/context';
import { db } from '../../firebase/config';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const currentPath = location.pathname;
  const pathParts = currentPath.split('/'); // Tách path thành các phần
  const lastPathPart = pathParts[pathParts.length - 1];

  const [productsCate, setProductsCate] = useState([]);
  const { products, setIsAddRoomVisible, setSelectedRoomId } =
    React.useContext(AppContext);
  const { categories, setCategories, cate, setCate, product, setProduct, setTextProduct } =
    React.useContext(AuthContext);



  var messagesRef;
  if (cate.category) {
    messagesRef = db.collection(cate.category);
  }
  if (lastPathPart && !cate.category) {
    messagesRef = db.collection(lastPathPart);
  }
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
    fetchMessagesData();
    console.log(productsCate)
  }, [cate.category]);

  const handleHome = () => {
    navigate("/");
  }

  const handleShowProductDetail = (item) => {
    var formatted_string = item.name.replace(/ /g, "-");
    if (formatted_string.charAt(formatted_string.length - 1) === "-") {
      const new_formatted_string = formatted_string.slice(0, -1);
      setCate("")
      setProduct(item)
      setTextProduct(new_formatted_string);
      // console.log(new_formatted_string);
      navigate(`/${new_formatted_string}`);
    } else {
      setCate("")
      setTextProduct(formatted_string);
      setProduct(item)
      // console.log(formatted_string);
      navigate(`/${formatted_string}`);
    }
  }

  const handleCategory = () => {
    if (cate.category) {
      navigate(`/mobile/${cate.category}`);
    } else {
      navigate(`/mobile/${lastPathPart}`);
    }
  }

  function formatCurrency(number) {

    const numberString = number.toString();
    const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const formattedCurrency = formattedNumber + 'đ';

    return formattedCurrency;
  }

  return (
    <>
      <div className='link__category'>
        <span className="textHome" onClick={handleHome}>Trang chủ </span>
        <DoubleRightOutlined />
        <span >Điện thoại</span>
        <DoubleRightOutlined />
        {cate.category ?
          <span className="textCategory" onClick={handleCategory}>{cate.category}</span>
          :
          <span className="textCategory" onClick={handleCategory}>{lastPathPart}</span>
        }
      </div>
      <div className='product'>
        <div className='container'>
          {productsCate.map((item) => (
            item.title && item.photoURL &&

            <div className='product_item ' onClick={() => handleShowProductDetail(item)}>
              <Badge.Ribbon className='badge'
                text={`Giảm ${((item.priceOriginal - item.priceDiscount) / item.priceOriginal * 100).toFixed(0)}%`}
                color="red"
              >
                <img className='image__product' src={item.photoURL} />
                <h3>{item.title}</h3>
                <div className='price'>
                  <span className='priceDiscount'><strong>{formatCurrency(item.priceDiscount)}</strong></span>
                  <span className='priceOriginal'><strong>{formatCurrency(item.priceOriginal)}</strong></span>
                </div>
              </Badge.Ribbon>
            </div >
          ))}
        </div>
      </div>
    </>
  )
}

export default OutletProduct;
