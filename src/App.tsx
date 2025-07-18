import { Route, Routes } from 'react-router-dom'
import Login from './Component/Login'
import Home from './Component/Home'
import UserDetails from './Component/UserDetails';
import Car from './Component/Car';

function App() {

  return (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Home />}></Route>
    <Route path='/userdetails' element={<UserDetails/>}></Route>
    <Route path='/home' element={<Car></Car>}></Route>
  </Routes>
  );
}

export default App
