import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../../Api";
import { StoreContext } from "../../store/StoreContext";
import { Eye, EyeOff } from "lucide-react";

function Register() {

    const inputRef = useRef<HTMLInputElement>(null);
    const { menu, showProducts, setMenu, load } = useContext(StoreContext);
    const [formData, setFormData] = useState({
        userName: '', password: '', userInfo: {
            firstName: '', lastName: '', email: ''
        }
    })
    const [confirmPassword, setConfirmPassword] = useState('')
    const [invalid1, setInvalid1] = useState(false);
    const [invalid2, setInvalid2] = useState(false);
    const [invalid3, setInvalid3] = useState(false);
    const [invalid4, setInvalid4] = useState(false);
    const [invalid5, setInvalid5] = useState(false);
    const [invalid6, setInvalid6] = useState(false);
    const [invalid7, setInvalid7] = useState(false);
    const [invalid8, setInvalid8] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [passwordView1, setPasswordView1] = useState(false);
    const [passwordView2, setPasswordView2] = useState(false);

    useEffect(() => {
        inputRef.current?.focus();
        setMenu(false)
    }, []);

    const onchangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((pre) => ({ ...pre, [name]: value }))
    }

    const onchangeHandlerForUserInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((pre) => (
            {
                ...pre,
                userInfo:
                {
                    ...pre.userInfo,
                    [name]: value
                }
            }))
    }

    useEffect(() => {
        setInvalid1(false); setInvalid2(false); setInvalid3(false); setInvalid4(false);
        setInvalid5(false); setInvalid6(false); setInvalid7(false); setInvalid8(false); setLoading(false)
    }, [formData])

    const register = async () => {
        setInvalid1(formData.userInfo.firstName ? false : true)
        setInvalid2(formData.userInfo.lastName ? false : true);
        setInvalid3(formData.userName ? false : true)
        setInvalid4(formData.userInfo.email ? false : true)
        setInvalid5(formData.password ? false : true)
        setInvalid6(confirmPassword ? false : true);

        try {
            if (formData.userName && formData.password && formData.userInfo.email && formData.userInfo.firstName && formData.userInfo.lastName && confirmPassword) {
                if (!formData.userInfo.email.includes('@gmail.com')) {
                    setInvalid8(true);
                    return;
                } else
                    if (formData.password !== confirmPassword) {
                        setInvalid7(true);
                        return;
                    }
                const response = await userRegister(formData);
                if (response) {
                    return navigate('/login')
                } else {
                    setLoading(true)
                    return
                }
            }
            return;

        } catch (error) {
            navigate('/register')
        }

    }

    return (
        <div>
            <div className={`max-w-lg md:mx-auto mx-5 bg-black/10 rounded-lg shadow-md px-8 py-10 flex flex-col 
            items-center md:my-10 mb-10 dark:bg-white/30 dark:text-black ${showProducts | load | menu && 'blur-sm'}`}>
                <h1 className="text-xl font-bold text-center mb-8">Welcome to Toyota</h1>
                <form className="w-full flex flex-col gap-4" onSubmit={() => { event?.preventDefault(), register() }}>
                    {loading && <span className="text-red-600 text-center text-xl">Please regiter correctly</span>}
                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="firstName" className="text-sm text-black mr-2 dark:text-white">First Name:</label>
                        {invalid1 && <span className="text-red-500 text-sm mx-auto">First Name required</span>}
                        <input type="text" id="firstName" name="firstName" ref={inputRef}
                            className="w-full px-3 bg-white/80 py-2 rounded-md border focus " value={formData.userInfo.firstName} onChange={(event) => onchangeHandlerForUserInfo(event)} />
                    </div>

                    <div className="flex items-start flex-col justify-start ">
                        <label htmlFor="lastName" className="text-sm text-black mr-2 dark:text-white">Last Name:</label>
                        {invalid2 && <span className="text-red-500 text-sm mx-auto">Last Name required</span>}
                        <input type="text" id="lastName" name="lastName"
                            className="w-full px-3 bg-white/80 py-2 rounded-md border" value={formData.userInfo.lastName} onChange={(event) => onchangeHandlerForUserInfo(event)} />
                    </div>

                    <div className="flex items-start flex-col justify-start ">
                        <label htmlFor="userName" className="text-sm text-black mr-2 dark:text-white">Username:</label>
                        {invalid3 && <span className="text-red-500 text-sm mx-auto">userName required</span>}
                        <input type="text" id="userName" name="userName"
                            className="w-full px-3 bg-white/80 py-2 rounded-md border" value={formData.userName} onChange={(event) => onchangeHandler(event)} />
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="email" className="text-sm text-black mr-2 dark:text-white">Email:</label>
                        {invalid4 && <span className="text-red-500 text-sm mx-auto">Email required</span>}
                        {invalid8 && <span className="text-red-500 text-sm mx-auto">Email id should be like @gmail.com required</span>}
                        <input type="email" id="email" name="email"
                            className="w-full px-3 bg-white/80 py-2 rounded-md border" value={formData.userInfo.email} onChange={(event) => onchangeHandlerForUserInfo(event)} />
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="password" className="text-sm text-black mr-2 dark:text-white">Password:</label>
                        {invalid5 && <span className="text-red-500 text-sm mx-auto">Password required</span>}
                        <input type={passwordView1 ? 'text' : 'password'} id="password" name="password"
                            className="w-full px-3 bg-white/80 py-2 rounded-md border" value={formData.password} onChange={(event) => onchangeHandler(event)} />
                        <button type="button" onClick={() => setPasswordView1(!passwordView1)} className="absolute border-none transform md:translate-x-[25rem] translate-x-[14.5rem] translate-y-8">
                            {passwordView1 ? <EyeOff className="text-black" size={18} /> : <Eye className="text-black" size={18} />}
                        </button>
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="confirmPassword" className="text-sm text-black mr-2 dark:text-white">Confirm Password:</label>
                        {invalid6 && <span className="text-red-500 text-sm mx-auto">Confirm Password required</span>}
                        {invalid7 && <span className="text-red-500 text-sm mx-auto">Password not match</span>}
                        <input type={passwordView2 ? 'text' : 'password'} id="confirmPassword" name="confirmPassword"
                            className="w-full px-3 bg-white/80 py-2 rounded-md border" value={confirmPassword} onChange={(event) => setConfirmPassword(() => event?.target.value)} />
                        <button type="button" onClick={() => setPasswordView2(!passwordView2)} className="absolute border-none transform md:translate-x-[25rem] translate-x-[14.5rem] translate-y-8">
                            {passwordView2 ? <EyeOff className="text-black" size={18} /> : <Eye className="text-black" size={18} />}
                        </button>
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">Register</button>
                </form>

                <div className="mt-4 text-center">
                    <span className="text-sm text-red-500 dark:text-red-800">Already have an account? </span>
                    <Link to={'/login'} className="text-blue-500 hover:text-blue-600 dark:text-green-500">Login</Link>
                </div>
            </div >
        </div>
    )
}
export default Register;