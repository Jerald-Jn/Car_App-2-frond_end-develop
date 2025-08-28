import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../Api";
import { Eye, EyeOff } from "lucide-react";
import Menubar from "../menu_bar/Menubar";
import Products from "../header/Products";
import Service from "../header//Service";
import { StoreContext } from "../context/StoreContext";

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    let [invalid1, setInvalid1] = useState(false);
    let [invalid2, setInvalid2] = useState(false);
    const [invalid3, setInvalid3] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {showProducts, showService, menu}=useContext(StoreContext)
    const inputRef=useRef<HTMLInputElement>(null)

    useEffect(()=>{
        inputRef.current?.focus();
    },[])

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
                    sessionStorage.setItem('token', ("Bearer "+response))
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
        <div className="bg-[url('../src/assets/carPic/camry/camry-banner.jpg')] bg-cover bg-center min-h-screen">
            <div className="relative">
            {/* Menu bar for small screen */}
                        {menu && (
                            <Menubar />
                        )
                        }
                        {/* When we hover on Product is render "Products" component */}
                        {
                            showProducts && (<Products />)
                        }
                        {/* When we hover on Service is render "Service" component */}
                        {
                            showService && (<Service />)
                        }
            </div>
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
                            className="bg-white/80 p-0.5 text-center rounded-lg"
                            type="text"
                            id="userName"
                            placeholder="enter username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)} />
                        {invalid1 && (<span className="text-red-700">please enter username</span>)}
                    </div>
                    <div className="flex flex-col space-y-2 md:mt-4 items-center">
                        <label className="text-white" htmlFor="password">Password</label>
                        <input className="bg-white/80 p-0.5 text-center rounded-lg relative"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <button type="button" onClick={viewPassword} className="absolute transform translate-x-24 translate-y-7 pr-10">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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

    )
}
export default Login;
