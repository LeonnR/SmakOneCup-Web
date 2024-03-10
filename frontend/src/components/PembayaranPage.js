import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams  } from 'react-router-dom';

import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

import Header from './Header';
import Footer from './Footer';
import {BsDownload} from "react-icons/bs";
import useFetch from './useFetch';

import oborHitam from '../assets/blak obor.png';

const PembayaranPage = () => {
    let {idLom} = useParams();
    let compe = useFetch(`Competition/${idLom}/`);
    const {state} = useLocation();
    const response = state;
    const navigate = useNavigate();
    
    // // // const [Regi, setRegi] = useState("")
    // // // const [WoFee, setWoFee] = useState("")
    // // // const [Total, setTotal] = useState("")
    const [Fee, setFee] = useState("")

    useEffect(() => {
        let p = JSON.parse(response.data.replace("\\",""))
        //console.log(response)
        setFee(p)
    }, [response])

    const pdfRef = useRef();

    const donwloadPDF = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png")
            const pdf = new jspdf('p','mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio)/ 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('biayaPembayaran.pdf');
        });
    }
    
    return(
        <>
        {Fee === "" ? <div> Loading..    </div>
        :
        <div className="bg-purple-bg ">
            <Header/>
            <div ref={pdfRef} className='pb-auto flex-grow    w-full h-full bg-purple-bg z-0'> 
                <div className="grid grid-cols-5 gap-4 pt-24 pb-2">
                    <div className="col-span-1 text-left">
                        <div className="mx-5 my-4 inline-block">
                            <p className="text-5xl font-bold pl-16 text-slate-100/[0.75] cursor-pointer" onClick={() => navigate("/")}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10     lg-10 lg:w-16 lg:h-16">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>  
                            </p>
                        </div>
                    </div>
                    <div className="col-span-3 text-slate-100/[0.75] font-bebasneue text-7xl lg:text-8xl text-center relative h-[250px] w-full">
                        <span className="z-10">Pembayaran</span>
                    </div>
                </div>

                <div className="md:mx-24 lg:mx-40 pb-8 xl:pl-8 my-5 rounded-3xl bg-gradient-to-r from-[#a4a4ac] to-[#70647c] text-white">
                    <div className="container relative">
                        <div className="absolute items-start w-7/12  lg:w-6/12">
                                <img src={`${oborHitam}`} alt="logo" className="justify-left opacity-5 "/>
                            </div>
                        <div className="grid grid-cols-5 grid-rows-2 gap-y-4 pl-10 lg:pl-5 pt-10 tracking-tighter relative mr-14 lg:mr-32">
                            
                            <div className='col-span-2'>
                                <p className="text-2xl lg:text-4xl font-semibold leading-none font-plusjakartasans">Biaya Registrasi</p>
                                <p className="text-sm xl:text-3xl font-bold leading-snug font-plusjakartasans [word-spacing:5px]">Rp {Fee[0]['sum'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                            </div>
                            <div className="col-span-2 col-start-1 row-start-2">
                                <p className="text-2xl lg:text-4xl font-semibold leading-none font-plusjakartasans">Biaya WO</p>
                                <p className="text-sm xl:text-3xl font-bold leading-snug font-plusjakartasans [word-spacing:5px]">Rp {Fee[1]['sum'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                            </div>
                            <div className="col-span-2 col-start-3 row-start-1">
                                <p className="text-2xl lg:text-4xl font-semibold leading-none font-plusjakartasans">Kode Pembayaran</p>
                                <p className="text-sm xl:text-2xl leading-snug font-plusjakartasans [word-spacing:5px]">{response.kode}</p>
                            </div>
                            <div className="col-span-2 row-span-2 col-start-3 row-start-2">
                                <div className='text-xl font-plusjakartasans'>
                                <p className="text-2xl lg:text-4xl font-semibold leading-none font-plusjakartasans">Rekening Tujuan</p>
                                <p className="text-sm xl:text-2xl leading-snug font-plusjakartasans [word-spacing:5px]">BCA 0760237906  an Yendra Yohannes dan Ovan Christanto.</p>
 
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-flow-dense grid-cols-3tracking-tighter pt-5 mr-6">
                            <div className="col-start-3 text-end justify-items-end items-end tracking-tighter items-down pr-5">
                                <p className="text-2xl lg:text-3xl xl:text-5xl font-semibold">Total Biaya</p>
                                <p className="text-2xl lg:text-4xl xl:text-5xl text-yellow-300 font-semibold">Rp {response.invoice_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                            </div>
                        </div>
                    </div>  
                </div>

                        

                <div className="md:px-6 lg:mx-10 xl:mx-16 xl:px-0">
                    <div className="pl-8 pr-4 lg:px-28 py-5 pt-24 mx-3 tracking-wid ">
                        <h1 className="font-plusjakartasans py-7 text-3xl lg:text-4xl text-center text-white font-semibold">Persyaratan Umum</h1>

                         <div className='flex mb-8 ml-6 lg:ml-0'>
                             <ol className="font-plusjakartasans pt-5 text-white text-justify xl:text-left text-sm lg:text-xl list-decimal">
                                 <li>Pembayaran dilakukan melalui transfer ke rekening BCA 0760237906  an Yendra Yohannes dan Ovan Christanto. Masukan kode tagihan sebagai berita transfer. Bukti transfer harap disimpan.
                                 </li>
                                 <li>Pembayaran hanya bisa dilakukan dari pukul 03.00 WIB hingga 23.55 WIB
                                </li>
                         <li>Harap mentransfer tepat sesuai nilai total tagihan yang tertera termasuk kode unik.
                                 </li>
                               <li>Tunggu minimal 30 menit setelah transfer sebelum melakukan verifikasi pembayaran.
                                 </li>
                                 <li>Jika dalam 6 jam pembayaran anda belum terverifikasi di email anda harap hubungi panitia pendaftaran lomba anda
                                 </li>
                                <li>Slot anda sudah direservasi selama 24 jam. Tagihan anda akan terhapus jika tidak ada pembayaran dalam 24 jam dan reservasi akan dibatalkan.
                                </li>
                             </ol>                                   
                        </div>
                    </div>
                </div>

            <div className='flex items-center justify-center text-white font-plusjakartasans'>
                    <button onClick={donwloadPDF} href="" target="blank" className='flex gap-2 border-2 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-xl w-full mx-36 md:px-4 md:py-2 xl:px-7 xl:py-[0.7rem] text-xl '>
                        <div className='mt-[0.2rem]'><BsDownload size={22} style={{strokeWidth: "1"}}/> </div>
                        <div >Unduh Halaman Ini</div>
                    </button>
                </div>
                <div className='flex items-center justify-center text-white mt-5 mb-20  '>
                    <a href="/" target="blank" className='flex gap-2 bg-[#b084fc] rounded-full HOVER-GLOW rounded-xl w-full mx-36 md:px-4 md:py-2 xl:px-7 xl:py-[0.7rem] text-xl'>
                        <div className='mt-[0.2rem] text-slate-100'>Kembali ke Beranda</div>
                    </a>
                        </div>
            </div>
            <Footer/>
        </div>
        }
        </>
    );
};

  
export default PembayaranPage;