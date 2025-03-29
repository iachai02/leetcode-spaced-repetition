import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      alert('Signup successful! Check your email for confirmation!');
      navigate('/login');
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <h2>Create an Account</h2>
        <input
          className='auth-input'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          className='auth-input'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button className='auth-button' onClick={handleSignUp}>
          Sign Up
        </button>
        <p className='auth-link'>
          Already have an account? <Link to='/login'>Log in</Link>
        </p>
      </div>
    </div>
  );
}
