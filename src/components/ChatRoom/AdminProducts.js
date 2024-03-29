import React from 'react';
import { db } from '../../firebase/config';
import { useEffect, useState, useMemo } from 'react';
import { Row, Col, Image, Space, Button, Pagination, Modal } from 'antd';
import "./productAmin.css"
import { useNavigate } from 'react-router-dom';
import { deleteDocument } from '../Login/services';
import { AuthContext } from '../Context/AthProvider';

const AdminProducts = () => {
  const messagesRef = db.collection('products');
  const [productsData, setProductsData] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const { cate, setCate } =
    React.useContext(AuthContext);

  const fetchMessagesData = () => {
    messagesRef
      .get()
      .then((querySnapshot) => {
        const products = querySnapshot.docs.map((doc) => doc.data());
        setProductsData(products); // Update state with the data
      })
      .catch((error) => {
        console.error('Error getting messages:', error);
      });
  };

  // Use useMemo to memoize the fetchMessagesData function
  const memoizedFetchMessagesData = useMemo(() => fetchMessagesData, [productsData]);

  useEffect(() => {
    // Fetch data from Firestore when the component mounts
    memoizedFetchMessagesData();
    console.log(productsData);

  }, [productsData.length]);

  function handleDeleteDoc(item) {
    setIsModalOpen(true);
    setSelectedProduct(item);
  }

  const handleOk = (item) => {
    // setCate(item);
    setLoading(true);
    deleteDocument("products", selectedProduct)
    // deleteDocument(item, selectedProduct)
    // After successful deletion, fetch data again to update the list
    memoizedFetchMessagesData();
    setLoading(false);
    setIsModalOpen(false);
    setLoading(false);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Pagination simple defaultCurrent={1} total={50} pageSize={3} />
      < div className='products__admin' >
        <Row>
          {productsData.map((item) => (

            <Col key={item.id} span="8">
              <Modal
                title="Thông báo!"
                visible={isModalOpen}
                // onOk={() => handleOk(item.category)}
                onCancel={handleCancel}
                confirmLoading={loading}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Hủy
                  </Button>,
                  <Button key="submit" type="primary" loading={loading}
                    onClick={() => handleOk(item.category)}>
                    Đồng ý
                  </Button>,
                ]}
              >
                <p>Bạn có chắc muốn xóa sản phẩm?</p>
              </Modal>
              {
                item.name &&
                <div className='products__admin__item'>
                  <div className='products__admin_name'>
                    <h3 >{item.name}</h3>
                  </div>
                  <button className='btn_delete' onClick={() => handleDeleteDoc(item.createdAt)}> Xóa</button>
                  <img src={item.photoURL} />
                </div>
              }
            </Col >
          ))}
        </Row>
      </div>
      <Pagination disabled simple defaultCurrent={2} total={50} />
    </>);
}

export default AdminProducts;