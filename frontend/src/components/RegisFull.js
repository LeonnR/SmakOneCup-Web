import React, { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Registrasi from './Registrasi';
import Footer from './Footer';
import useFetch from './useFetch';
import oborHitam from '../assets/blak obor.png';
import Surat_Orang_Tua from '../assets/Surat_Download/Surat_Persetujuan_Orang_Tua.pdf'
import {BsDownload} from "react-icons/bs";
import Header from './Header';
import CompesListing from './CompesListing';



const RegisFull = () => {
    let {idLom} = useParams();
    let compe = useFetch(`Competition/${idLom}/`);
    let navigate = useNavigate();
    const fee = compe.Regi_Fee?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const [Contact_Compe, setContact_Compe] = useState()
    const [isChecked, setIsChecked] = useState(false);
    const [Peraturan, setPeraturan] = useState();

    console.log(fee)

    const handleChange = () => {
        setIsChecked(current => !current); 
    }
    useEffect(() => {
        if (compe.Peraturan === undefined){
            return
        }
        else{
            setPeraturan(compe.Peraturan.split("$"))
            setContact_Compe(compe.Contact_Person.split("$"))
            //console.log(compe.Peraturan.split("$"))
            //console.log(compe.Contact_Person)
        }
    }, [compe])
    
    return(
        <div className="bg-black ">
            <Header/>
            <div className='pb-auto flex-grow    w-full h-full bg-purple-bg z-0'> 
                <div className="grid grid-cols-5 gap-4 pt-24 pb-2">
                    <div className="col-span-1 text-left">
                        <div className="mx-5 my-4 inline-block">
                            <p className="text-5xl font-bold pl-16 text-slate-100/[0.75] cursor-pointer" onClick={() => navigate("/")}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 lg-10 lg:w-16 lg:h-16">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>  
                            </p>
                        </div>
                    </div>
                    <div className="col-span-3 text-slate-100/[0.75] font-bebasneue text-7xl lg:text-8xl text-center relative h-[200px] w-full">
                        <span className="z-10">Registrasi Lomba</span>
                    </div>
                </div>
                   
                <div className="col-span-3 text-white font-plusjakartasans font-bold tracking-tighter text-6xl lg:text-8xl text-center relative h-[220px] w-full">
                    <span className="z-10">{compe.name?<p>{compe.name}</p>:<p></p>}</span>
                </div>

                <div className="md:mx-24 lg:mx-40 pb-8 xl:pl-8 my-5 rounded-3xl bg-gradient-to-r from-[#a4a4ac] to-[#70647c] text-white">
                    <div className="container relative">
                        <div className="absolute items-start w-7/12  lg:w-6/12">
                                <img src={`${oborHitam}`} alt="logo" className="justify-left opacity-5 "/>
                            </div>
                        <div className="grid grid-cols-5 grid-rows-3 gap-y-4 pl-10 lg:pl-5 pt-10 tracking-tighter relative mr-14 lg:mr-32">
                            
                            <div className='col-span-2'>
                                <p className="text-2xl lg:text-4xl mb-1 font-semibold leading-none font-plusjakartasans">Jadwal</p>
                                <p className="text-md xl:text-2xl leading-snug font-plusjakartasans [word-spacing:5px]">24 Oktober 2023</p>
                            </div>
                            <div className="col-span-2 col-start-1 row-start-2">
                                <p className="text-2xl lg:text-4xl mb-1 font-semibold leading-none font-plusjakartasans ">Lokasi</p>
                                <p className="text-sm xl:text-2xl leading-snug font-plusjakartasans [word-spacing:5px]">SMAK 1 PENABUR Jakarta</p>
                            </div>
                            <div className="col-span-2 col-start-1 row-start-3">
                                <p className="text-2xl lg:text-4xl mb-1 font-semibold leading-none font-plusjakartasans ">Jenjang</p>
                                <p className="text-sm xl:text-2xl leading-snug font-plusjakartasans [word-spacing:5px]">{compe.level?<p>{compe.level}</p>:<p>-</p>}</p>
                            </div>
                            <div className="col-span-2 col-start-3 row-start-1">
                                <p className="text-2xl lg:text-4xl mb-1 font-semibold leading-none font-plusjakartasans ">Lomba</p>
                                <p className="text-sm xl:text-2xl leading-snug font-plusjakartasans [word-spacing:5px]">{compe.name?<p>{compe.name}</p>:<p>-</p>}</p>
                            </div>
                            <div className="col-span-3 row-span-2 col-start-3 row-start-2">
                                <div className='text-xl font-plusjakartasans'>
                                    <div className='text-2xl lg:text-4xl mb-1 font-semibold leading-none font-plusjakartasans   '>
                                        Kontak
                                    </div>
                                    <ul className='lg:block list-disc text-sm xl:text-2xl leading-snug font-plusjakartasans [word-spacing:5px]'>
                                        <li className='list-inside'>
                                            {Contact_Compe?.[0]}
                                        </li>
                                        { (Contact_Compe?.[1] !== "") && 
                                            <li className='list-inside'>
                                                {Contact_Compe?.[1]}
                                            </li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-flow-dense grid-cols-3 pt-5 mr-6">
                            <div className="col-start-3 text-end justify-items-end items-end tracking-tighter items-down pr-5">
                                <p className="text-2xl lg:text-3xl xl:text-5xl font-semibold mb-4">Biaya Registrasi</p>
                                <p className="text-2xl lg:text-4xl xl:text-5xl text-yellow-300 font-semibold">Rp&nbsp;{fee}</p>
                            </div>
                        </div>
                    </div>  
                </div>

                <div className="md:px-6 lg:mx-10 xl:mx-16 xl:px-0">
                    <div className="pl-8 pr-4 lg:px-28 py-5 pt-24 mx-3 tracking-wid ">
                        <h1 className="font-plusjakartasans py-7 text-4xl lg:text-6xl text-center text-white font-semibold">Persyaratan Umum</h1>
                        <ol className="font-plusjakartasans pt-5 text-white text-justify xl:text-left text-md lg:text-xl list-decimal">
                                {Peraturan?.map((e,i)=>{
                                    return(
                                        <li key={i}>
                                            {e}
                                        </li>
                                    )
                                })}                                    
                        </ol>
                    </div>
                </div>

                {/* {compe.name === "Model United Nation DISEC" || compe.name ==="Model United Nation WHO" ?  
                <div className="md:px-6 md:mt-5 lg:mx-10 xl:mx-16 xl:px-0 xl:mt-5">
                    <div className="pl-8 pr-4 lg:px-8 xl:px-5 py-5 mx-3 rounded-3xl border-2 border-yellow-400 md:text-xl xl:text-2xl">
                        <div className='text-white'>
                        All delegates are required to fill in the Google Forms below regarding the information needed for your participation in ONEMUN 2022 (if you are in a delegation, every member should still fill it in). If you haven't filled it in, please kindly fill it in. 
                        <a href='https://bit.ly/ONEMUN2022Registration' className='text-yellow-400' target="blank"> https://bit.ly/ONEMUN2022Registration</a>
                        </div>
                    </div>
                </div>
                :
                <div>

                </div>
                } */}

                {compe.name === "Badminton (Beregu)" || compe.name ==="Badminton (Ganda Campuran)" || compe.name ==="Badminton (Ganda Putra)" || compe.name ==="Badminton (Ganda Putri)" ?  
                <div className="md:px-6 md:mt-5 lg:mx-10 xl:mx-16 xl:px-0 xl:mt-5">
                    <div className="pl-8 pr-4 lg:px-8 xl:px-5 py-5 mx-3 rounded-3xl border-2 border-yellow-400 md:text-xl xl:text-2xl">
                        <div className='text-white'>
                        Jika ditemukan ada pemain yang berasal dari PUSDIKLAT dan club besar di JABODETABEK akan langsung didiskualifikasi. (Pemain tidak pernah bermain di SIRNAS dan tidak berasal dari club-club besar).
                        </div>
                    </div>
                </div>
                :
                <div>

                </div>
                }

            {/* {compe.name === "Futsal Putra" 
            || compe.name ==="Futsal Putri" 
                ?  
                <div className="md:px-6 md:mt-5 lg:mx-10 xl:mx-16 xl:px-0 xl:mt-5 text-center font-bold">
                    <div className="pl-8 pr-4 lg:px-8 xl:px-5 py-5 mx-3 rounded-3xl border-2 border-yellow-400 md:text-xl xl:text-2xl">
                        <div className='text-white'>
                        Jika anda ingin mendaftar lomba futsal, maka bertanya terlebih dahulu kepada kontak person yang berada di atas.
                        </div>
                    </div>
                </div>
                :
                <div>

                </div>
                } */}
                
                {
                compe.Surat_Izin_Orangtua &&
                <div className='flex justify-center text-white mt-5'>
                    <a href={Surat_Orang_Tua} download="Surat Persetujuan Orang Tua" target="blank" className='flex gap-2 border-2 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl md:px-4 md:py-2 xl:px-7 xl:py-[0.5rem] text-xl'>
                        <div className='mt-[0.2rem]'><BsDownload size={22} style={{strokeWidth: "1"}}/> </div>
                        <div>Unduh Surat Persetujuan Orang Tua</div>
                    </a>
                </div>
                }
                {/* {
                compe.name ==="JHS IPA" &&
                <div className='flex justify-center text-white mt-5'>
                    <a href="https://drive.google.com/file/d/1MrfsRaRp7OzDu8N3vmYJIFjEa6wkuYL_/view?usp=sharing" target="blank" className='flex gap-2 border-2 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl md:px-4 md:py-2 xl:px-7 xl:py-[0.5rem] text-xl'>
                        <div className='mt-[0.2rem]'><BsDownload size={22} style={{strokeWidth: "1"}}/> </div>
                        <div>Petunjuk Teknis JHS IPA</div>
                    </a>
                </div>
                }
                {
                compe.name ==="JHS IPS" &&
                <div className='flex justify-center text-white mt-5'>
                    <a href="https://drive.google.com/file/d/1vjbI8pKvBy0l4T25bRp3nqjtB73-cVV6/view?usp=sharing" target="blank" className='flex gap-2 border-2 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl md:px-4 md:py-2 xl:px-7 xl:py-[0.5rem] text-xl'>
                        <div className='mt-[0.2rem]'><BsDownload size={22} style={{strokeWidth: "1"}}/> </div>
                        <div>Petunjuk Teknis JHS IPS</div>
                    </a>
                </div>
                }
                {
                compe.name ==="JHS Matematika" &&
                <div className='flex justify-center text-white mt-5'>
                    <a href="https://drive.google.com/file/d/1l5pUb3ClV-BAtWVC9kf0kROux-6hJuDf/view?usp=sharing" target="blank" className='flex gap-2 border-2 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl md:px-4 md:py-2 xl:px-7 xl:py-[0.5rem] text-xl'>
                        <div className='mt-[0.2rem]'><BsDownload size={22} style={{strokeWidth: "1"}}/> </div>
                        <div>Petunjuk Teknis JHS Matematika</div>
                    </a>
                </div>
                } */}
                {/* {
                compe.name ==="Speech Competition" &&
                <div className='flex justify-center text-white mt-5'>
                    <a href="https://drive.google.com/file/d/1c10OayFXd3QTiPD6JDlRn0tUWex5UIRc/view" target="blank" className='flex gap-2 border-2 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl md:px-4 md:py-2 xl:px-7 xl:py-[0.5rem] text-xl'>
                        <div className='mt-[0.2rem]'><BsDownload size={22} style={{strokeWidth: "1"}}/> </div>
                        <div>Petunjuk Teknis Speech Competition</div>
                    </a>
                </div>
                } */}

                
                <div className="flex gap-1 lg:gap-3 py-3 pb-10 mx-5 md:mx-12 lg:mx-28">
                    <input type="checkbox" id="testCheck" className="w-10 sm:w-8 md:w-6 lg:mt-4 rounded-md" value={isChecked} onChange={handleChange} />
                    <label htmlFor="testCheck" className="mx-3 lg:mx-0 mt-4 font-plusjakartasans text-md lg:text-lg text-white font-normal ">Saya menyetujui seluruh syarat dan ketentuan yang berlaku pada SMAKONE CUP 2023.</label>
                </div>
                {isChecked &&  <Registrasi compe={compe}/>}
                </div>
           
            
            <Footer />
        </div>
    );
};

export default RegisFull;

