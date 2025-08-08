import { useContext } from "react";
import Header from "../header/Header";
import Service from "../header/Service";
import Products from "../header/Products";
import Menubar from "../menu_bar/Menubar";
import { CarContext } from "../context/StoreContext";

function UserDetails() {

    const {showProducts, showService, menu}=useContext(CarContext);

    return (
        <>
            {/* Header navigation section */}
            <Header ></Header>
            <div className="relative bg-blue-400">
                <img className="bg-orange-300" src="./src/assets/car-3.jpg" alt="" />
                {/* Menu bar for small screen */}
                {menu && (
                    <Menubar />
                )
                }
                {/* When we hover on Product is render "Products" component */}
                {
                    showProducts && (<Products  />)
                }
                {/* When we hover on Service is render "Service" component */}
                {
                    showService && (<Service />)
                }
            </div>

            {/* Hero section */}
            <div className="w-fit">
                <img src="./src/assets/banner.jpg" alt="" />
            </div>
        </>
    )
}
export default UserDetails;