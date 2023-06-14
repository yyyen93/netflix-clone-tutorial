// [1] We're doing request so use axios
import axios from 'axios';
import React, {useCallback, useMemo} from 'react';
import {AiOutlinePlus, AiOutlineCheck} from 'react-icons/ai';

import useCurrentUser from '../hooks/useCurrentUser';
import useFavorites from '../hooks/useFavorites';

// [2]
interface FavoriteButtonProps{
    movieId: string,
}

// [3]
const FavoriteButton:React.FC<FavoriteButtonProps> = ({movieId}) =>{
    // [5] Add functionality to the button. Get mutate in useFavorites
    const { mutate: mutateFavorites } = useFavorites();
    const {data: currentUser, mutate} = useCurrentUser();

    // [6] Create a checked variable to see the movie is favorited or not.
    const isFavorite = useMemo(()=> {
        // [7]So, we're going to search the currentUser in their favorite IDs, so we going to see the current list includes the passive movie ID and 
        const list = currentUser?.favoriteIds || [];

        return list.includes(movieId);

        // [8] Add dependancy currentUser and movieId.
    },[currentUser, movieId]);


    // [9] Create a function to handle the favorite button click.
    const toggleFavorites = useCallback(async() => {

        let response;
        // Once we clicked toggleFavorites, we want to check if the current movie is favorited, if it is we want to trigger the delete axios request.
        if(isFavorite){
            response = await axios.delete(`/api/favorite?movieId=${movieId}`)
        }else{
            // if is not favorite, we want to add it in to favorites. Since its a post method, we don't have to add explicit  {data: {movieId}}, you have to do it for delete request. For post request, we just nee movieId
            response = await axios.post('/api/favorite', {movieId});  
        }

        const updatedFavoriteIds = response?.data?.favoriteIds;

        // Don't want mutate anything else. The field we want to mutate is favorite IDs which field well updated favorite Ids.
        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds
        });

        mutateFavorites();
    },[movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    // [10] Add icon switch
    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;


    return(
        // [10] Add onClick toggleFavorites event to this div.
        <div onClick={toggleFavorites} className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-netural-300 ">
            {/* [4] React button. 
                Make the icon dynamic. 
                Want it become checked mark when already added it to favorites.
            */}
            {/* <Icon  className="text-white" size={25} /> */}
            <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
            
        </div>
    )
} 

export default FavoriteButton;