import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Cars, type CartData } from "../../Interface/DataModel";
import { StoreContext } from "../context/StoreContext";
import Products from "../header/Products";
import Service from "../header/Service";
import Menubar from "../menu_bar/Menubar";
import { addCartApi } from "../../Api";

function Explore() {
    const { carsList, menu, showProducts, showService } = useContext(StoreContext);
    let token=localStorage.getItem('token')
    const [cart, setCart] = useState<CartData>({ items: {} });
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


    return (
        <>
        <div>
            { 
            <div className="relative z-50">
                {menu && (
                    <Menubar />
                )
                }
                {/* When we hover on Product is render "Products" component */}
                {
                    showProducts && (<Products />)
                }
                {/* When we hover on Service is render "Service" component */}
                {
                    showService && (<Service />)
                }
                {
                    !token && <h1 className="text-center mt-5 font-semibold text-2xl text-red-500">Before add Cart, Please login</h1>
                }
            </div>
            }
                <div key={carsList} className="grid-cols-1 grid md:grid-cols-4 md:mx-10 mx-auto">
                    {
                        carsList.map((car: Cars) => (
                            <div key={car.carId} className="my-5 mx-2 scale-95 bg-white rounded-lg shadow-md overflow-hidden max-w-sm w-full *
                                    hover:scale-100  hover:shadow-2xl hover:rounded-2xl hover:border-2 duration-1000 dark:text-white dark:bg-black/30">
                                <div className="relative">
                                    <img src={car.carImage} alt="Product image" className="w-full h-64 object-cover object-center" />
                                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>
                                    <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
                                        <svg className="w-4 h- text-center text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                    </button>
                                </div>
                                <div className="p-4 ">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800 mb-1 dark:text-white">{car.model}</h2>
                                            <p className="text-2xl text-red-600">{car.make}</p>
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        <p className="text-lg font-bold text-green-600">${car.price}</p>
                                        <p className="text-sm text-gray-500 line-through dark:text-white">${car.price * 100}</p>
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
                                                    </svg>Add to Cart
                                                </button>
                                        }
                                        <button onClick={() => navigate(`/car/${car.model}`)} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-200">
                                            Quick View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
export default Explore;