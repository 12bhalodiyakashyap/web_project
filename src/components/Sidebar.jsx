import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedinIn , FaPinterest } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";


const Sidebar = () => {
    const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
    const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false);
    const [isBlogsDropdownOpen, setIsBlogsDropdownOpen] = useState(false);

    const toggleHomeDropdown = () => {
        setIsHomeDropdownOpen(!isHomeDropdownOpen);
    };

    const togglePageDropdown = () => {
        setIsPageDropdownOpen(!isPageDropdownOpen);
    };

    const toggleBlogsDropdown = () => {
        setIsBlogsDropdownOpen(!isBlogsDropdownOpen);
    };

    return (
        <>
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
                <img src="https://clarity-tailwind.preview.uideck.com/images/logo.svg" className="h-8" alt="Flowbite Logo" />

                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button type="button" className="text-white bg-black hover:bg-black-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Subscribe</button>
                </div>

                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <div className="relative" onMouseEnter={toggleHomeDropdown} onMouseLeave={toggleHomeDropdown}>
                                <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 flex" aria-current="page">
                                    Home <RiArrowDropDownLine className='text-2xl'/>
                                </a>
                                {isHomeDropdownOpen && (
                                    <ul className="absolute top-full left-0 z-10 bg-white shadow-md rounded-md md:block">
                                        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 whitespace-nowrap">Business Blog</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 whitespace-nowrap">Personal Blog</a></li>
                                    </ul>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="relative" onMouseEnter={togglePageDropdown} onMouseLeave={togglePageDropdown}>
                                <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 flex" aria-current="page">
                                    Pages <RiArrowDropDownLine className='text-2xl'/>
                                </a>
                                {isPageDropdownOpen && (
                                    <ul className="absolute top-full left-0 z-10 bg-white shadow-md rounded-md md:block flex flex-col" style={{ whiteSpace: 'nowrap' }}>
                                        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Category Page</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">About us</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Author Page</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Search Page</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sign in</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sign up</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Style Guide Page</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Privacy & Policy Page</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Error Page</a></li>
                                    </ul>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="relative" onMouseEnter={toggleBlogsDropdown} onMouseLeave={toggleBlogsDropdown}>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 flex">
                                    Blogs<RiArrowDropDownLine className=' text-2xl'/>
                                </a>
                                {isBlogsDropdownOpen && (
                                    <ul className="absolute top-full left-0 z-10 bg-white shadow-md rounded-md md:block" style={{ whiteSpace: 'nowrap' }}>
                                        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Blog Details one</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Blog Details Two</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Blog Details Three</a></li>
                                    </ul>
                                )}
                            </div>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Support</a>
                        </li>
                    </ul>
                    <div className='flex gap-5 align-center ml-20 text-xl'>
                    <FaFacebookF />
                        <FaTwitter />
                        <FaLinkedinIn />
                        <FaPinterest />
                    </div>
                </div>
            </div>
        </nav>
        </>
    );
};

export default Sidebar;
