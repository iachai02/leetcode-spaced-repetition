import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('Logged out!');
  };

  return (
    <div className='app-container'>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
