function Footer() {
    return (
        <>
        {/* Footer Navigation */}
            <div className='bg-black/80 md:w-full text-white/60 '>
                <div className=' md:ml-24 pb-10 md:w-2/5 w-full'>
                    <div className=''>
                        <ul className="grid grid-cols-3 md:py-5 md:gap-0 gap-2 p-5 md:grid-cols-6 text-center uppercase text-xs font-semibold ">
                            <li className='border-r-2  border-white/50 md:text-start hover:text-white/40'>
                                <a href="">Contact Us</a>
                            </li>
                            <li className='border-r-2  border-white/50 hover:text-white/40'>
                                <a className="text-center" href="">Search</a>
                            </li>
                            <li className='md:border-r-2  md:border-white/50 hover:text-white/40'>
                                <a className="text-center" href="">Announcement</a>
                            </li>
                            <li className='border-r-2  border-white/50 hover:text-white/40'>
                                <a href="">Legal Notice</a>
                            </li>  
                            <li className='border-r-2  border-white/50 hover:text-white/40'>
                                <a href="">Help</a>
                            </li>
                            <li className='md:border-r-2  md:border-white/50 hover:text-white/40'>
                                <a href="">Site Map</a>
                            </li>
                        </ul>
                    </div>
                    <hr />
                    <div className="grid grid-cols-2 grid-flow-row md:grid-cols-3 justify-center">
                        {/* Top Section */}
                        <div className="flex flex-col ml-8 md:ml-0 md:items-start" > 
                        <h2 className="text-lg font-bold font-serif uppercase mt-2">Top Sections</h2>
                        <ul className="mt-1 text-xs font-medium uppercase tracking-widest">
                            <li className="py-1 hover:text-white/40">
                                <a href="">Price List</a>
                            </li>
                            <li className="py-1 hover:text-white/40">
                                <a href="">EBook</a>
                            </li>
                            <li className="py-1 hover:text-white/40">
                                <a href="">Find ADealer</a>
                            </li>
                            <li className="py-1 hover:text-white/40">
                                <a href="">Test Drive</a>
                            </li>
                            <li className="py-1 hover:text-white/40">
                                <a href="">Brochure</a>
                            </li>
                            <li className="py-1 hover:text-white/40">
                                <a href="">Exchange</a>
                            </li>
                        </ul>
                        </div>

                        <div className="">
                            <div>
                            <h2 className=" text-lg font-bold font-serif uppercase mt-2">Quik Links</h2>
                                <ul className="mt-1 text-xs font-medium uppercase tracking-widest">
                                <li className="py-1 hover:text-white/40">
                                    <a href="">ABOUT US</a>
                                </li>
                                <li className="py-1 hover:text-white/40">
                                    <a href="">FEEDBACK/QUERIES</a>
                                </li>
                            </ul>
                            </div>
                            <div>
                            <h2 className="text-lg font-bold font-serif uppercase mt-2">MORE</h2>
                                <ul className="mt-1 text-xs font-medium uppercase tracking-widest">   
                                    <li className="py-1 hover:text-white/40">
                                        <a href="">HEALTH & SAFETY</a>
                                     </li>
                                <li className="py-1 hover:text-white/40">
                                    <a href="">POLICY</a>
                                </li>
                                <li className="py-1 hover:text-white/40">
                                    <a href="">START YOUR</a>
                                </li>
                                <li className="py-1 hover:text-white/40">
                                    <a href="">IMPOSSIBLE</a>
                                </li>
                            </ul>
                            </div>
                        </div>

                        <div className="flex flex-col ml-8 md:ml-0 md:items-start">
                        <h2 className="text-lg font-bold font-serif uppercase mt-2 ">MEDIA</h2>
                        <ul className="mt-1 text-xs font-medium uppercase tracking-widest">   
                            <li className="py-1 hover:text-white/40">
                                <a href="">PRESS RELEASE</a>
                            </li>
                            <li className="py-1 hover:text-white/40">
                                <a href="">ARTICLES/REVIEWS</a>
                            </li>
                            <li className="py-1 hover:text-white/40">
                                <a href="">SPOKESPERSONS</a>
                            </li>
                            <li className="py-1 hover:text-white/40">
                                <a href="">IMAGES</a>
                            </li>
                            <li className="py-1 hover:text-white/40">
                                <a href="">CUSTOMER</a>
                            </li>
                            <li className="py-1 hover:text-white/40">
                                <a href="">STORIES</a>
                            </li>
                            <li className="py-1 hover:text-white/40">
                                <a href="">AWARDS</a>
                            </li>
                            <li className="py-1 hover:text-white/40">
                                <a href="">DREAM CAR</a>
                            </li>
                            <li className="py-1 hover:text-white/40">
                                <a href="">CONTEST</a>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;