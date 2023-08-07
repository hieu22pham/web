import React from 'react';
import './App.css';
import ChatRoom from './components/ChatRoom';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import AddRoomModal from './components/Modals/AddRoomModal';
import AuthProvider from './components/Context/AthProvider';
import AppProvider from './components/Context/AppProvider';
import Products from './components/Products/Products';
import AdminProducts from './components/ChatRoom/AdminProducts';
import { AuthContext } from './components/Context/AthProvider';
import Category from './components/ChatRoom/Category';
import Home from './components/Products';
import OutletHome from './components/Products/OutletHome';
import OutletProduct from './components/Products/OutletProduct'
import ShowProductDetail from './components/Products/ShowProductDetail';
import SlideImage from './components/ChatRoom/SlideImage';

function App() {
  // Move the useAuth hook inside the App component
  const { cate, textProduct } = React.useContext(AuthContext) || {};

  console.log(cate, textProduct);

  return (
    <AuthProvider> {/* Wrap the entire application with AuthProvider */}
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} >
            <Route path="/" element={<OutletHome />} />
            <Route path={`/mobile/:${cate?.category}`} element={<OutletProduct />} />
            <Route path={`/:${textProduct}`} element={<ShowProductDetail />} />
          </Route>

          <Route path="/admin" element={<ChatRoom />} >
            <Route path="products" element={<AdminProducts />} />
            <Route path={`/admin/:${cate?.category}`} element={<Category />} />
            <Route path="slide-image" element={<SlideImage />} />


            {/* <Route path="a" element={<AdminProducts />} /> */}
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
        <AddRoomModal />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
