import { useContext } from "react";
import Products from "../header/Products";
import Service from "../header/Service";
import Menubar from "../menu_bar/Menubar";
import { StoreContext } from "../context/StoreContext";

export function About() {

    const {menu, showProducts, showService}=useContext(StoreContext);

    return (
        <>
            <div className="relative">
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
            <div className="w-full flex items-cente dark:bg-black">
                <div className="w-full lg:w-[80%] mx-auto px-4 sm:px-10 lg:px-0 flex flex-col gap-4 pt-10 pb-20 dark:text-white">
                    {/* <!-- Title --> */}
                    <div className="flex flex-col gap-2 mb-2 md:mb-4">
                        <h2 className="text-4xl font-serif font-semibold">About Me</h2>
                        <span className="w-16 h-[4px] bg-rose-500 rounded"></span>
                        <span className="w-8 h-[4px] bg-rose-500 rounded"></span>
                    </div>

                    <h4 className="capitalize text-xl font-semibold">I'm <span className="text-red-500">jerald scooty</span></h4>
                    <p className="text-base">I am a dedicated and innovative Web Developer passionate about building dynamic, user-friendly,
                         and responsive websites. With a strong focus on clean code and seamless user experience,
                         I specialize in creating modern web solutions that blend creativity with functionality.</p>

                    <div className="w-full flex flex-col lg:flex-row gap-6 sm:gap-4 lg:gap-6 justify-between">

                        <div className="w-full flex flex-col items-stretch gap-4">

                            <div className="flex flex-col sm:flex-row gap-2 md:gap-6 items-center justify-between font-serif">

                                <ul className="w-full text-gray-900 dark:text-gray-200">
                                    <li className="py-2 border-b border-gray-200 dark:border-gray-600"><span className="font-bold">Birthday :</span> 09
                                        Jun 2001</li>
                                    <li className="py-2 border-b border-gray-200 dark:border-gray-600"><span className="font-bold">Degree :</span> Master of
                                        Computer Applications</li>
                                    <li className="py-2 border-b border-gray-200 dark:border-gray-600"><span className="font-bold">Location :</span>
                                        Ariyalur</li>
                                </ul>

                                <ul className="w-full text-gray-900 dark:text-gray-200 font-serif">
                                    <li className="py-2 border-b border-gray-200 dark:border-gray-600"><span className="font-bold">Email :</span>
                                        <a href="mailto:jjerald2000@gmail.com" className="text-red-500 underline"> jjerald2000@gmail.com</a>
                                    </li>
                                    <li className="py-2 border-b border-gray-200 dark:border-gray-600"><span className="font-bold">Phone No :</span>
                                        +91 7094949563</li>
                                    <li className="py-2 border-b border-gray-200 dark:border-gray-600"><span className="font-bold">Employment :</span>
                                        Remote</li>
                                </ul>
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <h1 className="text-base font-semibold uppercase text-blue-500">Skills</h1>
                            <div className="flex flex-col gap-2 font-semibold">
                                <span>Html/Tailwind</span>
                                <span>React.Js</span>
                                <span>Java/Spring boot</span>
                                <span>Postman</span>
                                <span>Docker Desktop</span>
                                <span>Stripe</span>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <h1 className="text-base font-semibold uppercase text-blue-500">Tools & Technologies:</h1>
                            <div className="flex flex-col gap-2 font-semibold">
                                <span>Frontend: <span className="text-red-500">React.js, HTML5, CSS3, Tailwind.CSS</span></span>
                                <span>Backend: <span className="text-red-500">Spring Boot (Java), REST APIs</span></span>
                                <span>Database: <span className="text-red-500">MongoDB</span></span>
                                <span>Authentication: <span className="text-red-500">JWT</span></span>
                                <span>Cloud: <span className="text-red-500">Cloudinary</span></span>
                                <span>Payment Gateway: <span className="text-red-500">Stripe</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}