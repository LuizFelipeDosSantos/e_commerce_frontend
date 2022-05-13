import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Products } from './components/Products';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Products />} />
    </Routes>
  );
}

export default App;
