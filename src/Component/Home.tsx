import { useEffect, useState } from 'react'
import Products from './Products';
import Header from './Header';
import Service from './Service';
import Footer from './Footer';
import Menubar from './Menubar';
// import { getCarByCarName, getCarImage, getListOfCars } from '../Api';
// import { Car, type Cars } from '../Interface/DataModel';



function Home() {
  const images = ['./src/assets/car-1.jpg', "./src/assets/car-2.jpg", './src/assets/car-3.jpg', './src/assets/car-4.jpg'
    , './src/assets/car-5.jpg', './src/assets/car-6.jpg']

  const [index, setIndex] = useState(0);
  const [showProducts, setShowProducts] = useState(false);
  const [showService, setShowService] = useState(false);
  const [menu, setMenu] = useState(false);



  useEffect(() => {
    setInterval(() => {
      setIndex(pre => pre === images.length - 1 ? 0 : pre + 1);
    }, 10000)
  }, []);

  function changeImage(changeIndex: string) {
    setIndex(pre => {
      if (changeIndex === 'previous') {
        return pre === 0 ? images.length - 1 : pre - 1;
      }
      else {
        return pre === images.length - 1 ? 0 : pre + 1;
      }
    });
  }

  
  return (
    <>
    {/* Header Component */}
      <Header setShowProducts={setShowProducts} setShowService={setShowService} setMenu={setMenu} menu={menu}></Header>

      {/* Hero section */}
      <div>
        <div className='relative'>
          {
            <a href="">
              <img className='min-w-full' src={images[index]} alt="" />
            </a>
          }
          {/* Menu bar for small screen */}
          {menu && (
            <Menubar />
          )
          }
          {/* When we hover on Product is render "Products" component */}
          {
            true && (<Products showProducts={showProducts} setShowProducts={setShowProducts} />)
          }
          {/* When we hover on Service is render "Service" component */}
          {
            true && (<Service showService={showService} setShowService={setShowService} />)
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
        <a href="">
          <img src="./src/assets/banner.jpg" alt="" />
        </a>
      </div>

      {/* Car collection Section */}
      <div className='mt-5 mb-5'>
        <div className=''>
          <h1 className='text-center tracking-wide font-bold text-3xl'>Discover the Toyota range</h1>
          <div className=''>
            <ul className='grid grid-cols-2 md:grid-cols-4 grid-flow-row space-x-5 space-y-5  items-center'>
              <a href="" className='md:ml-5 md:mt-5 bg-white text-center'>
                <li className=' flex justify-center'>
                  <img className='' src="./src/assets/Glanza.jpg" alt="" />
                </li>
                <h2 className=' font-bold uppercase -mt-3'>Glanza</h2>
                <p className='font-medium tracking-wider -mt-1'>From INR 6,90,000*</p>
              </a>
              <a href="" className='md:ml-5 bg-white h-40 text-center'>
                <li className='flex justify-center '>
                  <img className='p-2' src="./src/assets/fortuner.png" alt="" />
                </li>
                <h2 className='text-center font-bold uppercase -mt-4'>Fortuner</h2>
                <p className='font-medium tracking-wider -mt-1'>From INR 6,90,000*</p>
              </a>
              <a href="" className='bg-white h-40 text-center'>
                <li className=' flex justify-center '>
                  <img className='' src="./src/assets/innova-crysta.png" alt="" />
                </li>
                <h2 className='text-center uppercase font-bold md:-mt-2'>innova crysta</h2>
                <p className='font-medium tracking-wider -mt-1'>From INR 6,90,000*</p>
              </a>
              <a href="" className='bg-white h-40 text-center'>
                <li className='flex justify-center'>
                  <img className='md:mt-1' src="./src/assets/innova-hycross.png" alt="" />
                </li>
                <h2 className='text-center uppercase font-bold'>innova hycross </h2>
                <p className='font-medium tracking-wider -mt-1'>From INR 6,90,000*</p>
              </a>
              <a href="" className='bg-white h-40 text-center'>
                <li className='flex justify-center'>
                  <img className='md:p-2 mt-2 md:mt-1' src="./src/assets/land-cruser.png" alt="" />
                </li>
                <h2 className='text-center uppercase -mt-2.5 md:-mt-4 font-bold'>land cruser</h2>
                <p className='font-medium tracking-wider md:-mt-1'>From INR 6,90,000*</p>
              </a>
              <a href="" className='bg-white h-40 text-center'>
                <li className='flex justify-center'>
                  <img className='p-2' src="./src/assets/legender.png" alt="" />
                </li>
                <h2 className='text-center uppercase -mt-4 font-bold'>legender</h2>
                <p className='font-medium tracking-wider -mt-1'>From INR 6,90,000*</p>
              </a>
              <a href="" className='bg-white h-40 text-center'>
                <li className='flex justify-center'>
                  <img className='p-2 md:-mt-1' src="./src/assets/rumion.png" alt="" />
                </li>
                <h2 className='text-center uppercase -mt-3 font-bold'>rumion</h2>
                <p className='font-medium tracking-wider -mt-1'>From INR 6,90,000*</p>
              </a>
              <a href="" className='bg-white h-40 text-center'>
                <li className='flex justify-center'>
                  <img className='-md:mt-1.5 p-2' src="./src/assets/urban-cruiser-hyryder.png" alt="" />
                </li>
                <h2 className='text-center uppercase -mt-3 font-bold'>urban cruiser hyryder</h2>
                <p className='font-medium tracking-wider -mt-1'>From INR 6,90,000*</p>
              </a>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </>
  )
}
export default Home;