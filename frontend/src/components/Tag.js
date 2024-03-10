import React from 'react';

const Tag = ({filters, id, handleTag, selectedLevel, selectedStatus}) => {

    return(
        <div>
            {filters.map((fil, index) => (
                <div key={index} className="inline-grid mr-3">
                    <button onClick={() => handleTag(id, fil)} 
                        className={` px-6 py-2 mx-1 my-3 lg:px-10 lg:py-4 lg:mx-3 lg:my-0 font-bold bg-yellow-400 rounded-3xl drop-shadow-[2px_2px_4px_rgba(0,0,0,0.4)] border-b-4 border-yellow-500
                            ${selectedLevel.includes(fil) || selectedStatus.includes(fil) ? `active: bg-yellow-500` : `hover:bg-yellow-300 hover:border-b-2 hover:scale-[1.1]`}`}  
                    >
                        {fil}
                    </button>
                </div>   
            ))}

        </div>
    )
}

export default Tag;