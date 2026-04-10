import { useContext, useEffect } from "react";
import { StoreContext } from "../store/StoreContext";
import { TriangleAlert, X } from "lucide-react";

function Popup(){
    const { popDetails, setPopDetails } = useContext(StoreContext);

    function close() {
        setPopDetails({
            title : '',
            msg : ''
        });
    }

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setPopDetails({
                title: '',
                msg: '',
            })
        },10000);
        return ()=>{
            clearTimeout(timer);
        }
    },[])

    return (
        <>
        {
                <div className="fixed bg-black/60 inset-0 z-50 w-full flex flex-col justify-start items-center h-full backdrop-blur-sm">
                    <div className="flex flex-col text-white rounded-3xl bg-black justify-evenly transform translate-y-24 max-w-[24rem] min-w-[20rem] lg:h-[18rem] mx-4 p-3 items-center gap-5">
                        <div className="flex flex-row justify-center lg:translate-y-2 items-center w-full">
                            {/* <h1 className="text-3xl text-center">{  popDetails.title?? popDetails.title }</h1> */}
                            { 
                                popDetails.title && <X className="absolute transform md:translate-x-32 translate-y-3 md:-translate-y-2 lg:translate-x-32 translate-x-36 cursor-pointer h-10 w-10" onClick={close}/>
                            }
                        </div>
                        {
                            popDetails.icon  || <TriangleAlert  className="popup text-red-600"/>
                        }
                        <p className={`${popDetails.msg && 'text-2xl'} mx-5`}>{ popDetails.msg?? popDetails.msg}</p>
                    </div>
                </div>
        }
        </>
    )
}
export default Popup;