import { Link } from "react-router-dom";

function Menubar() {
  return (
    <>
      <div className="md:hidden absolute top-0 pl-6 w-full bg-white border-black/10 border-b-2">
        <ul className="flex flex-col space-y-5 my-3  uppercase font-sans text-lg font-semibold">
          <li><Link to={'/explore'}>Products</Link></li>
          <li><Link to={'/service'}>Service</Link></li>
          <li><Link to={'/explore'}>Buy Online</Link></li>
          <li><Link to={'/about'}>About Me</Link></li>
        </ul>
      </div>
    </>
  )
}
export default Menubar;