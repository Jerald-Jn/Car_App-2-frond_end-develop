import { useState } from "react";
import Header from "./Header";
import Service from "./Service";
import Products from "./Products";
import Menubar from "./Menubar";

function UserDetails() {

    const [showProducts, setShowProducts] = useState(false);
    const [showService, setShowService] = useState(false);
    const [menu, setMenu] = useState(false);

    return (
        <>
            {/* Header navigation section */}
            <Header setShowProducts={setShowProducts} setShowService={setShowService} setMenu={setMenu} menu={menu}></Header>
            <div className="relative bg-blue-400">
                <img className="bg-orange-300" src="./src/assets/car-3.jpg" alt="" />
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
            </div>

            {/* Hero section */}
            <div className="w-fit">
                <img src="./src/assets/banner.jpg" alt="" />
            </div>
        </>
    )
}
export default UserDetails;