
import React, { useState } from "react";
import Header from "./Header";

const StatusPage = () => {

    return (
        <div className="h-screen bg-purple-bg">
            {/* BACKGROUND IMAGE */}
            <div className="absolute z-0">
                <img src={require(`../assets/Obor putih.png`)} className="object-contain h-screen w-screen opacity-10"/>
            </div>

            {/* MAIN CONTENT */}
            <div className="z-10">
                <div>
                    <Header/>
                </div>
                <div className="w-full">
                    <div className="relative h-[800px] w-full flex justify-center items-center">
                        <span className="relative text-white font-plusjakartasans">
                            <span className="flex flex-col justify-center items-center">
                                <span className="text-5xl font-bold">Status Transaksi Anda</span>
                                <div className="justify-self-end items-center mt-10">
                                    <div className="flex flex-col justify-center items-center h-[30rem] w-[40rem] bg-gradient-to-r from-neutral-400/[0.6] to-neutral-500/[0.6] rounded-[2rem] backdrop-blur-md z-20 p-12">
                                        <span className="font-plusjakartasans text-red-500 text-3xl font-semibold">Menunggu Pembayaran</span>

                                        <span className="font-plusjakartasans text-white text-3xl font-semibold mt-8">Kode Tim</span>
                                        <span className="font-plusjakartasans text-white text-3xl">481748</span>

                                        <span className="font-plusjakartasans text-white text-3xl font-semibold mt-8">Nama Tim</span>
                                        <span className="font-plusjakartasans text-white text-3xl">502981</span>

                                        <span className="font-plusjakartasans text-white text-3xl font-semibold mt-8">Anggota Tim</span>
                                        <span className="font-plusjakartasans text-white text-3xl">084818</span>
                                    </div>
                                </div>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatusPage;