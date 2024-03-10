
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();

    return (
        <div className="w-full h-24 bg-purple-bg sticky top-0 z-10">
            {/* HEADER */}
            <div className="flex items-center justify-between w-full h-24 bg-gradient-to-b from-gray-300/[0.2] from-40% to-gray-400/[0.2] backdrop-blur-md sticky top-0">
                {/* LOGO */}
                <button className="flex items-center flex-shrink-0 ml-8" onClick={() => navigate('../')}>
                    <img src={require(`../assets/Obor putih.png`)} className="object-contain h-16 w-16"/>
                    <span className="text-slate-100 text-3xl font-semibold font-plusjakartasans -ml-3">Smakonecup</span>
                </button>
                {/* LOGIN BUTTON
                <div className="justify-self-end items-center mr-10">
                    <button className="flex items-center justify-center h-14 w-32 bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW" onClick={() => navigate('../login')}>
                        <span className="text-slate-100 text-2xl font-semibold font-plusjakartasans">Login</span>
                    </button>
                </div> */}
            </div>
        </div>
    );
}

export default Header;