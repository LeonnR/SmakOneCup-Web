import React from 'react';
import { useNavigate } from 'react-router-dom';

import importPosters from './importPosters';


const CompesListingDetails = ({keyCompe, compes}) => {
    let navigate = useNavigate();
    // console.log(compes);

    const groupByName = compes.reduce((group, cur) => {
        group[cur.name] = group[cur.name] || [];
        group[cur.name].push(cur);
        return group;
    }, {})
    // console.log(groupByName);
    const compeName = compes[0].name.split(" ");
    const posterName = compeName[0] === "JHS" ? compeName[1] : compeName[0];
    // console.log(posterName)
    // const levels = compe.level.replace(", ", " & ");

    return(
        <>
        <div className="grid rows-2 rounded-3xl lg:mt-2">
            <div className="h-50 w-full">
                <img src={`${importPosters[posterName]}`} alt="logo" className="rounded-3xl md:h-auto md:w-[16em] lg:h-auto lg:w-[18rem] xl:h-auto xl:w-96 px-4"/>
            </div>
            <div>
                {Object.entries(groupByName).map((compe, index) => (
                    <div className="text-white md:text-lg xl:text-2xl font-semibold font-plusjakartasans text-center mt-5 items-center justify-center " key={index}>
                        <div className="mb-3">
                            
                            {posterName === "Badminton" 
                                ? <p>{compeName[0]}<br/>{compeName.slice(1).join(" ")}</p>
                                : <p>{compe[0]}</p>
                            }
                        </div>
                        <div className='md:flex md:items-center md:justify-center'>
                            {Object.entries(compe[1]).map((com, ind) => (
                                <button className="md:mx-1 md:py-1 md:px-4 lg:mx-3 lg:px-5 xl:py-1 xl:px-7 text-xl w-full h-12 bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW" 
                                    key={`${index}.${ind}`} onClick={() => navigate(`/${com[1].id}`)}>
                                    {com[1].level.replace(", ", " & ").replace(", ", " & ")}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};
//onClick={() => navigate(`/${index}`)}
export default CompesListingDetails;