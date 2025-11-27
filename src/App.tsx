import { useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { About } from './Component/about/About';
import Car from './Component/car/Car';
import Cart from './Component/cart/Cart';
import Checkout from './Component/checkout/Checkout';
import PaymentPage from './Component/checkout/PaymentPage';
import Success from './Component/checkout/Success';
import Contact from './Component/contact/Contact';
import { StoreContext } from './store/StoreContext';
import Explore from './Component/explore/Explore';
import Footer from './Component/footer/Footer';
import Header from './Component/header/Header';
import Home from './Component/home/Home';
import Login from './Component/login/Login';
import { Register } from './Component/register/Register';
import ServicePage from './Component/servicePage/ServicePage';
import { Payment } from './Component/payment/Payment';
import Add_Car from './Component/addCar/addCar';

function App() {

  const { carsList, setLoad } = useContext(StoreContext);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();


  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setLoad(false)
  }, [navigate, carsList])

  return (
    <div className='dark:text-white dark:bg-black/80 h-full w-full'>
      <Header></Header>
      {
        <div onMouseEnter={() => { setLoad(false) }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/addCar" element={<Add_Car />}></Route>
            <Route path="/about" element={<About />} />
            <Route path='/car/:id' element={<Car></Car>}></Route>
            <Route path='/cart' element={token ? <Cart /> : <Login />} />
            <Route path='/service' element={<ServicePage></ServicePage>}></Route>
            <Route path='/contact' element={<Contact />} ></Route>
            <Route path='/explore' element={<Explore />}></Route>
            <Route path='/checkout' element={token ? <Checkout /> : <Login />} ></Route>
            <Route path='/payment-success' element={token ? <Success /> : <Login />}></Route>
            <Route path='/paymentPage' element={token ? <PaymentPage /> : <Login />}></Route>
            <Route path="/not-found" element={<h1 className="text-center mt-20 text-4xl font-bold">404 Not Found</h1>} />
            <Route path='/my-payment' element={token ? <Payment /> : <Login />}></Route>
          </Routes>
        </div>
      }
      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App
