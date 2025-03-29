import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

type Props = {
  isLoggedIn: boolean;
  onLogout?: () => void;
};

const Navbar: React.FC<Props> = ({ isLoggedIn, onLogout }: Props) => {
  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <Link to='/' className='navbar-logo'>
          LeetCoach
        </Link>
        <Link to='/' className='navbar-link'>
          Home
        </Link>
        {isLoggedIn && (
          <>
            <Link to='/dashboard' className='navbar-link'>
              Dashboard
            </Link>
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
            <Link to='/login' className='navbar-link'>
              Login
            </Link>
            <Link to='/signup' className='navbar-button'>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
