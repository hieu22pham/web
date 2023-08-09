import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DoubleRightOutlined } from '@ant-design/icons';
import { AuthContext } from '../Context/AthProvider';
import { useContext } from 'react';
import "./showProductDetail.css"

function ShowProductDetail() {
  const navigate = useNavigate([]);
  const { user, product, cate, setCate } =
    React.useContext(AuthContext);

  const handleHome = () => {
    navigate("/");
  }

  const handleCategory = () => {
    // const categoryString = product.join(', ');
    // setCate(categoryString)
    // navigate(`/mobile/${categoryString}`);
    setCate(product);
    // const categoryString = product.category.join(', ');
    navigate(`/mobile/${product.category}`);
  }

  function formatCurrency(number) {
    if (number) {
      const numberString = number.toString();
      const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      const formattedCurrency = formattedNumber + 'đ';

      return formattedCurrency;
    }
  }

  const handlePay = () => {
    if (user) {
      alert("Yes")
      console.log(user)

    } else {
      navigate("/login");
      alert("No")
    }
  }

  return (
    <>
      <div className='link__category'>
        <span className="textHome" onClick={handleHome}>Trang chủ </span>
        <DoubleRightOutlined />
        <span >Điện thoại</span>
        <DoubleRightOutlined />
        <span className="textCategory" onClick={handleCategory}>{product.category}</span>
        <DoubleRightOutlined />
        <span className="textCategory" onClick={handleCategory}>{product.name}</span>
      </div>

      <div className='product__content'>
        <div className='product__content--image'>
          <img src={product.photoURL} />
        </div>
        <div className='product__content--price'>
          <h2 className='product__content--name'>{product.name}</h2>
          <span>Giá ưu đãi: {formatCurrency(product.priceOriginal)}</span>
          <div className='orderProduct'>
            <div className='inner-wrap' onClick={handlePay}>
              <div className='orderProduct--pay' >
                <h2>MUA NGAY</h2>
                <p>(Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng)</p>
              </div>
            </div>
            <div className='orderProduct--installment'>
              <div className='installment1'>
                <h2>TRẢ GÓP 0%</h2>
                <p>Trả trước chỉ từ 0đ</p>
              </div>
              <div className='installment2'>
                <h2>TRẢ GÓP QUA THẺ</h2>
                <p>(Visa, Mastercard, JCB)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowProductDetail;