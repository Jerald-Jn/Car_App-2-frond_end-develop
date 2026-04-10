import { useContext, useEffect } from "react";
import { StoreContext } from "../../store/StoreContext";
import { Mail, MapPinned, PhoneCall } from "lucide-react";


function Contact() {
    const { showProducts, menu, setMenu, load, setPageLoad  } = useContext(StoreContext);

    useEffect(() => {
        setPageLoad(true)
        setMenu(false)
        setTimeout(() => {
            setPageLoad(false)
        }, 1000);
    }, [])

    return (
        <>
            {
                    <div className="relative">
                        <div className={`max-w-screen-lg mx-auto p-5 dark:text-white ${showProducts | load | menu && 'blur-sm'}`}>
                            <div className="grid grid-cols-1 md:grid-cols-12 border">
                                <div className="bg-gray-900 md:col-span-4 p-10 text-white">
                                    <p className="mt-4 text-sm leading-7 font-regular uppercase">
                                        Contact
                                    </p>
                                    <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
                                        Get In <span className="text-indigo-600">Touch</span>
                                    </h3>
                                    <div className="flex items-center mt-5">
                                        <MapPinned className="h-6 mr-2 w-6 text-indigo-600" />
                                        <span className="text-sm">Ariyalur, TamilNadu, India.</span>
                                    </div>
                                    <div className="flex items-center mt-5">
                                        <PhoneCall className="h-6 mr-2 w-6 text-green-600" />
                                        <span className="text-sm">+91 7094949563</span>
                                    </div>
                                    <div className="flex items-center mt-5">
                                        <Mail  className="h-8 mr-2 text-red-600" />
                                        <a href="mailto:jjerald2000@gmail.com" className="underline"> jjerald2000@gmail.com</a>
                                    </div>

                                </div>
                                <form className="md:col-span-8 p-10">
                                    <div className="flex flex-wrap -mx-3 mb-6 ">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-white"
                                                htmlFor="grid-first-name">
                                                First Name
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                id="grid-first-name" type="text" placeholder="Jane" />
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-white"
                                                htmlFor="grid-last-name">
                                                Last Name
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-last-name" type="text" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-white"
                                                htmlFor="grid-password">
                                                Email Address
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-email" type="email" placeholder="********@*****.**" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-white"
                                                htmlFor="grid-password">
                                                Your Message
                                            </label>
                                            <textarea
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
                                        </div>
                                        <div className="flex justify-between w-full px-3">
                                            <div className="md:flex md:items-center">
                                                <label className="block text-gray-500 font-bold">
                                                    <input className="mr-2 leading-tight" type="checkbox" />
                                                    <span className="text-sm dark:text-white">
                                                        Send me your newsletter!
                                                    </span>
                                                </label>
                                            </div>
                                            <button
                                                className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                                                type="submit">
                                                Send Message
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}
export default Contact;