import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      let isTokenValid = false;
      const token = localStorage.getItem('token');

      if (!token) {
        navigate("/");
        return;
      }

      const decodedToken=jwt_decode(token);
      let dateNow = new Date();

      if(decodedToken.exp  < dateNow.getTime()) isTokenValid = true;

      if (!isTokenValid) {
        navigate("/");
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;