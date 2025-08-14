import { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import Menubar from "../menu_bar/Menubar";
import Products from "../header/Products";
import Service from "../header/Service";
import type { Cars } from "../../Interface/DataModel";
import { useNavigate } from "react-router-dom";
import { addCart } from "../Api";

function Explore(){
    const {carsList, menu, showProducts,showService}=useContext(StoreContext);
    const navigate=useNavigate();
    const [view,setView]=useState('');
    function addToCart(model:string) {
        const response=addCart(model);
        console.log(response)
        navigate(`/cart`)
    }

    return (
        <>
        <div className="relative">
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
                    carsList.map((car:Cars)=>(
                        <div className="py-8 my-10" key={car.carId}>
                            <div className=" md:mx-24 px-4 sm:px-6 lg:px-1">
                                <div className="flex flex-col md:flex-row md:-mx-4 " onMouseEnter={()=>setView(car.carId)} onMouseLeave={()=>setView('')}>
                                    <div className="md:flex-1">
                                        <div className={"h-[460px] rounded-lg bg-gray-300  mb-4"} onClick={()=>navigate(`/car/${car.model}`)} >
                                            <img className="w-full h-full object-cover object-center" src={car.carImage} alt={car.model} />
                                        </div>
                                    </div>
                                    { view &&
                                        <div className={car.carId==view?"block md:flex-1 px-4 duration-1000 hover:scale-105 hover:shadow-2xl hover:rounded-2xl hover:mx-10 hover:border-2 transform py-5":"hidden"} >
                                        <h2 className="text-2xl font-bold text-red-800 uppercase mb-2">{car.model}</h2>
                                        <p className="text-gray-600    text-sm mb-4">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                                            ante justo. Integer euismod libero id mauris malesuada tincidunt.
                                        </p>
                                        <div className="grid grid-cols-2 mb-4">
                                            <div className="">
                                                <span className="font-bold text-gray-700   ">&#8377;</span>
                                                <span className="font-bold text-blue-600">{car.price}</span>
                                                <p></p>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-700  uppercase ">Engine Capacity - </span>
                                                <span className="font-bold text-blue-600   ">{car.engineCapacity}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-700  uppercase "> fuelType - </span>
                                                <span className=" font-bold text-blue-600   ">{car.fuelType.toUpperCase()}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-700 uppercase  ">mileage - </span>
                                                <span className="font-bold text-blue-600">{car.mileage}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-700  uppercase ">transmission - </span>
                                                <span className="font-bold text-blue-600">{car.transmission.toUpperCase()}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-700  uppercase ">year - </span>
                                                <span className="font-bold text-blue-600">{car.year}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="font-bold text-gray-700   ">Product Description:</span>
                                            <p className="text-gray-600    text-sm mt-2">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                                sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                                                lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                                                ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                                                sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                                            </p>
                                        </div>
                                        <button onClick={()=>addToCart(car.model)}
                                            className="md:mt-28 mt-5 py-2 px-4 bg-blue-500 text-white rounded-xl hover:bg-red-600/80 active:bg-blue-700 disabled:opacity-50 w-full flex items-center justify-center">
                                            Add to cart
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </button>
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default Explore;