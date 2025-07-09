function Products({ showProducts, setShowProducts }: { showProducts: boolean, setShowProducts: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <>
            {
            showProducts &&
                (
                <div className="hidden md:block absolute transform top-0 bg-white w-full" 
                    onMouseEnter={() => { setShowProducts(true) }}  
                    onMouseLeave={() => { setShowProducts(false) }}>
                    <ul className="space-x-5 mb-3 grid grid-flow-row grid-cols-5 w-full items-center ">

                        <a className="m-5 hover:underline hover:underline-offset-4" href="">
                            <li className="flex flex-col items-center">
                                <img className="h-3/4 w-2/4" src="./src/assets/Glanza.jpg" alt="" />
                                <p className="font-semibold uppercase text-sm">Glanza</p>
                            </li>
                        </a>
                        <a href="" className="hover:underline hover:underline-offset-4">
                            <li className="flex flex-col items-center">
                                <img className="h-3/4 w-2/5 p-2" src="./src/assets/fortuner.png" alt="" />
                                <p className="font-semibold uppercase text-sm">Fortuner</p>
                            </li>
                        </a>
                        <a href="" className="hover:underline hover:underline-offset-4">
                            <li className="flex flex-col items-center">
                                <img className="h-3/4 w-2/5 " src="./src/assets/innova-crysta.png" alt="" />
                                <p className="font-semibold uppercase text-sm mt-2">innova crysta</p>
                            </li>
                        </a>
                        <a href="" className="hover:underline hover:underline-offset-4">
                            <li className="flex flex-col items-center">
                                <img className="h-3/4 w-2/5" src="./src/assets/innova-hycross.png" alt="" />
                                <p className="font-semibold uppercase text-sm mt-1">innova hycross</p>
                            </li>
                        </a>
                        <a href="" className="hover:underline hover:underline-offset-4">
                            <li className="flex flex-col items-center">
                                <img className="h-4/5 w-2/4 mt-2" src="./src/assets/land-cruser.png" alt="" />
                                <p className="font-semibold uppercase text-sm">land cruser</p>
                            </li>
                        </a>

                        <a href="" className="hover:underline hover:underline-offset-4">
                            <li className="flex flex-col items-center">
                                <img className="h-4/5 w-2/5" src="./src/assets/legender.png" alt="" />
                                <p className="font-semibold uppercase text-sm">legender</p>
                            </li>
                        </a>

                        <a href="" className="hover:underline hover:underline-offset-4">
                            <li className="flex flex-col items-center">
                                <img className="h-3/4 w-2/5" src="./src/assets/rumion.png" alt="" />
                                <p className="font-semibold uppercase text-sm">rumion</p>
                            </li>
                        </a>

                        <a href="" className="hover:underline hover:underline-offset-4">
                            <li className="flex flex-col items-center">
                                <img className="h-3/4 w-2/5" src="./src/assets/urban-cruiser-hyryder.png" alt="" />
                                <p className="font-semibold uppercase text-sm mt-2">urban cruiser hyryder</p>
                            </li>
                        </a>

                        
                    </ul >
                </div >
                )
            }
        </>
    );
}
export default Products;