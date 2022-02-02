import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";

function Nav() {
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(sessionStorage.getItem('Auth Token'));
  }, [token])

  const handleClick = () => {
    if (token) {
      sessionStorage.removeItem('Auth Token');
    }
    navigate('/login');
  }

  return (
    <div>
      <div className="navwrapper">
        <Link to="/">
          <p className="navtext">Meme Generator</p>
        </Link>
        <Link to="/saved">
          <p className="navtext">Saved</p>
        </Link>
        <p className="navtext logbut" onClick={() => handleClick()}>
          {
            token ? "Logout" : "login"
          }
        </p>
      </div>
    </div>
  );
}

export default Nav;
