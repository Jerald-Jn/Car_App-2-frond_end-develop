import { Eye, EyeOff } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../Api";
import { StoreContext } from "../context/StoreContext";
import Products from "../header/Products";
import Menubar from "../menu_bar/Menubar";

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    let [invalid1, setInvalid1] = useState(false);
    let [invalid2, setInvalid2] = useState(false);
    const [invalid3, setInvalid3] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { showProducts, setMenu, menu, load, carsList, pageLoad, setPageLoad, setHeaderLoad, setFooterLoad } = useContext(StoreContext)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setPageLoad(true)
        setHeaderLoad(false)
        setFooterLoad(false)
        inputRef.current?.focus();
        setMenu(false)
        setTimeout(() => {
            if (Array.isArray(carsList)) {
                setPageLoad(false)
                setHeaderLoad(true)
                setFooterLoad(true)
            }
        }, 100);
    }, [])

    useEffect(() => {
        setInvalid1(false); setInvalid3(false)
    }, [userName])

    useEffect(() => {
        setInvalid2(false); setInvalid3(false)
    }, [password])

    async function loginCheck() {
        setInvalid1(userName ? false : true);
        setInvalid2(password ? false : true);
        if (userName && password) {
            try {
                const response = (await loginApi(userName, password));
                console.log("response data ->", response)
                if (response) {
                    localStorage.setItem('token', response)
                    navigate('/home')
                }
            } catch (err) {
                console.log('error -> ', err)
                setInvalid3(true)
            }

        }
    }

    function viewPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <>
            {
                pageLoad ?
                    <div id="loading-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">
                        <svg className="animate-spin h-8 w-8 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>

                        <span className="text-white text-3xl font-bold">Loading...</span>
                    </div>
                    : carsList ?
                        <>
                            <div className="relative lg:-translate-y-0.5 z-10">
                                {/* Menu bar for small screen */}
                                {menu && (
                                    <Menubar />
                                )
                                }
                                {/* When we hover on Product is render "Products" component */}
                                {
                                    showProducts && (<Products />)
                                }
                            </div>
                            <div className={`bg-[url('../../camry-banner.jpg')] bg-cover bg-center min-h-screen ${showProducts | load | menu && 'blur-sm'}`}>

                                <h1 className="text-white text-4xl uppercase tracking-widest font-serif text-center p-5  md:text-6xl">Toyota</h1>
                                <div className="flex flex-col absolute bg-black/50 w-2/3 mx-16 h-3/5 md:w-1/5 md:h-3/5 md:right-20 top-1/4">
                                    <form className="flex flex-col  md:w-4/5 md:h-4/5 mx-auto my-8 items-center"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            loginCheck();
                                        }}>
                                        <h1 className="p-2 font-medium font-mono text-2xl tracking-wide text-white">Login</h1>
                                        {
                                            invalid3 && (<span className="text-red-700 text-center text-sm">Please enter correct username and password</span>)
                                        }
                                        <div className="flex flex-col space-y-2 my-3 md:mt-4 items-center">
                                            <label className="text-white" htmlFor="userName">Username</label>
                                            <input
                                                ref={inputRef}
                                                className="bg-white/80 dark:text-black p-0.5 text-center rounded-lg"
                                                type="text"
                                                id="userName"
                                                placeholder="enter username"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)} />
                                            {invalid1 && (<span className="text-red-700">please enter username</span>)}
                                        </div>
                                        <div className="flex flex-col space-y-2 md:mt-4 items-center">
                                            <label className="text-white" htmlFor="password">Password</label>
                                            <input className="bg-white/80 dark:text-black p-0.5 text-center rounded-lg relative"
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                placeholder="******"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)} />
                                            <button type="button" onClick={viewPassword} className="absolute border-none transform translate-x-24 translate-y-7 mr-10">
                                                {showPassword ? <EyeOff className="text-black" size={18} /> : <Eye className="text-black" size={18} />}
                                            </button>
                                            {invalid2 && (<span className="text-red-700">Please enter password</span>)}
                                        </div>
                                        <button type="submit" className="bg-blue-500 rounded-lg p-1 my-8 md:my-10 hover:bg-green-500 text-white">Login</button>
                                        <p className="text-white text-center md:-my-1 tracking-wider">New Register?
                                            <Link to={'/register'} className="text-blue-500 ml-0.5 cursor-pointer hover:text-green-500">Sign in</Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </> : (<h1 className='translate-y-52 tracking-wide text-center font-bold text-4xl'>404 Not Found</h1>)
            }

        </>
    )
}
export default Login;
