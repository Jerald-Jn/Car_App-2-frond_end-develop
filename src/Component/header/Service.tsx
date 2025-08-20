import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";

function Service(){

    const {showService, setShowService}=useContext(StoreContext)
    return (
        <>
        { showService &&
            (
                <div className="ml-[17rem] hidden md:block w-32 absolute transform flex-col top-0 md:px-4 md:pb-2 bg-black/10" onMouseLeave={()=>{setShowService(false)}}>
                    <div><Link  to={'/service'} className="text-black text-sm font-medium tracking-wide">Service</Link></div>
                    <div><a href="" className="text-black text-sm font-medium tracking-wide">Safety Recall</a></div>
                </div>
        
            )
        }
        </>
    );
}
export default Service;