function Menubar(){
    return (
        <>
        <div className="md:hidden absolute top-0 pl-6 w-full bg-white border-black/10 border-b-2">
              <ul className="flex flex-col space-y-5 my-3  uppercase font-sans text-lg font-semibold">
                <li><a   >Products</a></li>
              
                <li><a   >Visual ShowRoom</a></li>
              
                <li><a   >Service</a></li>
              
                <li><a   >T-Care</a></li>
              
                <li><a   >Used Cars</a></li>
              
                <li><a   >Mobility</a></li>
              
                <li><a   >Buy Online</a></li>
              
                <li><a   >Toyota India</a></li>
              </ul>
            </div>
        </>
    )
}
export default Menubar;