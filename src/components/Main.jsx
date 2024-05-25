import React, { useEffect, useState } from 'react';
import Card from './Card';
import { FaFacebook, FaTwitter, FaLinkedin, FaPinterest } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import Sidebar from './Sidebar';
import { Link } from '@reach/router';

const Main = () => {
    const [fData, setFData] = useState([]);
    const [cData, setCData] = useState([]);
    const [uData, setUData] = useState([]);
    const [hData, setHData] = useState({});

    useEffect(() => {
        const storedFeaturedData = JSON.parse(localStorage.getItem('featuredData'));
        if (storedFeaturedData) {
            setFData(storedFeaturedData);
        }

        const storedCardData = JSON.parse(localStorage.getItem('cardData'));
        if (storedCardData) {
            setCData(storedCardData);
        }

        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData) {
            setUData(storedUserData);
        }

        const storedHData = JSON.parse(localStorage.getItem('heroData'));
        if (storedHData) {
            setHData(storedHData);
            console.warn(hData);
        }
    }, []);

    return (
        <div className='container mx-[80px] md:mx-auto'>
            <Sidebar />
            <Link to="/main" className="text-white text-xl font-semibold mr-4"></Link>     
            <div className='container mx-auto mt-24'>
                <div className=''>
                    {Object.entries(hData).map(([key, data], index) => (
                        <div key={index} className='bg-white flex gap-10 shadow mt-10 p-3 rounded'>
                            <div>
                                <img src={data.imageSrc} alt={data.title}/>
                            </div>
                            <div>
                            <div className='flex flex-col gap-8 mt-10'>
                            <h2 className='bg-purple-100 rounded-xl w-[90px] text-purple-700 text-center md:text-left p-1 m-2 md:m-0'>{data.category}</h2>

                                <h2 className='font-bold text-xl'>{data.title}</h2>
                                
                                <p className='text-gray-600'>{data.content}</p>
                                <div className='flex'>
                                <img className='w-[30px]' src={data.authorImg} alt={data.title} />
                                <p className='text-gray-600'>{data.authorText}</p>
                                </div>

                            </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='container mx-auto flex flex-col md:flex-row gap-20 mt-10'>
                {fData.map((feature, index) => (
                    <div key={index} className='bg-white flex flex-col md:flex-row gap-3 shadow mt-10 p-3 rounded'>
                        <div>
                            <img src={feature.imageSrc} alt="" />
                        </div>
                        <div className='md:w-2/3'>
                            <h2 className='bg-purple-100 rounded-xl w-[90px] text-purple-700 text-center md:text-left p-1 m-2 md:m-0'>{feature.category}</h2>
                            <h1 className='font-bold text-xl md:text-2xl p-2'>
                                {feature.title}
                            </h1>
                            <p className='text-gray-600 p-2'>{feature.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Browse by Category Section */}
            <div className='container mx-auto mt-24 text-center'>
                <div className='flex flex-col'>
                    <h1 className='text-5xl font-bold'>Browse by Category</h1>
                    <p className='text-gray-600 mt-5'>Select a category to see more related content</p>
                </div>
                <div className='flex justify-center gap-4 md:gap-8 lg:gap-12 text-xl mt-10'>
                    <p className='hover:bg-black hover:text-white rounded-lg p-2 md:rounded-xl lg:rounded-2xl md:p-3 lg:p-4'>All</p>
                    <p className='hover:bg-black hover:text-white rounded-lg p-2 md:rounded-xl lg:rounded-2xl md:p-3 lg:p-4'>Technology</p>
                    <p className='hover:bg-black hover:text-white rounded-lg p-2 md:rounded-xl lg:rounded-2xl md:p-3 lg:p-4'>Lifestyle</p>
                    <p className='hover:bg-black hover:text-white rounded-lg p-2 md:rounded-xl lg:rounded-2xl md:p-3 lg:p-4'>Travel</p>
                    <p className='hover:bg-black hover:text-white rounded-lg p-2 md:rounded-xl lg:rounded-2xl md:p-3 lg:p-4'>Health</p>
                    <p className='hover:bg-black hover:text-white rounded-lg p-2 md:rounded-xl lg:rounded-2xl md:p-3 lg:p-4'>Culture</p>
                </div>

                {/* Cards Section */}
                <div className='container mx-auto mt-24 text-center'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-16'>
                        {cData.map((card, index) => (
                            <Card
                                key={index}
                                imageSrc={card.imageSrc}
                                title={card.title}
                                content={card.content}
                                img2={card.img2}
                                text={card.text}
                                btn={card.btn}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Authors Section */}
            <div className='container mx-auto'>
                <div className='text-center mt-16'>
                    <button className='border border-black text-xl rounded p-2 pr-8 pl-8 hover:bg-black hover:text-white'>Browse all Posts</button>
                </div>
                <div className='mt-10 flex justify-between mb-10'>
                    <h1 className='font-bold text-3xl'>
                        Top Authors
                    </h1>
                    <p className='flex hover:underline'>
                        All Authors
                        <div className='p-1'>
                            <MdOutlineArrowOutward />
                        </div>
                    </p>
                </div>
                <hr />

                <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {uData.map((user, index) => (
                        <div key={index} className='flex flex-col rounded-lg bg-gray-100 p-4'>
                            <div className='flex items-center'>
                                <img src={user.imageSrc} alt="" className='w-16 h-16 rounded-full' />
                                <div className='ml-4'>
                                    <h2 className='text-xl font-bold'>{user.name}</h2>
                                    <p className='text-gray-600'>{user.role}</p>
                                    <p className='text-gray-500 text-sm'>{user.publishedPosts} Published Posts</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='bg-gray-100 w-full mt-20'>
                <div className='container mx-auto flex flex-col md:flex-row items-center p-4'>
                    <div className='md:w-1/2 '>
                        <h2 className='font-bold text-2xl'>Subscribe to Newsletter</h2>
                        <p className='text-gray-500 mt-3'>Provide your email</p>
                    </div>
                    <div className='mt-4 md:mt-0 md:w-1/2 flex flex-col md:flex-row items-center md:ml-60'>
                        <input type="email" placeholder='Enter your Email' className='border pl-4 md:pl-6 py-3 rounded m-4 md:w-auto' />
                        <button type="button" className="text-white bg-black rounded p-3 md:px-6">Subscribe</button>
                    </div>
                </div>
            </div>

            <div className='m-10'>
                <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
                    <p className='text-gray-500 mb-4 md:mb-0'>
                        @ 2025 Clarity. All rights reserved
                    </p>
                    <ul className='flex gap-5 text-gray-500'>
                        <li>Privacy</li>
                        <li>Terms</li>
                        <li>Contact</li>
                        <li>Contribute</li>
                    </ul>
                    <p className='flex items-center'>
                        Follow Us:
                        <div className='flex text-xl gap-4 ml-3'>
                            <FaFacebook />
                            <FaTwitter />
                            <FaLinkedin />
                            <FaPinterest />
                        </div>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
