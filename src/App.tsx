import { Route, Routes } from 'react-router-dom'
import Login from './Component/Login'
import Home from './Component/Home'
import UserDetails from './Component/UserDetails';
import Car from './Component/Car';

function App() {

  return (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Home />}></Route>
    <Route path='/userdetails' element={<UserDetails/>}></Route>
    <Route path='/Car' element={<Car></Car>}></Route>
  </Routes>
  );
}

export default App
