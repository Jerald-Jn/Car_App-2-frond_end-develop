import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addCartApi } from "../../Api";
import { type Cars, type CartData } from "../../Interface/DataModel";
import { StoreContext } from "../context/StoreContext";
import Products from "../header/Products";
import Menubar from "../menu_bar/Menubar";

function Explore() {
    const { carsList, menu, showProducts, setMenu, load, pageLoad, setPageLoad, setHeaderLoad, setFooterLoad } = useContext(StoreContext);
    let token = localStorage.getItem('token')
    const [cart, setCart] = useState<CartData>({ items: {} });
    const [filterCars, setFilterCars] = useState<any>();
    const [filters, setFilters] = useState({
        fuelType: '', transmission: ''
    })
    const navigate = useNavigate();
    let updateCart: CartData = {
        items: {}
    };

    function addToCart(car: Cars) {

        setCart((prev: any) => {
            const existingItem = prev.items[car.carId];
            console.log("existingItem -> ", existingItem)
            updateCart = {
                ...prev,
                items: {
                    [car.carId]: {
                        model: car.model,
                        imageUrl: car.carLogo,
                        price: car.price,
                        quantity: existingItem ? existingItem.quantity + 1 : 1,
                    },
                },
            };

            console.log(updateCart);
            return updateCart;
        });
    }

    useEffect(() => {
        if (cart?.items && Object.keys(cart.items).length > 0) {
            console.log(cart)
            const addCart = async () => {
                try {
                    const response = await addCartApi(cart);
                    console.log("Cart synced:", response);
                    response ? navigate('/cart') : navigate('/explore')
                } catch (error) {
                    throw error;
                }

            }
            addCart();
        }
        console.log("cart")
    }, [cart]);

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
        }, 500);
        setFilterCars(carsList)
    }, [])

    const carsfilter = (event: any) => {
        const { name, value } = event.target
        let newFilters = {
            ...filters,
            [name]: value
        }
        setFilters(newFilters)
        setFilterCars(carsList.filter((values: any) => {
            let newFuelType = newFilters.fuelType == '' || values.fuelType == newFilters.fuelType;
            let newTransmission = newFilters.transmission == '' || values.transmission == newFilters.transmission;
            console.log(newFuelType, newTransmission)
            return newFuelType && newTransmission;
        }))
    }

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
                    </div>
                    : carsList ?
                        <div>
                            {
                                <div className="relative">
                                    {menu && (
                                        <Menubar />
                                    )
                                    }
                                    {/* When we hover on Product is render "Products" component */}
                                    {
                                        showProducts && (<Products />)
                                    }
                                    {
                                        !token && <h1 className="text-center mt-5 font-semibold text-2xl text-red-500">Before add Cart,
                                            <Link to={'/login'} className="text-blue-500"><span className="text-red-500"> Please</span> login</Link></h1>
                                    }
                                </div>
                            }
                            <div className="flex flex-col mt-5 justify-center md:flex-row gap-3">
                                <select id="fuelType" name="fuelType" onChange={() => carsfilter(event)}
                                    className="w-[8rem] h-10 border-2 dark:bg-black/10 dark:text-white focus:outline-none focus:border-black text-black rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                                    <option className="dark:text-black" value="">All</option>
                                    <option className="dark:text-black" value="petrol">Petrol</option>
                                    <option className="dark:text-black" value="diesel">Diesel</option>
                                    <option className="dark:text-black" value="electric">Electric</option>
                                </select>
                                <select id="transmission" name="transmission" onChange={() => carsfilter(event)}
                                    className="w-[8rem] h-10 border-2 focus:outline-none dark:bg-black/10 dark:text-white focus:border-black text-black rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                                    <option className="dark:text-black" value="">All</option>
                                    <option className="dark:text-black" value="manual">Manual</option>
                                    <option className="dark:text-black" value="auto">Auto</option>
                                    <option className="dark:text-black" value="hybrid">Hybrid</option>
                                </select>
                            </div>
                            {
                                filterCars?.length>0 ?
                                    <div key={carsList} className={`grid-cols-1 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:mx-10 mx-3 ${showProducts | load | menu && 'blur-sm'}`}>
                                        {

                                            (filterCars.map((car: Cars) => (
                                                <div key={car.carId} className="my-5 md:mx-2 scale-90 bg-white rounded-lg shadow-md overflow-hidden max-w-sm w-full *
                                    hover:scale-100 duration-1000  hover:shadow-2xl hover:rounded-2xl hover:border-2 dark:text-white dark:bg-black/30">
                                                    <div className="relative">
                                                        <Link to={`/car/${car.model}`}>
                                                            <img src={car.carImage} alt="Product image" className="w-full h-64 object-cover object-center" />
                                                        </Link>
                                                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>
                                                    </div>
                                                    <div className="p-4 ">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <h2 className="text-xl font-semibold text-gray-800 mb-1 dark:text-white">{car.model}</h2>
                                                                <p className="text-2xl text-red-600">{car.make}</p>
                                                            </div>
                                                        </div>
                                                        <div className="py-2">
                                                            <p className="text-lg font-bold text-green-600">
                                                                <span className="text-black/50 text-base">$</span>{car.price}</p>
                                                            <p className="text-sm text-gray-500 line-through dark:text-white">
                                                                <span className="text-black/50 text-sm">$</span>{car.price * 100}</p>
                                                        </div>
                                                        <div className="flex-col flex  mb-2">
                                                            <div>
                                                                <span className="font-bold text-gray-700  uppercase dark:text-white">transmission - </span>
                                                                <span className="font-bold text-blue-600 dark:text-white">{car.transmission.toUpperCase()}</span>
                                                                <span className="font-bold text-blue-600 dark:text-white">-{car.year}</span>
                                                            </div>
                                                            <span className="text-gray-600 text-sm ml-2 dark:text-white">(4.5/5)</span>
                                                        </div>
                                                        <p className="text-gray-600 text-sm mb-4 dark:text-white">A stylish and practical hatchback with a premium feel, known for fuel efficiency, comfort, and Toyota’s reliability.</p>
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div className="flex items-center">
                                                                <i className="fas fa-clock text-blue-500 mr-2"></i>
                                                                <span className="text-sm text-gray-600 dark:text-white">In Stock</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            {
                                                                token &&
                                                                <button onClick={() => addToCart(car)} className="flex bg-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-200 cursor-pointer">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24"
                                                                        stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                                    </svg><span className="">Add to Cart</span>
                                                                </button>
                                                            }
                                                            <button onClick={() => navigate(`/car/${car.model}`)} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-200">
                                                                Quick View
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )))
                                        }
                                    </div> : <h1 className="w-full text-center text-3xl h-[24rem] mt-10">No car available</h1>
                            }
                        </div>
                        : (<h1 className='translate-y-52 tracking-wide text-center font-bold text-4xl'>404 Not Found</h1>)
            }

        </>
    )
}
export default Explore;