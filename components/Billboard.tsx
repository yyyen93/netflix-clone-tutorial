// [1]
import React, { useCallback } from 'react';
// [2] 
import random from '../pages/api/random';
// [3] Hook
import useBillboard from '../hooks/useBillboard';
// [8] button 
import {AiOutlineInfoCircle} from 'react-icons/ai';
// [10]
import PlayButton from './PlayButton';
// [12]
import useInfoModal from '../hooks/useInfoModal';

// [4]
const Billboard = () => {
    // [5] import hook - get random movie data
    const { data } = useBillboard();

    // [13]
    const { openModal } = useInfoModal();

    // [11] 
    const handleOpenModal = useCallback(() => {
        openModal(data?.id);
    },[openModal, data?.id]);

    return(
        // [6] Loading Random Movie on the webpage
        <div className="relative h-[56.25vw]">
            <video 
                className="w-full h-[56.25vw] object-cover brightness-[60%]"
                autoPlay
                muted
                loop
                // poster={data?.thumbnailUrl}  
                poster={data?.thumbnailUrl} 
                src={data?.videoUrl}>
            </video>
            {/* [7] This div hold title and description */}
            <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
                <p className="
                text-white 
                text-1xl 
                md:text-5xl 
                h-full 
                w-[50%] 
                lg:text-6xl 
                font-bold 
                drop-shadow-xl
                ">
                    {data?.title}
                </p>
                <p className="
                    text-white
                    text-[8px]
                    md:text-lg
                    mt-3
                    md:mt-8
                    w-[90%]
                    md:w-[80%]
                    lg:w-[50%]
                    drop-shadow-xl
                ">
                    {data?.description}
                </p>
                {/* create button */}
                <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                    {/* [9] Add PlayButton.tsx here with the movieId data id */}
                    <PlayButton movieId={data?.id}/>
                    <button 
                    onClick={handleOpenModal}
                    className="
                        bg-white
                        text-white
                        bg-opacity-30
                        rounded-md
                        py-1 md:py-2
                        px-2 md:px-4
                        w-auto
                        text-xs lg:text-lg
                        font-semibold
                        flex
                        flex-row
                        items-center
                        hover:bg-opacity-20
                        transition
                    ">
                        <AiOutlineInfoCircle className="mr-1"/>
                        More Info
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Billboard;


/**
 * h-[56.25vw] : which mean it going to use 16.98 ratio which our movie are loaded in.
 * top-[30%] : top offset 30%
 * w : mobile device
 * md:w : medium device
 */