
import React, { useState } from "react";
import Header from "./Header";

import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const navigate = useNavigate();

    const [showResultPage, setShowResultPage] = useState(false);
    const [token, setToken] = useState("");

    const onTokenUpdate = (e) => {
        setToken(e.target.value);
    }

    const mainForm = () => {
        return (
            <>
                <span className="text-6xl font-bold">Selamat Datang!</span>
                <span className="text-4xl font-medium mt-5">Mohon masukkan token Anda</span>
                <div className="justify-self-end items-center mt-10">
                    <div className="h-[14rem] w-[48rem] bg-gradient-to-r from-neutral-400/[0.6] to-neutral-500/[0.6] rounded-[2rem] backdrop-blur-md z-20 p-12">
                        <span className="font-plusjakartasans text-white text-3xl font-semibold">Token</span>
                        <input className="h-14 w-full bg-white rounded-full mt-5 text-black text-3xl p-6" value={token} onChange={(e) => onTokenUpdate(e)}></input>
                    </div>
                </div>
                <button className="h-14 w-full bg-[#A885FF] rounded-full mt-8 text-2xl font-plusjakartasans font-semibold" onClick={() => setShowResultPage(true)}>Submit</button>
            </>
        );
    }

    const resultPage = () => {
        return (
            <>
                <span className="text-6xl font-bold">Hai, Lorem Ipsum!</span>
                <span className="text-4xl font-medium mt-5">Silahkan memilih opsi berikut</span>
                <button className="h-[4rem] w-[40rem] bg-gradient-to-r from-neutral-400/[0.6] to-neutral-500/[0.6] rounded-[2rem] backdrop-blur-md z-20 rounded-full mt-6 text-2xl font-plusjakartasans font-semibold HOVER-GLOW">Edit Data</button>
                <button className="h-[4rem] w-[40rem] bg-gradient-to-r from-neutral-400/[0.6] to-neutral-500/[0.6] rounded-[2rem] backdrop-blur-md z-20 rounded-full mt-6 text-2xl font-plusjakartasans font-semibold HOVER-GLOW" onClick={() => navigate("./status")}>Cek Status</button>
            </>
        );
    }

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
                                {showResultPage ? resultPage() : mainForm()}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;