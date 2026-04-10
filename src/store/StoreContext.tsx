import { createContext, useEffect, useRef, useState } from 'react';
import { PaymentRequest, type Cars } from '../Interface/DataModel';
import { getListOfCars } from '../Api';
import { TriangleAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Create and export the "React Context" global store, this context will be used by components to access global data
export const StoreContext = createContext<any>(null);


// Declare "Provider Component", it wraps the app and provides global state values to all children component via context
export const StoreContextProvider = (props: any) => {

  const [carsList, setCarsList] = useState<any[]>([]);
  const token = useRef<string | any>(sessionStorage.getItem('token'));
  const [showProducts, setShowProducts] = useState(false);
  const [menu, setMenu] = useState(false);
  const [totals, setTotals] = useState({ subTotal: 0, tax: 0, shipping: 0, total: 0 });
  const [customer, setCustomer] = useState(PaymentRequest)
  const [car, setCar] = useState<Cars[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false)
  const [logouting, setLogouting] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);
  const [pathCheck, setPathCheck] = useState('');
  const [popDetails, setPopDetails] = useState({
    title: '',
    msg: '',
    icon: <></>
  });
  const navigate = useNavigate();

  const getTotal = async (cartDetails: any) => {
    let tempTotal = 0;
    let subTotal = 0;
    for (let key in cartDetails) {
      let item = cartDetails[key];
      tempTotal = tempTotal + item.price * item.quantity;

    }
    subTotal = subTotal + tempTotal;
    let tax = Math.ceil(tempTotal * 0.1);
    const shipping = Math.ceil(tempTotal / 100);
    const totals = Math.ceil(subTotal + tax + shipping);
    setTotals((prev) => ({ ...prev, subTotal: subTotal, tax: tax, shipping: shipping, total: totals }));
  };

  const serverTimer1 = useRef<ReturnType<typeof setInterval> | null>(null);
  // const serverTimer2 = useRef<ReturnType<typeof setInterval> | null>(null);
  async function fetchCars() {
    try {
      serverTimer1.current = setInterval(() => {
        setPopDetails({
          title: 'Server Issue',
          msg: 'Server is waking up. Please be patient...',
          icon: <TriangleAlert className="popup" />
        });
      }, 10000);
      const listOfCars = await getListOfCars();
      setCarsList(listOfCars);
      setPageLoad(false); // stop loading after successful 
      if (serverTimer1.current) {
        clearInterval(serverTimer1.current);
        // clearTimeout(serverTimer2.current);
      } if (listOfCars) {
        setPopDetails({
          title: '',
          msg: '',
          icon: <></>
        });
      }
    } catch (err: any) {
      let message = String(err?.response?.data ?? err?.message);
      let temptitle = String(err?.code).replace('ERR_', '');
      // serverTimer2.current = setTimeout(() => {
        setPopDetails({
          title: temptitle ?? temptitle,
          msg: message ?? message,
          icon: <TriangleAlert className="popup" />
        });
        if (location.pathname != '/not-found') {
          navigate('/not-found');
        }
      // }, 100000);
      return () => {
        if (serverTimer1.current) {
          clearInterval(serverTimer1.current);
          // clearTimeout(serverTimer2.current);
        }
      }
    }
  };

  const interval = useRef<ReturnType<typeof setInterval> | null>(null)
  function createOfflinePopup() {
    toast.warning('Network issue', {
    });
    interval.current = setInterval(() => {
      toast.warning('Network issue');
    }, 5000);
  }

  // useEffect runs based on dependency []
  useEffect(() => {
    fetchCars();

    // Offline, Network issue
    window.addEventListener('offline', () => {
      createOfflinePopup();
    });

    // Back to Online
    window.addEventListener('online', () => {
      if (carsList.length < 0) {
        fetchCars();
      }
      if (carsList.length > 0 && location.pathname == 'not-found') {
        navigate(-1);
      }
      if (interval.current) {
        clearInterval(interval.current);
      }
      toast.success('Back to Network');
    });

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    }
  }, []);

  // Single object contains all states variable and functions
  // This will be provided globally so other components can use them with "useContext(StoreContext)"
  const contextValue = {
    carsList,
    showProducts, setShowProducts,
    menu, setMenu,
    getTotal, totals, setTotals,
    customer, setCustomer,
    car, setCar,
    count, setCount,
    loading, setLoading,
    load, setLoad,
    logouting, setLogouting,
    pageLoad, setPageLoad,
    pathCheck, setPathCheck,
    fetchCars,
    popDetails, setPopDetails,
    token
  };

  // "props.children" means anything inside this provider will hava accesss the "contextValue"
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};