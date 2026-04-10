import { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { About, Add_Car, Car, Cart, Checkout, Contact, Explore, Home, Login, NotFound, Payment, PaymentPage, Register, ServicePage, Success } from './pages/index';
import { Footer, Header, PageLoading, Popup, ProtectedRoute } from "./Component/index";
import { StoreContext } from './store/StoreContext';
import { ToastContainer } from 'react-toastify';

function App() {

  const {  setLoad, popDetails, pageLoad } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoad(false)
  }, [navigate]);
  
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
            <Route path='/car/:id' element={<Car />}></Route>
            <Route path='/cart'
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } />
            <Route path='/service' element={<ServicePage />}></Route>
            <Route path='/contact' element={<Contact />} ></Route>
            <Route path='/explore' element={<Explore />}></Route>
            <Route path='/checkout'
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            ></Route>
            <Route path='/payment-success'
              element={
                <ProtectedRoute>
                  <Success />
                </ProtectedRoute>
              }
            ></Route>
            <Route path='/paymentPage'
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/not-found" element={<NotFound />} />
            <Route path='/my-payment'
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </div>
      }
      {
        (!!String(popDetails.title).trim() && !!String(popDetails.msg).trim()) && <Popup />
      }
      {
        pageLoad && <PageLoading />
      }
      <ToastContainer
          position="top-right"
          autoClose={3000} 
          closeOnClick
          />
      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App
