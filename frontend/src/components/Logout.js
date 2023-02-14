import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default Logout;