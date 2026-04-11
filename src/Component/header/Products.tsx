import { useContext } from "react";
import { StoreContext } from "../../store/StoreContext";
import type { Cars } from "../../Interface/DataModel";
import { Link } from "react-router-dom";

function Products() {

    const { carsList, setShowProducts } = useContext(StoreContext);

    return (
        <>
            {
                <div className="hidden md:block absolute transform md:top-[4.6rem] top-12 border-black/50 border-y-2 dark:top-0 dark:border-none bg-white dark:bg-white/60 w-full shadow-md z-50"
                    onMouseEnter={() => { setShowProducts(true) }}
                    onMouseLeave={() => { setShowProducts(false) }}>
                    <ul className="space-x-5 mb-3 grid grid-flow-row grid-cols-5 w-full items-center ">
                        {
                            (carsList.length > 0 && Array.isArray(carsList)) &&
                                (
                                    carsList.map((car: Cars) =>
                                        <Link to={`/car/${car.model}`} key={car.carId} className="m-5 scale-75 hover:scale-95 duration-700 hover:underline-offset-4"
                                            onClick={() => { setShowProducts(false) }}>
                                            <li className="flex flex-col items-center">
                                                <img className="h-3/4 w-2/4 mix-blend-multiply" src={car.carLogo} alt={car.model} />
                                                <p className="font-semibold uppercase text-sm dark:text-black">{car.model}</p>
                                            </li>
                                        </Link>
                                    ))

                        }
                    </ul >
                </div >
            }
        </>
    );
}
export default Products;