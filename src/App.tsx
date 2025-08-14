import { Route, Routes } from 'react-router-dom';
import Car from './Component/car/Car';
import Cart from './Component/cart/Cart';
import Checkout from './Component/checkout/Checkout';
import PaymentPage from './Component/checkout/PaymentPage';
import Success from './Component/checkout/Success';
import Contact from './Component/contact/Contact';
import Explore from './Component/explore/Explore';
import Footer from './Component/footer/Footer';
import Header from './Component/header/Header';
import Home from './Component/home/Home';
import Login from './Component/login/Login';
import ServicePage from './Component/servicePage/ServicePage';
import UserDetails from './Component/userDetails/UserDetails';

function App() {

  const token=localStorage.getItem('token');

  return (
    <>
      {/* Header Component */}
      <Header></Header>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path='/userdetails' element={<UserDetails />}></Route>
        <Route path='/car/:id' element={<Car></Car>}></Route>
        <Route path='/cart' element={token?<Cart />:<Login />} />
        <Route path='/service' element={<ServicePage></ServicePage>}></Route>
        <Route path='/contact' element={<Contact />} ></Route>
        <Route path='/explore' element={<Explore />}></Route>
        <Route path='/checkout' element={token?<Checkout />:<Login />} ></Route>
        <Route path='/payment-success' element={token?<Success />:<Login />}></Route>
        <Route path='/paymentPage' element={token?<PaymentPage />:<Login />}></Route>
      </Routes>
      {/* Footer Section */}
      <Footer />
    </>
  );
}

export default App
