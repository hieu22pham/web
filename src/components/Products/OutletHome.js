import { Row, Col, Image, Space, Button, Avatar, Menu, Badge } from 'antd';
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AthProvider';
import SlideImageHome from './SlideImageHome';
import { db } from '../../firebase/config';
import {
  UserOutlined,
  MobileOutlined,
  CheckOutlined,
  HighlightOutlined,
  PlusSquareOutlined
} from "@ant-design/icons"
import { AppContext } from '../Context/AppProvider';

function OutletHome() {
  const { products, setIsAddRoomVisible, setSelectedRoomId } =
    React.useContext(AppContext);
  const { categories, setCategories, cate, setCate } =
    React.useContext(AuthContext);
  const handleCategoryClick = (item) => {
    setCate(item);
    console.log(cate)
  };

  const navigate = useNavigate([]);

  const [productData, setProductData] = useState([]);

  const items = [
    {
      label: "Điện thoại",
      icon: <MobileOutlined style={{ fontSize: '24px' }} />,
      key: "menu-1",
      children: [
        // {
        //   label: <Link to="/">Tất cả sản phẩm</Link>,
        //   key: "/",
        // },
        // <Button
        //   type='text'
        //   icon={<PlusSquareOutlined />}
        //   className='add-room'
        //   onClick={handleAddRoom}
        // >
        //   Thêm sản phẩm
        // </Button>
        ,
        ...categories.map((item) => (
          item.category &&
          {
            label:
              <Link to={`/mobile/${item?.category}`} onClick={() => handleCategoryClick(item)}>
                {item.category}
              </Link >,
            key: `/mobile/:${item.category}`,
          }))
        ,
      ]
    },
    {
      label: "Laptop",
      icon: <CheckOutlined />,
      key: "menu-2",
      children: [
      ]
    },
    {
      label: "Âm thanh",
      icon: <HighlightOutlined />,
      key: "menu-3",
    },
  ];

  // useEffect(() => {
  //   const fetchAllCategories = async () => {
  //     const allProductData = [];
  //     for (const category of categories) {
  //       if (category.category && category.category !== "") {
  //         const messagesRef = db.collection(category.category);
  //         messagesRef
  //           .get()
  //           .then((querySnapshot) => {
  //             const products = querySnapshot.docs.map((doc) => doc.data());
  //             allProductData.push(...products);
  //             // setProductData(allProductData);
  //           })
  //           .catch((error) => {
  //             console.error('Error getting messages:', error);
  //           });
  //       }
  //       setProductData(allProductData);
  //     }

  //   }

  //   fetchAllCategories();
  // }, [categories.category]); // Fetch data whenever categories change

  const fetchAllCategories = async () => {

    const allProductData = [];
    for (const category of categories) {
      if (category.category && category.category !== "") {
        const messagesRef = db.collection(category.category);
        try {
          const querySnapshot = await messagesRef.get();
          const productsData = querySnapshot.docs.map((doc) => doc.data());
          allProductData.push(...productsData);
        } catch (error) {
          console.error('Error getting messages:', error);
        }
      }
    }
    setProductData(allProductData);
  };

  useEffect(() => {
    fetchAllCategories();

    console.log(productData)
  }, [categories]); // Chỉ gọi fetchAllC

  const navigatePage = (item) => {
    setCate(item)
    navigate(`/mobile/${item.category}`)
  }

  function formatCurrency(number) {
    const numberString = number.toString();
    // Bước 1: Sử dụng hàm toLocaleString để thêm dấu phân cách hàng nghìn
    const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Bước 2: Thêm ký tự 'đ' vào cuối
    const formattedCurrency = formattedNumber + 'đ';

    return formattedCurrency;
  }

  return (
    <>
      <div className='inner-wrap'>
        <div className='container'>
          <Menu theme="light" mode="vertical" items={items} defaultSelectedKeys={["/"]} />
          <SlideImageHome />
        </div>
      </div>

      <div className='category__main'>
        <div className='inner-wrap'>
          <div className='container'>
            <h1>Sản phẩm nổi bật</h1>
            <div className='allCate--main'>
              {
                categories.map((item) => (
                  item.category &&
                  <Button className='category__main--item' onClick={() => navigatePage(item)}><span>{item.category}</span></Button>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      <div className='products__main'>
        <div className='container'>
          {productData.map((item) => (
            item.name && item.photoURL &&

            <div className='products__main--item '>
              <Badge.Ribbon className='badge'
                text={`Giảm ${((item.priceOriginal - item.priceDiscount) / item.priceOriginal * 100).toFixed(0)}%`}
                color="red"
              >
                <img className='image__product--main' src={item.photoURL} />
                <h3>{item.name}</h3>
                <div className='price'>
                  <span className='priceDiscount'><strong>{formatCurrency(item.priceDiscount)}</strong></span>
                  <span className='priceOriginal'><strong>{formatCurrency(item.priceOriginal)}</strong></span>
                </div>
              </Badge.Ribbon>
            </div >
          ))}
        </div >
      </div >
    </>
  )
}

export default OutletHome;

