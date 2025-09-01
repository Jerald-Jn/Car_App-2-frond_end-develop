import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addCartApi, getCarByCarName } from "../../Api";
import type { Cars, CartData } from "../../Interface/DataModel";
import { StoreContext } from "../context/StoreContext";
import Products from "../header/Products";
import Menubar from "../menu_bar/Menubar";

function Car() {

    const { menu, showProducts, setMenu } = useContext(StoreContext);
    const [car, setCar] = useState<Cars>();
    const [cart, setCart] = useState<CartData>({ items: {} });
    let token = localStorage.getItem('token')
    let updateCart: CartData = {
        items: {}
    };
    const { id } = useParams();
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const [data, setData] = useState({
        color: "", fuelType: "", transmission: ""
    })


    useEffect(() => {
        getImage(id);
        setMenu(false)
    }, [id]);

    useEffect(() => {
        setMenu(false)
    }, [])

    async function getImage(model: string | any) {
        const tempCar = await (await getCarByCarName(model));
        setCar(tempCar[0])
        console.log(tempCar[0].images)
        setData((pre) => ({
            ...pre,
            color: tempCar[0].color,
            fuelType: tempCar[0].fuelType,
            transmission: tempCar[0].transmission
        }))
    }

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
    }, [updateCart]);


    function onClickHandler(event: any) {
        const { name, value } = event.target;
        setData((pre: any) => ({
            ...pre,
            [name]: value
        }))
    }

    return (
        <>
            {
                car &&
                <div className="relative">
                    {/* Menu bar for small screen */}
                    {menu && (
                        <Menubar />
                    )
                    }
                    {/* When we hover on Product is render "Products" component */}
                    {
                        showProducts && (<Products />)
                    }

                    {
                        !token &&
                        <div className="flex mix-blend-multiply justify-center">
                            <h1 className="text-center mt-5 font-semibold text-2xl text-red-500">Before add Cart, Please
                                <Link to={{ pathname: '/login' }} className="text-center mt-5 font-semibold text-2xl text-blue-500"> login</Link>

                            </h1>
                        </div>
                    }
                    {
                        car &&
                        <div className="dark:text-white">
                            <div className="container mx-auto px-4 py-8">
                                <div className="flex flex-wrap -mx-4">
                                    {/* <!-- Product Images --> */}
                                    <div className="w-full md:w-1/2 px-4 mb-8">
                                        <img src={car.images[index]} alt="Product"
                                            className="w-full h-[24rem] rounded-lg shadow-md mb-4" id="mainImage" />
                                        <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                                            {
                                                car.images.map((image: any, index: any) =>
                                                    <img key={index} src={image} alt="Thumbnail 1"
                                                        className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                                        onMouseEnter={() => setIndex(index)}
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>

                                    {/* <!-- Product Details --> */}
                                    <div className="w-full md:w-1/2 px-4 dark:text-white">
                                        <h2 className="text-3xl font-bold mb-2">{car.model}</h2>
                                        <p className="text-red-600 text-2xl mb-4">{car.make}</p>
                                        <div className="mb-4">
                                            <span className="text-2xl font-bold mr-2"><span className="text-black/80 text-2xl font-bold">$</span> {car.price}</span>
                                            <span className="text-gray-500 line-through"><span className="text-black/80 text-sm font-bold">$</span>{car.price * 1.5}</span>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                className="size-6 text-yellow-500">
                                                <path fill-rule="evenodd"
                                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                className="size-6 text-yellow-500">
                                                <path fill-rule="evenodd"
                                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                className="size-6 text-yellow-500">
                                                <path fill-rule="evenodd"
                                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                className="size-6 text-yellow-500">
                                                <path fill-rule="evenodd"
                                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                className="size-6 text-yellow-500">
                                                <path fill-rule="evenodd"
                                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                            <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
                                        </div>
                                        <p className="text-gray-700 mb-6 dark:text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                            sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                                            lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                                            ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                                            sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.</p>
                                        {/* Fuel type */}
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold mb-2">Fuel Type:</h3>
                                            <div className="flex space-x-2">
                                                <button value={'petrol'} onClick={() => onClickHandler(event)} name="fuelType"
                                                    className="bg-black/20 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:bg-white/50">Petrol</button>
                                                <button value={'diesel'} onClick={() => onClickHandler(event)} name="fuelType"
                                                    className="bg-black/20 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:bg-white/50">Diesel</button>
                                                <button value={'electric'} onClick={() => onClickHandler(event)} name="fuelType"
                                                    className="bg-black/20 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:bg-white/50">Electric</button>
                                            </div>
                                            {
                                                data.fuelType != car.fuelType && <span className="mt-3 text-red-500">Not available</span>
                                            }
                                        </div>
                                        {/* transmission */}
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold mb-2">Transmission:</h3>
                                            <div className="flex space-x-2">
                                                <button value={'auto'} onClick={() => onClickHandler(event)} name="transmission"
                                                    className="bg-black/20 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:bg-white/50">Auto</button>
                                                <button value={'manual'} onClick={() => onClickHandler(event)} name="transmission"
                                                    className="bg-black/20 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:bg-white/50">Manual</button>
                                                <button value={'hybrid'} onClick={() => onClickHandler(event)} name="transmission"
                                                    className="bg-black/20 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:bg-white/50">Hybrid</button>

                                            </div>
                                            {
                                                data.transmission != car.transmission && <span className="mt-3 text-red-500">Not available</span>
                                            }
                                        </div>
                                        {/* color */}
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold mb-2">Color:</h3>
                                            <div className="flex space-x-2">
                                                <button value={'black'} onClick={() => onClickHandler(event)} name="color"
                                                    className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
                                                <button value={'white'} onClick={() => onClickHandler(event)} name="color"
                                                    className="w-8 h-8 bg-white border-2  rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
                                                <button value={'gray'} onClick={() => onClickHandler(event)} name="color"
                                                    className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"></button>
                                                <button value={'blue'} onClick={() => onClickHandler(event)} name="color"
                                                    className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></button>
                                                <button value={'red'} onClick={() => onClickHandler(event)} name="color"
                                                    className="w-8 h-8 bg-red-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"></button>
                                                <button value={'orange'} onClick={() => onClickHandler(event)} name="color"
                                                    className="w-8 h-8 bg-orange-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"></button>

                                            </div>
                                            {
                                                data.color !== car.color && <span className=" text-red-500 mt-3">Not available</span>
                                            }
                                        </div>

                                        <div className="flex space-x-4 mb-6">
                                            {
                                                data.color === car.color && data.fuelType === car.fuelType && data.transmission === car.transmission && token &&
                                                <button onClick={() => addToCart(car)}
                                                    className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                        stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                    </svg>
                                                    Add to Cart
                                                </button>
                                            }

                                            <button
                                                className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" className="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                </svg>
                                                Wishlist
                                            </button>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Features:</h3>
                                            <ul className="list-disc list-inside text-gray-700 dark:text-white">
                                                <li>EngineCapacity - {car.engineCapacity}</li>
                                                <li>Mileage - {car.mileage}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>

            }
        </>
    )
}
export default Car;