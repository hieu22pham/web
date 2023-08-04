import React from 'react';
import { db } from '../../firebase/config';
import { useEffect, useState, useMemo } from 'react';
import { Row, Col, Image, Space, Button, Pagination, Modal, Form, Input } from 'antd';
import "./productAmin.css"
import { useNavigate } from 'react-router-dom';
import { deleteDocument } from '../Login/services';
import { addDocument } from '../Login/services';
import "./slideImage.css"

const AdminProducts = () => {
  const [form] = Form.useForm();
  const messagesRef = db.collection('SlideImage');
  const [productsData, setProductsData] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [isAddProductVisible, setIsAddProductVisible] = useState([]);

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

  const handleOkDelete = () => {
    setLoading(true);
    deleteDocument("SlideImage", selectedProduct)
    // After successful deletion, fetch data again to update the list
    memoizedFetchMessagesData();
    setLoading(false);
    setIsModalOpen(false);
    setLoading(false);
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };


  const handleOk = () => {
    // handle logic
    // add new room to firestore
    form
      .validateFields()
      .then((values) => {
        const newProductData = { ...form.getFieldsValue() };
        addDocument("SlideImage", { ...form.getFieldsValue() });
        const categoryRef = db.collection("SlideImage");
        memoizedFetchMessagesData();
        const categorySnapshot = categoryRef.get();
        if (!categorySnapshot.exists) {
          categoryRef.doc('dummyDoc').set({});
          // await categoryRef.doc('dummyDoc').delete();
        }
        // window.location.reload()
        // products = setProductsData([...products, newProductData]);
        // reset form value
        form.resetFields();

        setIsAddProductVisible(false);
      })
      .catch((errorInfo) => {
        // Xử lý lỗi khi người dùng không nhập hoặc nhập sai dữ liệu
        console.error('Validation failed:', errorInfo);
      });
  };

  const handleCancel = () => {
    // reset form value
    form.resetFields();

    setIsAddProductVisible(false);
  };

  const addProduct = () => {
    setIsAddProductVisible(true);
  }

  return (
    <>
      <Button className='btnAddProductCate' onClick={addProduct}><span>Thêm sản phẩm</span></Button>
      <Modal
        title='Tạo sản phẩm'
        visible={isAddProductVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical'>
          <Form.Item label='Tên sản phẩm' name='name'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên sản phẩm!',
              },
            ]}
          >
            <Input placeholder='Nhập tên sản phẩm' required />
          </Form.Item>
          <Form.Item label='URL ảnh' name='photoURL'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập URL ảnh!',
              },
            ]}
          >
            <Input placeholder='Nhập URL' required />
          </Form.Item>
          <Form.Item label='Mô tả' name='description'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mô tả!',
              },
            ]}
          >
            <Input placeholder='Nhập mô tả' required />
          </Form.Item>
        </Form>
      </Modal>
      {/* <Pagination simple defaultCurrent={1} total={50} pageSize={3} /> */}
      < div className='images__admin' >
        <Row>
          {productsData.map((item) => (

            <Col key={item.id} span="24">
              <Modal
                title="Thông báo!"
                visible={isModalOpen}
                onOk={() => handleOkDelete(item.createdAt)}
                onCancel={handleCancelDelete}
                confirmLoading={loading}
                footer={[
                  <Button key="back" onClick={handleCancelDelete}>
                    Hủy
                  </Button>,
                  <Button key="submit" type="primary" loading={loading} onClick={handleOkDelete}>
                    Đồng ý
                  </Button>,
                ]}
              >
                <p>Bạn có chắc muốn xóa sản phẩm?</p>
              </Modal>
              {
                item.name &&
                <div className='images__admin__item'>
                  <div className='images__admin_name'>
                    <h3 >{item.name}</h3>
                  </div>
                  <button className='btn_delete' onClick={() => handleDeleteDoc(item.createdAt)}> Xóa</button>
                  {/* <Image
                    width={650}
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
                    }} /> */}
                  <img src={item.photoURL} />
                </div>
              }
            </Col >
          ))}
        </Row>
      </div>
      {/* <Pagination disabled simple defaultCurrent={2} total={50} /> */}
    </>);
}

export default AdminProducts;