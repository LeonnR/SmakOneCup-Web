import React from 'react';
import {FaTiktok} from 'react-icons/fa'
import {BsWhatsapp,BsInstagram} from 'react-icons/bs'

const Homepage = () => {

    return(
    <div className='bg-purple-bg'>
        <div className="bg-gradient-to-b from-gray-300/[0.2] from-40% to-gray-400/[0.2] backdrop-blur-md grid grid-cols-2 px-2 md:px-4 py-1 lg:py-0 lg:mt-2 lg:px-6 w-full  bottom-0 z-10">
            <div className=''>
                <div className="inline-flex items-end ml-[-0.6em] lg:mb-4">
                    <div className="flex h-8 lg:h-10 lg:pt-2 grayscale lg:mt-2">
                        <img src={require(`../assets/Obor putih.png`)} alt="logo" className='grayscale' />
                    </div>
                    <p className="font-plusjakartasans text-lg md:font-medium lg:font-bold md:text-xl lg:text-2xl text-slate-100">Smakonecup</p>
                </div>
                <div className="font-plusjakartasans text-slate-100 text-left text-sm sm:text-base lg:text-xl ml-[0.8em] md:ml-[0.5em] lg:ml-2 xl:mt-2">
                    Smakonecup 2023, and its logo marks are the property of Smakonecup, a part of SMAK 1 PENABUR Jakarta
                </div>
            </div>
            <div className='flex flex-col gap-6'>
                <div>
                    <h1 className="font-plusjakartasans text-slate-100 text-right text-xl mt-1 lg:mt-4 sm:text-2xl md:font-medium lg:font-bold lg:text-2xl">Contact Us</h1>
                </div>
                <div className='text-slate-100 flex lg:hidden flex-row-reverse gap-x-2 pb-8 lg:pb-12 xl:pb-8 xl:mt-2'>
                    <a href="https://wa.me/6281299199656?text=kontak%20nomor%20ini%20jika%20ini%20ada%20yang%20mau%20ditanyakan" target="blank">
                    <BsWhatsapp color="F1F5F9" size={25}/>
                    </a>
                    <a href="https://www.instagram.com/smakonecup/" target="blank">
                    <BsInstagram color="F1F5F9" size={25}/>
                    </a>
                    <a href="https://www.tiktok.com/@smakonecup" target="blank">
                    <FaTiktok color="F1F5F9" size={25}/>
                    </a>
                </div>
                <div className='text-slate-100 hidden lg:flex flex-row-reverse gap-x-2 pb-8 lg:pb-12 xl:pb-8 xl:mt-2'>
                    <a href="https://wa.me/6281299199656?text=kontak%20nomor%20ini%20jika%20ini%20ada%20yang%20mau%20ditanyakan" target="blank">
                    <BsWhatsapp color="F1F5F9" size={30}/>
                    </a>
                    <a href="https://www.instagram.com/smakonecup/" target="blank">
                    <BsInstagram color="F1F5F9" size={30}/>
                    </a>
                    <a href="https://www.tiktok.com/@smakonecup" target="blank">
                    <FaTiktok color="F1F5F9" size={30}/>
                    </a>
                </div>
            </div>
       </div>
    </div>
    )    
}
export default Homepage;
