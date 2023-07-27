import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { fbProvider } from '../Login';
import { Spin } from 'antd';
import { Location } from 'react-router-dom';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  React.useEffect(() => {
    // Kiểm tra trạng thái đăng nhập của người dùng
    const unsubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        // Xác định providerId của người dùng
        const providerId = user.providerData[0].providerId;

        if (providerId === 'password') {
          // Người dùng đăng nhập bằng tài khoản mật khẩu
          const { displayName, email, uid, photoURL } = user;
          setUser({
            displayName,
            email,
            uid,
            photoURL,
          });
          setIsLoading(false);
          navigate('/');
          if (location.pathname === '/admin/products') {
            navigate('/admin/products');
          }
          // if (location.pathname === '/') {
          //   navigate('/');
          // }
          // if (location.pathname === '/') {
          //   navigate('/');
          // }
        } else if (providerId === 'facebook.com') {
          // Người dùng đăng nhập bằng Facebook
          const { displayName, email, uid, photoURL } = user;
          setUser({
            displayName,
            email,
            uid,
            photoURL,
          });
          setIsLoading(false);
          navigate('/home');
        }
      }
      else {
        // reset user info
        setUser({});
        setIsLoading(false);
        navigate('/home');
        if (!user && (location.pathname === '/login')) {
          navigate('/login');
        }
      }

    }
    );

    // clean function
    return () => {
      unsubscibed();
    };
  }, [navigate]);

  React.useEffect(() => {
    // Kiểm tra nếu người dùng chưa đăng nhập và đang ở trang "/admin" hoặc "/login"
    // thì chuyển hướng về trang "/" để cho phép truy cập vào các trang này
    if (!user && (location.pathname === '/admin' || location.pathname === '/login')) {
      navigate('/');
    }
  }, [user, location, navigate]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <Spin style={{ position: 'fixed', inset: 0 }} /> : children}
    </AuthContext.Provider>
  );
}
