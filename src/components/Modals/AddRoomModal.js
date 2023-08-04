import React, { useContext, useState } from 'react';
import { Form, Modal, Input } from 'antd';
import { AppContext } from '../Context/AppProvider';
import { addDocument } from '../Login/services';
import { AuthContext } from '../Context/AthProvider';
import { db } from '../../firebase/config';

export default function AddRoomModal() {
  const data = db.collection('categories');
  // const { cate } =
  //   React.useContext(AuthContext);
  const [productsData, setProductsData] = useState([]);
  const { products, setProducts, isAddRoomVisible, setIsAddRoomVisible } =
    useContext(AppContext);
  const [count, setCount] = useState(0);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newProductData = { ...form.getFieldsValue(), members: [uid] };
        addDocument('categories', { ...form.getFieldsValue(), members: [uid] });
        const categoryRef = db.collection(newProductData.category);
        const categorySnapshot = categoryRef.get();
        if (!categorySnapshot.exists) {
          // Nếu collection chưa tồn tại, ta tạo nó
          categoryRef.doc('dummyDoc').set({});
        }
        form.resetFields();

        setIsAddRoomVisible(false);
      })
      .catch((errorInfo) => {
        // Xử lý lỗi khi người dùng không nhập hoặc nhập sai dữ liệu
        console.error('Validation failed:', errorInfo);
      });
  };

  const handleCancel = () => {
    // reset form value
    form.resetFields();

    setIsAddRoomVisible(false);
  };

  const fetchMessagesData = () => {
    data
      .get()
      .then((querySnapshot) => {
        const productsData = querySnapshot.docs.map((doc) => doc.data());
        setProductsData(data); // Update state with the data
      })
      .catch((error) => {
        console.error('Error getting messages:', error);
      });
  };
  return (
    <div>
      <Modal
        title='Tạo danh mục'
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical' >
          <Form.Item label='Tên danh mục' name='category'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên danh mục!',
              },
            ]}
          >
            <Input placeholder='Nhập tên danh mục' />
          </Form.Item>
          {/* <Form.Item label='Tên sản phẩm' name='name'>
            <Input placeholder='Nhập tên sản phẩm' />
          </Form.Item>
          <Form.Item label='Đường dẫn ảnh' name='photoURL'>
            <Input.TextArea placeholder='Nhập đường dẫn ảnh' />
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
}