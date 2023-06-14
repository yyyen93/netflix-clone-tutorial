// This component have many classes.

// [1]
import React from 'react';
import {BsFillPlayFill} from 'react-icons/bs'
import {BiChevronDown} from 'react-icons/bi'
import FavoriteButton from './FavoriteButton';

// [8]
import {useRouter} from 'next/router';

// [11] 
import useInfoModal from '../hooks/useInfoModal'

// [2]
interface MovieCardProps{
    data: Record<string, any>
}

const MovieCard: React.FC<MovieCardProps> = ({data}) => {

    // [9]
    const router = useRouter();
    // [12]
    const { openModal } = useInfoModal();

    return(
        <div className="group bg-zinc-900 col-span relative h-[12vw]">
            {/* [3] */}
            <img className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]" src={data.thumbnailUrl} alt="Thumbnail" />
            {/* [4] float above the position effect. */}
            <div className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
                <img className="cursor-pointer object-hover transition duration shadow-xl rounded-t-md w-full h-[12vw]" src={data.thumbnailUrl} alt="Thumbnail" />
                {/* [5] Add element below that card to show more information */}
                <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
                    {/* [10] show title */}
                    <div>
                        <p className="text-green-400 font-bold text-lg mb-3"> 
                            <span className="text-white">
                                Title :  
                            </span> 
                            <span className="ml-2">
                            {data?.title}
                            </span>
                        </p>
                    </div>
                    <div className="flex flex-row gap-3">
                            {/* [7] Add onclick router push to play movie. */}
                            <div onClick={()=> router.push(`/watch/${data?.id}`)} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neautral-300">
                                <BsFillPlayFill size={30}/>
                            </div>
                            {/* [6] Add favorite button  */}
                            <FavoriteButton movieId={data.id} />
                            {/* [13] Add button */}
                            <div 
                            onClick={()=> openModal(data?.id)}
                            className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
                                <BiChevronDown className="text-white group-hover/item:text-neutral-300" size={30}/> 

                            </div>
                    </div>
                    <p className="text-green-400 font-semibold mt-4">
                        New <span className="text-white">2023</span>
                    </p>
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
                    </div>
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;

