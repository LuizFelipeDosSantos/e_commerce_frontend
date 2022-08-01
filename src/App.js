import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { LayoutComponent } from './components/LayoutComponent';
import { Products } from './components/Products';
import { ProductDetail } from './components/ProductDetail';
import { AddressList } from './components/AddressList';
import { CreateAddress } from './components/CreateAddress';
import { EditAddress } from './components/EditAddress';
import { Wishlist } from './components/Wishlist';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { Orders } from './components/Orders';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<LayoutComponent />}>
        <Route path="/home" element={<Products />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/address">
          <Route path="list" element={<AddressList />} />
          <Route path="create" element={<CreateAddress />} />
          <Route path="edit" element={<EditAddress />} />
        </Route>
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}

export default App;
