import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { getUserCart } from "../../Api";
import type { CartData } from "../../Interface/DataModel";

function Header() {

  const { setShowProducts, setShowService, setMenu, menu, totals } = useContext(StoreContext)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const clientSecret = localStorage.getItem('clientSecret');
  const [backgroundcolor,setBackgroundColor]=useState(false);

  useEffect(() => {
    const getCart = async () => {
      const response = await getUserCart();
      console.log(Object.keys(response.items).length)
      let tempCount = Object.keys(response.items).length;
      if (tempCount !== 0) {
        let tempItems: CartData["items"] = response.items;
        tempCount = Object.values(tempItems).reduce((acc, item) => acc + item.quantity, 0);
        setCount(tempCount);
        setLoading(true);
      } else {
        setLoading(false)
      }
      console.log(response)
    }
    getCart();
  }, [navigate, totals, clientSecret])

  return (
    <>
      {/* Header Section with navigation bar */}
      <header className='bg-white border-b-2 border-black/10 dark:bg-white dark:text-black' onMouseEnter={() => { setShowProducts(false), setShowService(false) }}>
        <nav className=''>
          <div className='flex flex-row justify-between mt-0.5 p-2 md:ml-5 md:p-5'>
            <button onClick={() => navigate(-1)}
              className="inline-flex items-center border-2 border-black px-0.5 py-0.5 rounded-md text-black hover:bg-indigo-50 relative md:-translate-x-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
                </path>
              </svg>
            </button>
            <svg className="block md:hidden h-8 w-[2rem] cursor-pointer"
              onClick={() => { setMenu(!menu) }}
              viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" fill="white" />
              <path d="M6 12H18" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 15.5H18" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 8.5H18" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg
              onClick={() => navigate('/')}
              className='w-1/3 mt-0.5 md:h-6 md:w-[12rem] hover:cursor-pointer' onMouseEnter={() => { setShowProducts(false) }} xmlns="http://www.w3.org/2000/svg" width="136" height="24" viewBox="0 0 136 24"><path fill="none" d="M0 0h158v48H0V0z" />
              <path fill="#EB0A1E" d="M20.354.804H1.004v4.278h7.142v18.241h5.067V5.082h7.141V.804m18.921 14.874a6.206 6.206 0 0 1-4.678 3.826 6.807 6.807 0 0 1-1.175.104c-.399 0-.792-.038-1.172-.104a6.197 6.197 0 0 1-4.676-3.826 9.886 9.886 0 0 1-.682-3.614c0-1.276.243-2.498.682-3.617.791-2 2.56-3.447 4.676-3.825a6.474 6.474 0 0 1 2.347 0 6.203 6.203 0 0 1 4.678 3.824 9.95 9.95 0 0 1 0 7.232M33.421.127c-6.589 0-11.936 5.344-11.936 11.937 0 6.588 5.347 11.933 11.936 11.933 6.594 0 11.937-5.345 11.937-11.933 0-6.593-5.343-11.937-11.937-11.937zm12.017.677h5.968l5.573 9.682L62.552.804h5.966l-9.006 14.188v8.331h-5.066v-8.331L45.438.804M80.549 19.61c.398 0 .793-.04 1.172-.106a6.193 6.193 0 0 0 4.676-3.824 9.877 9.877 0 0 0 0-7.231 6.197 6.197 0 0 0-4.676-3.826 6.674 6.674 0 0 0-2.35 0 6.193 6.193 0 0 0-4.674 3.825 9.872 9.872 0 0 0-.684 3.615c0 1.276.243 2.495.684 3.616a6.188 6.188 0 0 0 4.674 3.824 6.72 6.72 0 0 0 1.178.107m-11.938-7.547c0-6.592 5.342-11.938 11.938-11.938 6.589 0 11.936 5.344 11.936 11.938C92.484 18.651 87.138 24 80.549 24c-6.596 0-11.938-5.349-11.938-11.937zm58.432 2.347l-3.316-8.897-3.32 8.897h6.636m1.47 3.94h-9.585l-1.844 4.959h-5.637L120.57.788h6.304L136 23.309h-5.63l-1.857-4.959zM112.936.804h-19.35v4.278h7.145l-.002 18.241h5.069l-.002-18.241h7.14V.804" />
            </svg >

            <div className='hidden md:block w-full pl-2'>
              <ul className='flex flex-row gap-5 items-center uppercase text-xs font-bold md:mt-3'>
                <li className='tracking-wider underline-offset-8 hover:underline hover:cursor-pointer' onMouseEnter={() => { setShowProducts(true), setShowService(false) }}>
                  <a >Products</a>
                </li>
                <li className='tracking-wider underline-offset-8 hover:underline hover:cursor-pointer'
                  onMouseEnter={() => { setShowProducts(false) }}>
                  <Link to={'/service'} >Service</Link>
                </li>
                <li className='tracking-wider underline-offset-8 hover:underline hover:cursor-pointer' onMouseEnter={() => { setShowService(false), setShowProducts(false) }}>
                  <Link to={'/explore'}  >Buy Online</Link></li>
                <li className='tracking-wider underline-offset-8 hover:underline hover:cursor-pointer'>
                  <Link to={'/about'}  >About me</Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-row md:w-[20rem] gap-x-4 w-[10rem] items-center">
              <button className="rounded-md w-5 h-6" onClick={() =>{
                document.documentElement.classList.toggle("dark")
                setBackgroundColor(!backgroundcolor);
              }
              }>{
                backgroundcolor?
                <svg className="w-5" fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                   viewBox="0 0 292.548 292.548"
                  xmlSpace="preserve">
                  <g>
                    <path d="M221.253,146.83c0,39.842-32.396,72.231-72.223,72.231c-39.839,0-72.238-32.401-72.238-72.231
		c0-39.833,32.405-72.231,72.238-72.231C188.851,74.598,221.253,107.002,221.253,146.83z M149.03,47.105
		c3.984,0,7.221-3.239,7.221-7.224V9.776c0-3.996-3.23-7.224-7.221-7.224c-3.996,0-7.23,3.233-7.23,7.224v30.105
		C141.8,43.866,145.028,47.105,149.03,47.105z M220.917,83.821c1.849,0,3.698-0.703,5.104-2.114l25.881-25.875
		c2.822-2.832,2.822-7.41,0-10.226c-2.822-2.811-7.386-2.811-10.208,0l-25.881,25.887c-2.822,2.828-2.822,7.397,0,10.214
		C217.224,83.119,219.067,83.821,220.917,83.821z M60.504,81.708c1.414,1.405,3.267,2.114,5.104,2.114
		c1.853,0,3.702-0.703,5.116-2.114c2.822-2.822,2.822-7.386,0-10.214L44.832,45.607c-2.822-2.811-7.386-2.811-10.208,0
		c-2.822,2.822-2.822,7.395,0,10.226L60.504,81.708z M143.263,245.447c-3.99,0-7.218,3.242-7.218,7.224v30.102
		c0,3.987,3.233,7.224,7.218,7.224s7.232-3.23,7.232-7.224V252.67C150.495,248.689,147.253,245.447,143.263,245.447z M66.26,210.847
		l-25.88,25.88c-2.822,2.822-2.822,7.398,0,10.208c1.414,1.412,3.267,2.12,5.116,2.12c1.852,0,3.69-0.702,5.104-2.12l25.881-25.88
		c2.822-2.822,2.822-7.398,0-10.208C73.658,208.031,69.082,208.031,66.26,210.847z M231.785,210.847
		c-2.822-2.816-7.392-2.816-10.214,0c-2.822,2.822-2.822,7.386,0,10.208l25.881,25.88c1.41,1.412,3.26,2.12,5.115,2.12
		c1.85,0,3.688-0.702,5.099-2.12c2.822-2.822,2.822-7.386,0-10.208L231.785,210.847z M46.96,146.83c0-3.996-3.249-7.224-7.233-7.224
		H7.218c-3.99,0-7.218,3.228-7.218,7.224c0,3.993,3.233,7.224,7.218,7.224h32.51C43.718,154.053,46.96,150.823,46.96,146.83z
		 M285.324,139.606h-38.527c-3.987,0-7.218,3.228-7.218,7.224c0,3.993,3.23,7.224,7.218,7.224h38.527
		c3.987,0,7.224-3.23,7.224-7.224C292.548,142.833,289.312,139.606,285.324,139.606z"/>
                  </g>
                </svg>
                :<svg className='w-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z" />
                  </g>
                </svg>
                }
              </button>

              <Link to={'/cart'} className=''>
                <svg className="md:w-12 md:h-8 w-7 hover:cursor-pointer md:-mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {loading && <span className="cart-count ">{count}</span>}
              </Link>
              <Link to={{ pathname: '/login' }}>
                <svg className="md:w-12 md:h-8 w-7 hover:cursor-pointer md:-mb-2" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 5.5C5 4.11929 6.11929 3 7.5 3C8.88071 3 10 4.11929 10 5.5C10 6.88071 8.88071 8 7.5 8C6.11929 8 5 6.88071 5 5.5Z" fill="#000000" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0ZM1 7.5C1 3.91015 3.91015 1 7.5 1C11.0899 1 14 3.91015 14 7.5C14 9.34956 13.2275 11.0187 11.9875 12.2024C11.8365 10.4086 10.3328 9 8.5 9H6.5C4.66724 9 3.16345 10.4086 3.01247 12.2024C1.77251 11.0187 1 9.34956 1 7.5Z" fill="#000000" />
                </svg>
              </Link>
              <Link to={'/contact'} className='w-10'>
                <img className='md:w-12 md:h-8 w-7 hover:cursor-pointer' src="../src/assets/call-logo.png" alt="" />
              </Link>
            </div>
            <button onClick={() => navigate(+1)}
              className="inline-flex items-center border-2 border-black px-0.5 py-0.5 rounded-md text-black hover:bg-indigo-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3">
                </path>
              </svg>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
export default Header;