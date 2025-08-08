import { Route, Routes } from 'react-router-dom'
import Login from './Component/pages/Login'
import Home from './Component/pages/Home'
import UserDetails from './Component/pages/UserDetails';
import Car from './Component/pages/Car';
import Checkout from './Component/checkout/Checkout';
import Header from './Component/header/Header';
import Footer from './Component/footer/Footer';
import ServicePage from './Component/pages/ServicePage';
import Feedback from './Component/pages/feedback/FeedBackPage';

function App() {

  return (
    <>
  {/* Header Component */}
      <Header></Header>
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Home />}></Route>
    <Route path='/userdetails' element={<UserDetails/>}></Route>
    <Route path='/car/:id' element={<Car></Car>}></Route>
    <Route path='/checkout' element={<Checkout/>} />
    <Route path='/service' element={<ServicePage></ServicePage>}></Route>
    <Route path='/feedback' element={<Feedback />} ></Route>
  </Routes>
  {/* Footer Section */}
      <Footer />
  </>
  );
}

export default App
