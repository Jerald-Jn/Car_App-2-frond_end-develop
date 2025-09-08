import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

function Menubar() {
  const { setMenu } = useContext(StoreContext)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(()=>{
    setToken(localStorage.getItem('token'));
  },[])
  return (
    <>
      <div className="md:hidden absolute -top-[0.6px] pl-6 w-full bg-white dark:bg-white/50 border-black/10 border-b-2 z-10">
        <ul className="flex flex-col space-y-5 my-3  uppercase font-sans text-lg font-semibold dark:text-black">
          <li><Link to={'/explore'} onClick={() => setMenu(false)}>Products</Link></li>
          <li><Link to={'/service'} onClick={() => setMenu(false)}>Service</Link></li>
          <li><Link to={'/explore'} onClick={() => setMenu(false)}>Buy Online</Link></li>
          {token &&<li><Link to={'/my-payment'} onClick={() => setMenu(false)}>My Payments</Link></li>}
          <li><Link to={'/about'} onClick={() => setMenu(false)}>About Me</Link></li>
        </ul>
      </div>
    </>
  )
}
export default Menubar;