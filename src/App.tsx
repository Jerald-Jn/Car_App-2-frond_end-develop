import { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { About } from './Component/about/About';
import Car from './Component/car/Car';
import Cart from './Component/cart/Cart';
import Checkout from './Component/checkout/Checkout';
import PaymentPage from './Component/checkout/PaymentPage';
import Success from './Component/checkout/Success';
import Contact from './Component/contact/Contact';
import { StoreContext } from './Component/context/StoreContext';
import Explore from './Component/explore/Explore';
import Footer from './Component/footer/Footer';
import Header from './Component/header/Header';
import Home from './Component/home/Home';
import Login from './Component/login/Login';
import { Register } from './Component/register/Register';
import ServicePage from './Component/servicePage/ServicePage';

function App() {

  const { carsList } = useContext(StoreContext);
  let token = sessionStorage.getItem('token');
  const navigate = useNavigate();


  useEffect(() => {
    token = sessionStorage.getItem('token');
  }, [navigate, carsList])

  return (
    <>
    <div className='dark:text-white dark:bg-black/80'>
      {
        true ?
          <>
            <Header></Header>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/about" element={<About />} />
              <Route path='/car/:id' element={<Car></Car>}></Route>
              <Route path='/cart' element={token ? <Cart /> : <Login />} />
              <Route path='/service' element={<ServicePage></ServicePage>}></Route>
              <Route path='/contact' element={<Contact />} ></Route>
              <Route path='/explore' element={<Explore />}></Route>
              <Route path='/checkout' element={token ? <Checkout /> : <Login />} ></Route>
              <Route path='/payment-success' element={token ? <Success /> : <Login />}></Route>
              <Route path='/paymentPage' element={token ? <PaymentPage /> : <Login />}></Route>
            </Routes>

            {/* Footer Section */}
            <Footer />
          </> : <h1 className='translate-y-52 tracking-wide text-center font-bold text-4xl'>Not Fount 404</h1>
      }
      </div>
    </>
  );
}

export default App
