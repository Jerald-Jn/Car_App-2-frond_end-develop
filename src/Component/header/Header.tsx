import { useContext, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../store/StoreContext";
import { getUserCart } from "../../Api";
import type { CartData } from "../../Interface/DataModel";
import { CircleUserRound, PhoneCall, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import Menubar from "../menu_bar/Menubar";
import Products from "./Products";

function Header() {

  const { setShowProducts, setMenu, menu, totals, token, setCount, count, setLoading, load, setLoad, logouting, setLogouting, pathCheck, setPathCheck, showProducts } = useContext(StoreContext)
  const navigate = useNavigate();
  const focusElement = useRef<HTMLDivElement>(null)
  const location = useLocation();
  const getCart = async () => {
    try {
      const response = await getUserCart(token.current);
      let tempCount = Object.keys(response.items).length;
      if (tempCount !== -1) {
        let tempItems: CartData["items"] = response.items;
        tempCount = Object.values(tempItems).reduce((acc, item) => acc + item.quantity, 0);
        setCount(tempCount);
        setLoading(true);
      } else {
        setLoading(false)
      }
    } catch (error) {
      console.error(error); 
    }
  }
  useEffect(() => {
    token.current && getCart();
  }, [count, token.current, totals]);

  useEffect(() => {
    token.current && getCart();
  },[]);

  useEffect(() => {
    if (focusElement.current) {
      focusElement.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setPathCheck(location.pathname)
  }, [navigate]);

  const logout = () => {
    setLogouting(false);
    token.current = null;
    sessionStorage.removeItem('token');
    toast.success('logged out successfuly')
    setCount(0)
    navigate('/login')
  }
  const leave = ()=> {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  return (
    <>
      {/* Header Section with navigation bar */}
      <header className='bg-white border-b-2 md:h-[4.6rem] h-12 border-black/10 dark:bg-white/50 dark:text-black' onMouseEnter={() => { setShowProducts(false); setLoad(false) }} >
        <nav className=''>
          <div ref={focusElement} className='flex flex-row justify-between mt-0.5 p-2 md:ml-5 md:p-5'>
            <svg
              className={`block md:hidden h-8 w-[2rem] cursor-pointer`}
              onClick={() => { setMenu(!menu); setLoad(false) }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path className={`${menu && 'stroke-blue-500'} hover:stroke-blue-500`} d="M6 12H18" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
              <path className={`${menu && 'stroke-blue-500'} hover:stroke-blue-500`} d="M6 15.5H18" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
              <path className={`${menu && 'stroke-blue-500'} hover:stroke-blue-500`} d="M6 8.5H18" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <svg
              onClick={() => navigate('/home')}
              className='w-1/3 mt-0.5 md:h-6 md:w-[12rem] hover:cursor-pointer' onMouseEnter={() => { setShowProducts(false) }} xmlns="http://www.w3.org/2000/svg" width="136" height="24" viewBox="0 0 136 24"><path fill="none" d="M0 0h158v48H0V0z" />
              <path className={` ${pathCheck == '/' || pathCheck == '/home' ? 'fill-blue-500 stroke-blue-500 hover:fill-red-500 hover:stroke-red-500' : 'hover:fill-blue-300 hover:stroke-blue-300'}`}
                fill="#EB0A1E" d="M20.354.804H1.004v4.278h7.142v18.241h5.067V5.082h7.141V.804m18.921 14.874a6.206 6.206 0 0 1-4.678 3.826 6.807 6.807 0 0 1-1.175.104c-.399 0-.792-.038-1.172-.104a6.197 6.197 0 0 1-4.676-3.826 9.886 9.886 0 0 1-.682-3.614c0-1.276.243-2.498.682-3.617.791-2 2.56-3.447 4.676-3.825a6.474 6.474 0 0 1 2.347 0 6.203 6.203 0 0 1 4.678 3.824 9.95 9.95 0 0 1 0 7.232M33.421.127c-6.589 0-11.936 5.344-11.936 11.937 0 6.588 5.347 11.933 11.936 11.933 6.594 0 11.937-5.345 11.937-11.933 0-6.593-5.343-11.937-11.937-11.937zm12.017.677h5.968l5.573 9.682L62.552.804h5.966l-9.006 14.188v8.331h-5.066v-8.331L45.438.804M80.549 19.61c.398 0 .793-.04 1.172-.106a6.193 6.193 0 0 0 4.676-3.824 9.877 9.877 0 0 0 0-7.231 6.197 6.197 0 0 0-4.676-3.826 6.674 6.674 0 0 0-2.35 0 6.193 6.193 0 0 0-4.674 3.825 9.872 9.872 0 0 0-.684 3.615c0 1.276.243 2.495.684 3.616a6.188 6.188 0 0 0 4.674 3.824 6.72 6.72 0 0 0 1.178.107m-11.938-7.547c0-6.592 5.342-11.938 11.938-11.938 6.589 0 11.936 5.344 11.936 11.938C92.484 18.651 87.138 24 80.549 24c-6.596 0-11.938-5.349-11.938-11.937zm58.432 2.347l-3.316-8.897-3.32 8.897h6.636m1.47 3.94h-9.585l-1.844 4.959h-5.637L120.57.788h6.304L136 23.309h-5.63l-1.857-4.959zM112.936.804h-19.35v4.278h7.145l-.002 18.241h5.069l-.002-18.241h7.14V.804" />
            </svg >

            <div className='hidden md:block w-full pl-2'>
              <ul className='flex flex-row gap-5 items-center uppercase text-xs font-bold md:mt-3'>
                <li className={`tracking-wider underline-offset-8 hover:underline hover:cursor-pointer hover:text-red-500`} onMouseEnter={() => { setShowProducts(true) }}>
                  <a >Products</a>
                </li>
                <li className={`tracking-wider underline-offset-8 hover:underline hover:cursor-pointer hover:text-red-500 ${pathCheck == '/service' && 'text-blue-500'}`}
                  onMouseEnter={() => { setShowProducts(false) }}>
                  <Link to={'/service'} >Service</Link>
                </li>
                <li className={`tracking-wider underline-offset-8 hover:underline hover:cursor-pointer hover:text-red-500 ${pathCheck == '/explore' && 'text-blue-500'}`}
                  onMouseEnter={() => { setShowProducts(false) }}>
                  <Link to={'/explore'}  >Buy Online</Link></li>
                <li className={`tracking-wider underline-offset-8 hover:underline hover:cursor-pointer hover:text-red-500 ${pathCheck == '/about' && 'text-blue-500'}`}
                  onMouseEnter={() => { setShowProducts(false) }}>
                  <Link to={'/about'}  >About me</Link>
                </li>
                {
                  token.current &&
                  <li className={`tracking-wider underline-offset-8 hover:underline hover:cursor-pointer hover:text-red-500 ${pathCheck == '/my-payment' && 'text-blue-500'}`}
                    onMouseEnter={() => { setShowProducts(false) }}>
                    <Link to={'/my-payment'}  >My Payments</Link>
                  </li>
                }
              </ul>
            </div>

            <div className="flex flex-row md:w-[20rem] md:gap-x-4 gap-x-2 justify-evenly w-[10rem] items-center ">
              <Link to={'/cart'} className='' onMouseEnter={() => setLoad(false)}>
                <ShoppingCart className={`md:w-8 md:h-8 w-6 ${pathCheck == '/cart' && 'stroke-blue-500'}`} />
                { count>0 && <span className={`cart-count`}>{count}</span>}
              </Link>
              <button className="" onMouseEnter={() => { setMenu(false); setLoad(!load) }} onClick={() => { setMenu(false); setLoad(!load) }}>
                <CircleUserRound className={`md:w-8 md:h-8 w-6 ${pathCheck == '/login' && 'stroke-blue-500'}`} />
              </button>
              {load &&
                <div className="absolute md:top-[4.5rem] mx-5 rounded-2xl w-[9rem] top-[3.2rem] right-0 bg-black/50 dark:bg-white/50 z-10  p-2" onMouseLeave={leave}>
                  <ul className="flex items-start px-5 space-y-1 flex-col cursor-pointer text-white dark:text-black">
                    <Link to={'/login'} className="hover:text-red-500">Login</Link>
                    {token.current && <li className="hover:text-red-500"><button onClick={() => { setLogouting(true) }}>Logout</button></li>}
                  </ul>
                </div>
              }

              <Link to={'/contact'} className={`w-10 md:mr-3`} onMouseEnter={() => setLoad(false)}>
                <PhoneCall className={`md:w-7 md:h-8 w-6 ${pathCheck == '/contact' && 'stroke-blue-500'}`} />
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {
        logouting &&
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white dark:text-black w-[24rem] h-[8rem] px-10 py-5 rounded-2xl border shadow-lg">
            <p className="text-xl">Are you sure you want to logout?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white rounded-md px-4 py-1"
                onClick={() => {
                  setLogouting(false);
                }}
              >
                Close
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-1"
                onClick={() => {
                  logout();
                  setLogouting(false)
                }}
              >
                Sure
              </button>
            </div>
          </div>
        </div>
      }

      {/* Menu bar for small screen */}
      {menu && (
        <Menubar />
      )
      }
      {/* When we hover on Product is render "Products" component */}
      {
        showProducts && (<Products />)
      }

    </>
  );
}
export default Header;