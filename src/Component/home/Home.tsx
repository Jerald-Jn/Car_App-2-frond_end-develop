import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Cars } from '../../Interface/DataModel';
import { StoreContext } from '../context/StoreContext';
import Products from '../header/Products';
import Menubar from '../menu_bar/Menubar';



function Home() {

  const [index, setIndex] = useState(0);

  const { carsList, showProducts, setMenu, menu } = useContext(StoreContext);

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
    setMenu(false)
  }, [])

  return (
    <>

      {/* Hero section */}
      <div>
        <div className='relative'>
          {carsList.length > 0 && (
            carsList.map((car: Cars, i: number) =>
              <a
                key={car.carId}
                className={i === index ? 'block' : 'hidden'}
              >
                <img className="min-w-full" src={car.carImage} alt={car.model} />
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
            showProducts && (<Products/>)
          }

          {/* Change Image use Previos button */}
          <div className='hidden md:block absolute top-1/2 left-5'>
            <button className='bg-white/50' onClick={() => changeImage('previous')}>
              <svg className='h-20 w-15 cursor-pointer' fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 26 6 L 6 15.21875 L 6 16.78125 L 26 26 L 26 23.84375 L 9.46875 16 L 26 8.15625 Z" /></svg>
            </button>
          </div>
          {/* Change image using Next button */}
          <div className=' hidden md:block absolute top-1/2 right-5'>
            <button className='bg-white/50' onClick={() => changeImage('next')}>
              <svg className='h-20 w-15 cursor-pointer' fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 6 6 L 6 8.15625 L 22.53125 16 L 6 23.84375 L 6 26 L 26 16.78125 L 26 15.21875 Z" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/*Banner Section */}
      <div>
        <a  >
          <img src="./src/assets/car pic/banner.jpg" alt="" />
        </a>
      </div>

      <div className="text-center p-10">
          <h1 className='text-center tracking-wide font-bold text-3xl'>Discover the <span className='text-blue-700'>TOYOTA</span> range</h1>
      </div>

      {/* <!--  Grid Section - Starts Here --> */}
      <section id="Projects"
          className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-5 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-10">
            {
            carsList.map((car: Cars) =>
          <div key={car.carId} className="w-60 flex rounded-xl duration-500 hover:scale-110 hover:shadow-2xl bg-white/80">
              <Link to={`/car/${car.model}`}  className='px-8'>
                  <img src={car.carLogo}
                          alt={car.model} className=" object-cover rounded-t-xl mix-blend-multiply" />
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
      
    </>
  )
}
export default Home;