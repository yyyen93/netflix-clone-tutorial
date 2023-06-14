// [1]
import React, {useCallback, useEffect, useState} from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import PlayButton from './PlayButton';
import FavoriteButton from './FavoriteButton';
import useInfoModal from '../hooks/useInfoModal';
import useMovie from '../hooks/useMovie';

// [2]
interface InfoModalProps{
    visible?: boolean;
    onClose: any;
};

// [3]
const InfoModal:React.FC<InfoModalProps> = ({visible, onClose}) =>{
    /** [4]
     * Create state
     * visible is boolean make sure to add !!
     */
    const [isVisible, setIsVisible] = useState(!!visible);

    // [5] Fetch movieId
    /** [5]
     *  Fetch movieId from useInfoModal.ts
     */
    const {movieId} = useInfoModal();

    // [6] fetch default data empty object from useMovie with the movieId.
    const { data = {} } = useMovie(movieId); 

    /** [7]
     *  Create useEffect()
     *  setIsVisible on every new visible change
     */
    useEffect(() => {
        setIsVisible(!!visible);
    },[visible])

    // [8] handle close function
    const handleClose = useCallback(()=>{
        setIsVisible(false);
        // [9] setTimeout is a trick so we can play cool animation in our model.
        setTimeout(()=>{
            onClose();
        },300)
    },[onClose]);

    // [11] Not visible?
    if(!visible){
        return null;
    }

    // [12] if visible return infoModal
    return (
        <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
            <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
                <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
                    <div className="relative h-96">
                        <video className="w-full brightness-[60%] object-cover h-full" autoPlay muted loop poster={data?.thumbnailUrl} src={data?.videoUrl}></video>
                        {/* Close button */}
                        <div className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center" onClick={handleClose}>
                            <AiOutlineClose className="text-white" size={20} />
                        </div>
                        <div className="absolute bottom-[10%] left-10 ">
                            <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-80">
                                {data?.title}
                            </p>
                            {/* Add button */}
                            <div className="flex flex-row gap-4 items-center">
                                <PlayButton movieId={data?.id} />
                                <FavoriteButton movieId={data?.id} />
                            </div>
                        </div>
                    </div>

                    <div className="px-12 py-8">
                        <p className="text-green-400 font-semibold text-lg">
                            New
                        </p>
                        <p className="text-white text-lg">
                            {data?.duration}
                        </p>
                        <p className="text-white text-lg">
                            {data?.genre}
                        </p>
                        <p className="text-white text-lg">
                            {data?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default InfoModal;
