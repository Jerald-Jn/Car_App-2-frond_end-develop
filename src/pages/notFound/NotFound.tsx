import { useContext, useEffect, useRef } from "react";
import { StoreContext } from "../../store/StoreContext";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const { fetchCars, carsList } = useContext(StoreContext);
  const navigate = useNavigate();
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      fetchCars();
    }, 20000);

    return () => {
      if (timerRef.current){ 
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(carsList) && carsList.length > 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      navigate(-1); 
    }
  }, [carsList]);

    return (
        <>
            <div className={`min-h-screen h-[2rem] md:h-[34rem] flex flex-col justify-center items-center`}>
                <h1 className=" text-center text-black md:text-6xl text-4xl font-bold p-8">Page Not Found</h1>
            </div>
        </>
    )
}
export default NotFound;