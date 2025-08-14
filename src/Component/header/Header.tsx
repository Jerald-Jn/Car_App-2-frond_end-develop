import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

function Header() {

    const {setShowProducts, setShowService,setMenu, menu}=useContext(StoreContext)
    const navigate=useNavigate();

  return (
    <>
    {/* Header Section with navigation bar */}
    <header className='bg-white border-b-2 border-black/10' onMouseEnter={() => { setShowProducts(false), setShowService(false) }}>
      <nav className=''>
        <div className='flex justify-between mt-0.5 p-2 md:mx-5 md:p-5'>
          <svg className="block md:hidden -mx-2 h-8 w-1/6 cursor-pointer" 
          onClick={()=>{setMenu(!menu)}}
            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="white" />
            <path d="M6 12H18" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 15.5H18" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 8.5H18" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg 
          onClick={()=>navigate('/')}
          className='w-3/5 mt-0.5 md:h-6 md:w-1/6 hover:cursor-pointer' onMouseEnter={() => { setShowProducts(false) }} xmlns="http://www.w3.org/2000/svg" width="136" height="24" viewBox="0 0 136 24"><path fill="none" d="M0 0h158v48H0V0z" />
            <path fill="#EB0A1E" d="M20.354.804H1.004v4.278h7.142v18.241h5.067V5.082h7.141V.804m18.921 14.874a6.206 6.206 0 0 1-4.678 3.826 6.807 6.807 0 0 1-1.175.104c-.399 0-.792-.038-1.172-.104a6.197 6.197 0 0 1-4.676-3.826 9.886 9.886 0 0 1-.682-3.614c0-1.276.243-2.498.682-3.617.791-2 2.56-3.447 4.676-3.825a6.474 6.474 0 0 1 2.347 0 6.203 6.203 0 0 1 4.678 3.824 9.95 9.95 0 0 1 0 7.232M33.421.127c-6.589 0-11.936 5.344-11.936 11.937 0 6.588 5.347 11.933 11.936 11.933 6.594 0 11.937-5.345 11.937-11.933 0-6.593-5.343-11.937-11.937-11.937zm12.017.677h5.968l5.573 9.682L62.552.804h5.966l-9.006 14.188v8.331h-5.066v-8.331L45.438.804M80.549 19.61c.398 0 .793-.04 1.172-.106a6.193 6.193 0 0 0 4.676-3.824 9.877 9.877 0 0 0 0-7.231 6.197 6.197 0 0 0-4.676-3.826 6.674 6.674 0 0 0-2.35 0 6.193 6.193 0 0 0-4.674 3.825 9.872 9.872 0 0 0-.684 3.615c0 1.276.243 2.495.684 3.616a6.188 6.188 0 0 0 4.674 3.824 6.72 6.72 0 0 0 1.178.107m-11.938-7.547c0-6.592 5.342-11.938 11.938-11.938 6.589 0 11.936 5.344 11.936 11.938C92.484 18.651 87.138 24 80.549 24c-6.596 0-11.938-5.349-11.938-11.937zm58.432 2.347l-3.316-8.897-3.32 8.897h6.636m1.47 3.94h-9.585l-1.844 4.959h-5.637L120.57.788h6.304L136 23.309h-5.63l-1.857-4.959zM112.936.804h-19.35v4.278h7.145l-.002 18.241h5.069l-.002-18.241h7.14V.804" />
          </svg >

          <div className='hidden md:block w-3/4'>
            <ul className='flex flex-row gap-5 items-center uppercase text-xs font-bold md:mt-3 md:-ml-10'>
              <li className='tracking-wider underline-offset-8 hover:underline hover:cursor-pointer' onMouseEnter={() => { setShowProducts(true), setShowService(false) }}>
                <a >Products</a>
              </li>
              <li className='tracking-wider underline-offset-8 hover:underline hover:cursor-pointer'
                onMouseEnter={() => { setShowService(true), setShowProducts(false) }}>
                <a >Service</a>
              </li>
              <li className='tracking-wider underline-offset-8 hover:underline hover:cursor-pointer' onMouseEnter={() => { setShowService(false), setShowProducts(false) }}>
                <Link to={'/explore'}  >Buy Online</Link></li>
              <li className='tracking-wider underline-offset-8 hover:underline hover:cursor-pointer'>
                <a  >Toyota India</a>
              </li>
            </ul>
          </div>

          <div className="">
            <Link to={{
              pathname: '/login'
            }}>
              <svg className="ml-3 md:h-8 md:w-12 h-6 hover:cursor-pointer md:-mb-2" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5.5C5 4.11929 6.11929 3 7.5 3C8.88071 3 10 4.11929 10 5.5C10 6.88071 8.88071 8 7.5 8C6.11929 8 5 6.88071 5 5.5Z" fill="#000000" />
                <path fillRule="evenodd" clipRule="evenodd" d="M7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0ZM1 7.5C1 3.91015 3.91015 1 7.5 1C11.0899 1 14 3.91015 14 7.5C14 9.34956 13.2275 11.0187 11.9875 12.2024C11.8365 10.4086 10.3328 9 8.5 9H6.5C4.66724 9 3.16345 10.4086 3.01247 12.2024C1.77251 11.0187 1 9.34956 1 7.5Z" fill="#000000" />
              </svg>
            </Link>
          </div>
          <Link to={'/contact'} className='w-10'>
            <img className='w-6 md:w-7 h-5 md:h-7 hover:cursor-pointer' src="../src/assets/call-logo.png" alt="" />
          </Link>
        </div>
      </nav>
    </header>
    </>
  );
}
export default Header;