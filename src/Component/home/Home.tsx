import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Cars } from '../../Interface/DataModel';
import { StoreContext } from '../context/StoreContext';
import Products from '../header/Products';
import Menubar from '../menu_bar/Menubar';



function Home() {

  const [index, setIndex] = useState(0);

  const { carsList, showProducts, setMenu, menu, load, pageLoad, setPageLoad, setHeaderLoad, setFooterLoad } = useContext(StoreContext);

  useEffect(() => {
    if (carsList.length === 0) return; // don’t start until data is loaded

    const intervalId = setInterval(() => {
      setIndex((pre) => {
        const nextIndex = pre === carsList.length - 1 ? 0 : pre + 1;
        // console.log("Next:", nextIndex, "Prev:", pre);
        return nextIndex;
      });
    }, 10000);

    return () => clearInterval(intervalId); // cleanup
  }, [carsList.length]);

  function changeImage(changeIndex: string) {
    setIndex((pre) => {
      if (changeIndex === 'previous') {
        return pre === 0 ? carsList.length - 1 : pre - 1;
      }
      else {
        return pre === carsList.length - 1 ? 0 : pre + 1;
      }
    });
  }

  useEffect(() => {
    setPageLoad(true)
    setHeaderLoad(false)
    setFooterLoad(false)
    setMenu(false)
    setTimeout(() => {
      if (Array.isArray(carsList)) {
        setPageLoad(false)
        setHeaderLoad(true)
        setFooterLoad(true)
      }
    }, 2000);
  }, [])

  return (
    <>
      {
        pageLoad ?
          <div id="loading-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">
            <svg className="animate-spin h-8 w-8 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>

            <span className="text-white text-3xl font-bold">Loading...</span>
          </div> :
          carsList ?
            <>
              {/* Hero section */}
              <div className=''>
                <div className='relative w-full h-auto'>
                  {carsList.length > 0 && (
                    carsList.map((car: Cars, i: number) =>
                      <a
                        key={car.carId}
                        className={i === index ? 'block' : 'hidden'}
                      >
                        <img className={`w-full h-auto object-cover ${showProducts | load | menu && 'blur-sm'}`} src={car.carImage} alt={car.model} />
                      </a>
                    )
                  )}
                  {/* Menu bar for small screen */}
                  {menu && (
                    <Menubar />
                  )
                  }
                  {/* When we hover on Product is render "Products" component */}
                  {
                    true && (<Products />)
                  }

                  {/* Previous Button (only on medium+ screens) */}
                  <div className={`hidden md:block absolute top-1/2 left-5 -translate-y-1/2 ${showProducts | load | menu && 'blur-sm'}`}>
                    <button
                      className={`bg-white/70 rounded-full p-2 hover:bg-white`}
                      onClick={() => changeImage("previous")}
                    >
                      <svg
                        className="h-10 w-10 cursor-pointer"
                        fill="#000000"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M 26 6 L 6 15.21875 L 6 16.78125 L 26 26 L 26 23.84375 L 9.46875 16 L 26 8.15625 Z" />
                      </svg>
                    </button>
                  </div>

                  {/* Next Button (only on medium+ screens) */}
                  <div className={`hidden md:block absolute top-1/2 right-5 -translate-y-1/2 ${showProducts | load | menu && 'blur-sm'}`}>
                    <button
                      className={`bg-white/70 rounded-full p-2 hover:bg-white`}
                      onClick={() => changeImage("next")}
                    >
                      <svg
                        className="h-10 w-10 cursor-pointer"
                        fill="#000000"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M 6 6 L 6 8.15625 L 22.53125 16 L 6 23.84375 L 6 26 L 26 16.78125 L 26 15.21875 Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/*Banner Section */}
              <div className={`${showProducts | load | menu && 'blur-sm'}`}>
                <a  >
                  <img src="./banner.jpg" className={`w-full h-auto object-cover`} alt="" />
                </a>
              </div>

              <div className={`text-center p-10 ${showProducts | load | menu && 'blur-sm'}`}>
                <h1 className='tracking-wide font-bold text-2xl md:text-3xl'>Discover the <span className='text-blue-700'>TOYOTA</span> range</h1>
              </div>

              {/* <!--  Grid Section - Starts Here --> */}
              <section id="Projects"
                className={`mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-8 mt-10 mb-10 px-4 ${showProducts | load | menu && 'blur-sm'}`}>
                {
                  carsList.map((car: Cars) =>
                    <div key={car.carId} className="md:mx-1 lg:mx-8 mx-12 overflow-hidden w-[15rem] flex rounded-xl scale-90 duration-1000 hover:scale-100 hover:shadow-2xl hover:bg-white/40 dark:mix-blend-multiply  dark:hover:mix-blend-normal">
                      <Link to={`/car/${car.model}`} className='px-8'>
                        <img src={car.carLogo}
                          alt={car.model} className=" object-cover rounded-t-xl mix-blend-multiply " />
                        <div className="flex flex-col px-10 py-3 w-72">
                          <span className=" mr-3 uppercase">{car.make}</span>
                          <div className="flex items-center">
                            <p className="text-base font-bold text-red-500 truncate block capitalize">{car.model}</p>
                          </div>
                          <p className="text-lg font-semibold text-black cursor-auto">&#8377;{car.price}</p>

                        </div>
                      </Link>
                    </div>
                  )}
              </section>

            </> : (<h1 className='translate-y-52 tracking-wide text-center font-bold text-4xl'>404 Not Found</h1>)
      }

    </>
  )
}
export default Home;