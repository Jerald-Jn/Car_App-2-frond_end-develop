import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../store/StoreContext";

function Menubar() {
  const { setMenu, token } = useContext(StoreContext)

  return (
    <>
      <div className="md:hidden absolute top-12 pl-6 w-full bg-white dark:bg-white/50 border-black/50 border-y-2 z-20">
        <ul className="flex flex-col space-y-5 my-3 uppercase font-sans text-lg font-semibold dark:text-black">
          <li><Link to={'/explore'} onClick={() => setMenu(false)}>Products</Link></li>
          <li><Link to={'/service'} onClick={() => setMenu(false)}>Service</Link></li>
          <li><Link to={'/explore'} onClick={() => setMenu(false)}>Buy Online</Link></li>
          {token.current &&<li><Link to={'/my-payment'} onClick={() => setMenu(false)}>My Payments</Link></li>}
          <li><Link to={'/about'} onClick={() => setMenu(false)}>About Me</Link></li>
        </ul>
      </div>
    </>
  )
}
export default Menubar;