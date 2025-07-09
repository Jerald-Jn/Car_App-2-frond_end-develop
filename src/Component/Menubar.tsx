function Menubar(){
    return (
        <>
        <div className="md:hidden absolute top-0 pl-6 w-full bg-white border-black/10 border-b-2">
              <ul className="flex flex-col space-y-5 my-3  uppercase font-sans text-lg font-semibold">
                <li><a href="">Products</a></li>
              
                <li><a href="">Visual ShowRoom</a></li>
              
                <li><a href="">Service</a></li>
              
                <li><a href="">T-Care</a></li>
              
                <li><a href="">Used Cars</a></li>
              
                <li><a href="">Mobility</a></li>
              
                <li><a href="">Buy Online</a></li>
              
                <li><a href="">Toyota India</a></li>
              </ul>
            </div>
        </>
    )
}
export default Menubar;