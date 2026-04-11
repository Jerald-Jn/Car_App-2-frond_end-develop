import { useContext, useEffect } from "react";
import { StoreContext } from "../../store/StoreContext";
import { aboutMe, skils, technologies } from "../../Interface/DataModel";

function About() {

    const { menu, showProducts, setMenu, load } = useContext(StoreContext);

    useEffect(() => {
        setMenu(false)
    }, []);

    return (
        <>
            {
                <div className={`w-full flex items-center font-mono dark:bg-black ${showProducts | load | menu && 'blur-sm'}`}>
                    <div className="w-full lg:w-[80%] mx-auto px-4 sm:px-10 lg:px-0 flex flex-col gap-4 pt-10 pb-20 dark:text-white">
                        {/* <!-- Title --> */}
                        <div className="flex flex-col gap-2 mb-2 md:mb-4">
                            <h2 className="text-4xl font-serif font-semibold">About Me</h2>
                            <span className="w-16 h-[4px] bg-rose-500 rounded"></span>
                            <span className="w-8 h-[4px] bg-rose-500 rounded"></span>
                        </div>

                        {/* <h4 className="capitalize text-xl font-semibold">I'm <span className="text-red-500">jerald scooty</span></h4> */}
                        <p className="text-lg">
                            Hi, I’m <span className="font-bold font-mono text-xl" >Jerald Scooty J, a Software Engineer with 1+ year of experience in Java, Spring Boot, React.js, and MongoDB.</span>
                            I build scalable web applications and enjoy working across both backend and frontend.
                            I’m looking for an opportunity to contribute and grow with a strong team.
                        </p>

                        <div className="w-full flex flex-col lg:flex-row gap-6 sm:gap-4 lg:gap-6 justify-between">

                            <div className="w-full flex flex-col items-stretch gap-4">

                                <div className="flex flex-col sm:flex-row gap-2 md:gap-6 items-start justify-between">

                                    <ul className="w-full text-gray-900 dark:text-gray-200">
                                        {
                                            
                                            Object.entries(aboutMe).map((data)=>(
                                                <li className="py-2 border-b border-gray-200 dark:border-gray-600 flex flex-col gap-2">
                                                    <span className="font-bold text-lg text-red-500">{data[0]}</span>
                                                    <span className="">{data[1]}</span>
                                                </li>
                                            ))
                                        }
                                    </ul>

                                    <ul className="w-full text-gray-900 dark:text-gray-200">
                                        <li className="py-2 border-b border-gray-200 dark:border-gray-600 flex flex-col gap-2">
                                            <span className="font-bold text-lg text-red-500">Email</span>
                                            <a href="mailto:jjerald2000@gmail.com" className=""> jjerald2000@gmail.com</a>
                                        </li>
                                        <li className="py-2 border-b border-gray-200 dark:border-gray-600 flex flex-col gap-2">
                                            <span className="font-bold text-lg text-red-500">Phone No</span>
                                            <a href="tel:+91 7094949563" className="font-mono">7094949563</a>
                                        </li>
                                        <li className="py-2 border-b border-gray-200 dark:border-gray-600 flex flex-col gap-2">
                                            <span className="font-bold text-lg text-red-500">Employment</span>
                                            <span className="font-mono">Remote, Onsite</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="w-full flex flex-col gap-2 md:ml-10">
                                <h1 className="font-semibold uppercase text-red-500 md:ml-10 text-lg">Skills</h1>
                                <div className="flex flex-col gap-2 font-semibold md:ml-10">
                                    {
                                        skils.map((skill)=>(
                                            <span>{skill}</span>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <h1 className="text-lg font-semibold uppercase text-red-500">Tools & Technologies:</h1>
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-1 font-semibold">
                                    {
                                        Object.entries(technologies).map((tech)=>(
                                            <li className="border-b border-gray-200 dark:border-gray-600 flex flex-col gap-1">
                                                    <span className=" text-blue-500 font-bold">{tech[0]}</span>
                                                    <span className="font-mono">{tech[1]}</span>
                                                </li>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            }

        </>
    );
}
export default About;