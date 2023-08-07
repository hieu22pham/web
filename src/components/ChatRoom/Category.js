import React, { useEffect, useContext, useState, useMemo } from 'react';
import { AuthContext } from '../Context/AthProvider';
import { Button, Form, Modal, Input, Image, Space } from 'antd';
import { addDocument } from '../Login/services';
import { db } from '../../firebase/config';
import { Col, Row } from 'antd';
import { deleteDocument } from '../Login/services';
import "./productsAdminCate.css"

function Category() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const { cate } = useContext(AuthContext);
  const [productsCate, setProductsCate] = useState([]);
  const [form] = Form.useForm();
  const [isAddProductVisible, setIsAddProductVisible] = useState(false);
  const { user: { uid } } = useContext(AuthContext);

  const fetchMessagesData = () => {
    if (cate.category && cate.category !== '') {
      const messagesRef = db.collection(cate.category);
      messagesRef
        .get()
        .then((querySnapshot) => {
          const productsData = querySnapshot.docs.map((doc) => doc.data());
          setProductsCate(productsData);
        })
        .catch((error) => {
          console.error('Error getting messages:', error);
        });
    }
  };

  const memoizedFetchMessagesData = useMemo(() => fetchMessagesData, [cate.category]);

  useEffect(() => {
    // Fetch data from Firestore when the component mounts
    fetchMessagesData();
    console.log(productsCate)
  }, [cate.category]);

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        const newProductData = { ...form.getFieldsValue(), category: cate.category };
        addDocument(cate.category, { ...form.getFieldsValue(), category: cate.category });
        // addDocument("products", { ...form.getFieldsValue(), category: [cate.category] });
        if (cate.category !== '') {
          const categoryRef = db.collection(cate.category);
          memoizedFetchMessagesData();
          const categorySnapshot = categoryRef.get();
          if (!categorySnapshot.exists) {
            categoryRef.doc('dummyDoc').set({});
          }
        }
        form.resetFields();
        setIsAddProductVisible(false);
      })
      .catch((errorInfo) => {
        console.error('Validation failed:', errorInfo);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsAddProductVisible(false);
  };

  const addProduct = () => {
    setIsAddProductVisible(true);
  }

  const handleDeleteDoc = (item) => {
    setIsModalOpen(true);
    setSelectedProduct(item);
  };

  const handleOkDelete = () => {
    setLoading(true);
    const batch = db.batch();

    deleteDocument(cate.category, selectedProduct.createdAt);
    // const categoryRef = db.collection(cate.category).doc(selectedProduct.createdAt);
    // batch.delete(categoryRef);

    // const productsRef = db.collection("products").doc(selectedProduct.createdAt);
    // batch.delete(productsRef);

    memoizedFetchMessagesData();
    setLoading(false);
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };


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
          {/* Form fields */}
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
          <Form.Item label='Tiêu đề' name='title'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tiêu đề!',
              },
            ]}
          >
            <Input placeholder='Nhập tiêu đề sản phẩm' required />
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
          <Form.Item label='Giá gốc' name='priceOriginal'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập giá gốc sản phẩm!',
              },
            ]}
          >
            <Input placeholder='Nhập giá gốc sản phẩm' required />
          </Form.Item>
          <Form.Item label='Giá bán' name='priceDiscount'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập giá bán sản phẩm!',
              },
            ]}
          >
            <Input placeholder='Nhập giá bán sản phẩm' required />
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
      <div className='productsCate__admin'>
        <Row>
          {productsCate.map((item) => (
            <Col key={item.id} span="8">
              <Modal
                title="Thông báo!"
                onOk={() => handleOkDelete(item.createdAt)}
                onCancel={handleCancelDelete}
                visible={isModalOpen}
                confirmLoading={loading}
                footer={[
                  <Button key="back" onClick={handleCancelDelete}>
                    Hủy
                  </Button>,
                  <Button key="submit" type="primary" loading={loading} onClick={handleOkDelete}>
                    Đồng ý
                  </Button>,
                ]}
              ></Modal>
              {item.title && (
                <div className='productsCate__admin__item'>
                  <div className='productsCate__admin_name'>
                    <h3>{item.title}</h3>
                  </div>
                  <button className='btn_delete' onClick={() => handleDeleteDoc(item)}>Xóa</button>
                  <div className='productsCate__admin_image'>
                    <Image
                      width={300}
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
                      }} />
                  </div>
                </div>
              )}

            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}

export default Category;
