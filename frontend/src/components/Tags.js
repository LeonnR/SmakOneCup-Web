
import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';

const Tags = ({ handleTag, selectedLevel, searchInput, updateSearchInput}) => {
    const level = ['Pilih di sini', 'SMP', 'SMA', 'Umum'];

    //useEffect
    return(
        <div className="my-10">
            <div className="pr-5 text-2xl font-bold font-plusjakartasans ml-5 text-white">
                Jenjang
            </div>
            <div className="flex w-full justify-between">
                <div className="ml-4 mt-3 justify-self-start">
                    <select onChange={(e) => handleTag(e.target.value)}
                        className="py-3 px-28 text-2xl text-[#737373] font-plusjakartasans bg-gradient-to-r from-gray-300 from-40% to-gray-400 rounded-[20px]" >
                        {level.map((lev, index) => (
                            <option key={index} value={lev}>{lev}</option>
                        ))}
                    </select>
                </div>
                <div className="mr-4 mt-3 justify-self-end">
                        <input className="py-3 pl-12 text-2xl placeholder:text-[#737373] text-[#737373] placeholder:font-plusjakartasans font-plusjakartasans bg-gradient-to-r from-gray-300 from-40% to-gray-400 rounded-[20px]" placeholder={"Cari Lomba"} value={searchInput} onChange={updateSearchInput}>
                        </input>
                </div>
            </div>
        </div>
    );
}

export default Tags;