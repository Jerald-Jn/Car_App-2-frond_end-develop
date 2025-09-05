import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import type { Cars } from "../../Interface/DataModel";
import { Link } from "react-router-dom";

function Products() {

    const { carsList, setShowProducts, showProducts } = useContext(StoreContext);

    return (
        <>
            {
                true &&
                (
                    <div className="hidden md:block absolute transform -top-1 border-t-2 dark:top-0 dark:border-none bg-white dark:bg-white/60 w-full shadow-md z-20"
                        onMouseEnter={() => { setShowProducts(true) }}
                        onMouseLeave={() => { setShowProducts(false) }}>
                        <ul className="space-x-5 mb-3 grid grid-flow-row grid-cols-5 w-full items-center ">
                            {
                                carsList.length>0?
                                (
                                    carsList.map((car: Cars) => 
                                    <Link to={`/car/${car.model}`} key={car.carId} className="m-5 hover:underline scale-75 hover:scale-95 duration-700 hover:underline-offset-4"
                                        onClick={()=>{setShowProducts(false)}}>
                                        <li className="flex flex-col items-center">
                                            <img className="h-3/4 w-2/4 mix-blend-multiply" src={car.carLogo} alt={car.model} />
                                            <p className="font-semibold uppercase text-sm dark:text-black">{car.model}</p>
                                        </li>
                                    </Link>
                                )):(<h1>Not Found</h1>

                                )
                            }

                        </ul >
                    </div >
                )
            }
        </>
    );
}
export default Products;