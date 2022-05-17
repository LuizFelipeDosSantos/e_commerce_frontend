import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Products } from './components/Products';
import { ProductDetail } from './components/ProductDetail';
import { LayoutComponent } from './components/LayoutComponent';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<LayoutComponent />}>
        <Route path="/home" element={<Products />} />
        <Route path="/product-detail" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
