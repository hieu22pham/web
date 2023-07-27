import './App.css';
import ChatRoom from './components/ChatRoom';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import AddRoomModal from './components/Modals/AddRoomModal';
import AuthProvider from './components/Context/AthProvider'
import AppProvider from './components/Context/AppProvider';
import Products from './components/Products/Products';
import AdminProducts from './components/ChatRoom/AdminProducts';

function App() {
  return (
    <>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/home" element={<Products />} />
            <Route path="/" element={<ChatRoom />} >
              <Route path="/admin/products" element={<AdminProducts />} />
              {/* <Route path="a" element={<AdminProducts />} /> */}
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
          <AddRoomModal />
        </AppProvider>
      </AuthProvider>
      <Routes>

      </Routes>
    </>
  );
}

export default App;
