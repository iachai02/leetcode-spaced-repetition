import React from 'react';
import './Navbar.css';

type Props = {
  isLoggedIn: boolean;
  onLogout?: () => void;
};

const Navbar: React.FC<Props> = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <a href='/' className='navbar-logo'>
          LeetCoach
        </a>
        <a href='/' className='navbar-link'>
          Home
        </a>
        {isLoggedIn && (
          <>
            <a href='/problems' className='navbar-link'>
              All Problems
            </a>
            <a href='/stats' className='navbar-link'>
              Stats
            </a>
            <a href='/settings' className='navbar-link'>
              Settings
            </a>
          </>
        )}
      </div>
      <div className='navbar-right'>
        {isLoggedIn ? (
          <button onClick={onLogout} className='navbar-button'>
            Logout
          </button>
        ) : (
          <>
            <a href='/login' className='navbar-link'>
              Login
            </a>
            <a href='/signup' className='navbar-button'>
              Sign Up
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
