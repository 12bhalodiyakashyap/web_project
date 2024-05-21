import React from 'react'
import{Link} from "@reach/router"
const Navbar = () => {
  return (
    <div className="">
    <nav className="bg-gray-800 p-4 ">
      <div className='flex justify-center item-center gap-20'>
        <Link to="/" className="text-white text-xl font-semibold mr-4">HeroData</Link>
        <Link to="/featuredata" className="text-white hover:text-gray-300 mr-4">FeatureData</Link>
        <Link to="/carddata" className="text-white text-xl font-semibold mr-4">CardData</Link>
        <Link to="/contactdata" className="text-white hover:text-gray-300 mr-4">ContactData</Link>
      </div>
    </nav>
  </div>
  
  )
}

export default Navbar