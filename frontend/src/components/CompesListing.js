import React, {useEffect, useState} from 'react';

import CompesListingDetails from './CompesListingDetails';
import TutorialPopup from './TutorialPopup';
import Header from './Header';
import Footer from './Footer';
import Tags from './Tags';
import useFetch from './useFetch';

import glow_1 from '../assets/Glow.svg';
import glow_2 from '../assets/Glow_1.svg';
import glow_3 from '../assets/Glow_2.svg';


const CompesListing = () => {

    const competitions = useFetch('Competition'); 

    const [selectedLevel, setSelectedLevel] = useState("All");
    const [filteredCompes, setFilteredCompes] = useState(competitions);

    const[showTutorial, setShowTutorial] = useState(true);

    const handleTag = (selectedTag) => {
        if (selectedTag == "Pilih di sini") {
            setSelectedLevel("All");
            return;
        }
        setSelectedLevel(selectedTag);
        //selected(selectedTag === selectedLevel ? setSelectedLevel("") : setSelectedLevel(selectedTag))
    }

    const [searchInput, setSearchInput] = useState("");

    const updateSearchInput = (e) => {
        setSearchInput(e.target.value);
    }

    const grouping = (a) => {
        return a
            .map((compe) => ({name:compe.name.split(" "), compe:compe}))
            .reduce((prev, cur) => {
                let posterName;
                if (cur.name[0] === "JHS") posterName = cur.name[1]
                else if (cur.name[0] === "Badminton") posterName = cur.name[2];
                else if (cur.name[0] === "Model") posterName = cur.name[3];
                else posterName = cur.name[0]
                // console.log(posterName);

                prev[posterName] = prev[posterName] || [];
                prev[posterName].push(cur.compe);
                return prev;
            }, {});
    }
    
    useEffect( //filteringCompes
        () => {
            let filteredCompes;

            if (selectedLevel === "All") {
                filteredCompes = competitions;
            } else {
                filteredCompes = competitions.filter(compe => (compe.level.includes(selectedLevel)));
            }

            if (searchInput != "") {
                filteredCompes = filteredCompes.filter(compe => (compe.name.toLowerCase().includes(searchInput)));
            }

            setFilteredCompes(grouping(filteredCompes));

            // console.log(competitions);
        }
    , [selectedLevel, searchInput, competitions]);
    // console.log(competitions);
    // console.log(filteredCompes);
    
    return(
        <div className="bg-black z-0">
            {showTutorial && <TutorialPopup setShowTutorialFunction={setShowTutorial}/>}
            {/* <div>
                <div className="pb-20">
                    <div className="pt-5 pb-2">  
                        <h1 className="text-5xl text-center font-bold text-yellow-400 mb-5 pt-3">Registrasi Lomba</h1>
                        <hr className='bg-yellow-400 border-0 pt-1'/>
                    </div>

                    <div className='flex md:mx-10 lg:mx-8 xl:mx-20 justify-center'>
                        <div className="">
                            <Tags 
                                selectedLevel={selectedLevel}
                                handleTag={handleTag}
                            />
                            <div className='grid md:grid-cols-3 md:gap-2 lg:grid-cols-4 xl:gap-10 mx-auto'>
                            {filteredCompes &&
                                Object.keys(filteredCompes).map((key, index) => (
                                    <CompesListingDetails keyCompe={key} compes={filteredCompes[key]} key={index}/>
                                ))
                            }
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div> */}
            <div>
                
                <Header/>

                {/* MAIN CONTENT */}
                <div className={`w-full h-full bg-purple-bg z-0 ${showTutorial && 'overflow-hidden'} `}>
                    {/* TITLE */}
                    <div className="relative h-[400px] w-full flex justify-center items-center">
                        <span className="relative text-slate-100/[0.75] text-9xl font-bebasneue">
                            <span className="z-10">Registrasi</span>
                            <img className="absolute -left-36 -top-12 opacity-75" src={glow_1}/>
                            <img className="absolute -right-40 -top-32 opacity-75" src={glow_2}/>
                            <img className="absolute -left-12 top-0 opacity-75" src={glow_3}/>
                        </span>
                    </div>

                    {/* COMPE LISTING */}
                    <div className={`flex -mt-20 md:mx-10 lg:mx-8 xl:mx-20 ${!showTutorial && 'mb-20'} justify-center`}>
                        <div className="">
                            <Tags 
                                selectedLevel={selectedLevel}
                                handleTag={handleTag}
                                searchInput={searchInput}
                                updateSearchInput={updateSearchInput}
                            />
                            <div className={`grid md:grid-cols-3 md:gap-2 lg:grid-cols-4 xl:gap-10 mx-auto ${showTutorial ? 'h-[calc(100vh-65vh)]' : ''}`}>
                            {filteredCompes &&
                                Object.keys(filteredCompes).map((key, index) => (
                                    <CompesListingDetails keyCompe={key} compes={filteredCompes[key]} key={index}/>
                                ))
                            }
                            </div>
                        </div>
                    </div>

                    {!showTutorial && <Footer/>}
                </div>
            </div>
        </div>
    );
};

export default CompesListing;
