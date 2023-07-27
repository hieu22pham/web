import React, { useContext, useState } from 'react';
import { Form, Modal, Input } from 'antd';
import { AppContext } from '../Context/AppProvider';
import { addDocument } from '../Login/services';
import { AuthContext } from '../Context/AthProvider';

export default function AddRoomModal() {
  const { products, setProducts, isAddRoomVisible, setIsAddRoomVisible } =
    useContext(AppContext);
  const [count, setCount] = useState(0);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    // handle logic
    // add new room to firestore
    const newProductData = { ...form.getFieldsValue(), members: [uid] };
    addDocument('products', { ...form.getFieldsValue(), members: [uid] });
    // window.location.reload()
    setCount(count + 1);
    // products = setProducts([...products, newProductData]);
    // reset form value
    form.resetFields();

    setIsAddRoomVisible(false);
  };

  const handleCancel = () => {
    // reset form value
    form.resetFields();

    setIsAddRoomVisible(false);
  };

  return (
    <div>
      <Modal
        title='Tạo phòng'
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical'>
          <Form.Item label='Tên danh mục' name='name'>
            <Input placeholder='Nhập tên phòng' />
          </Form.Item>
          <Form.Item label='Đường dẫn ảnh' name='photoURL'>
            <Input.TextArea placeholder='Nhập mô tả' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}