import { useContext, useEffect, useState } from 'react';
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
import { Payment } from './Component/payment/Payment';

function App() {

  const { carsList, pageLoading, setLoad, headerLoad, footrLoad } = useContext(StoreContext);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setLoad(false)
  }, [navigate, carsList])

  return (
    <>
      <div className='dark:text-white dark:bg-black/80'>
        {
           pageLoading ?
              (<div id="loading-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">

                <svg className="animate-spin h-8 w-8 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>

                <span className="text-white text-3xl font-bold">Loading...</span>

              </div>) 
              :
            Array.isArray(carsList) && carsList.length>0 ?
            <>
              {headerLoad && <Header></Header>}
              <div onMouseEnter={() => { setLoad(false) }}>
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
                <Route path="*" element={<h1 className="text-center mt-20 text-4xl font-bold">404 Not Found</h1>} />
                <Route path='/my-payment' element={token?<Payment />:<Login/>}></Route>
              </Routes>
              </div>

              {/* Footer Section */}
              {footrLoad && <Footer />}
            </> : (<h1 className='translate-y-52 tracking-wide text-center font-bold text-4xl'>404 Not Found</h1>)
        }
      </div>
    </>
  );
}

export default App
