import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import type { Cars } from "../../Interface/DataModel";
import { Link } from "react-router-dom";

function Products() {

    const { carsList, setShowProducts, showProducts } = useContext(StoreContext);

    return (
        <>
            {
                showProducts &&
                (
                    <div className="hidden md:block absolute transform top-0 bg-white w-full shadow-md"
                        onMouseEnter={() => { setShowProducts(true) }}
                        onMouseLeave={() => { setShowProducts(false) }}>
                        <ul className="space-x-5 mb-3 grid grid-flow-row grid-cols-5 w-full items-center ">
                            {
                                carsList.length>0?
                                (
                                    carsList.map((car: Cars) => 
                                    <Link to={`/car/${car.model}`} key={car.carId} className="m-5 hover:underline hover:underline-offset-4">
                                        <li className="flex flex-col items-center">
                                            <img className="h-3/4 w-2/4 mix-blend-multiply" src={car.carLogo} alt={car.model} />
                                            <p className="font-semibold uppercase text-sm">{car.model}</p>
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