// [1]
import React from 'react';
import {isEmpty} from 'lodash';
// [6]
import MovieCard from '../components/MovieCard';

// [3]
interface MovieListProps{
    // this is an array， not an objects
    data: Record<string, any>[];
    title:string
}


// [2]
const MovieList:React.FC<MovieListProps> = ({data, title}) => {
    // [4] Check with lodash is our array is empty.
    if(isEmpty(data)){
        return null;
    }

    return(
        <div className="px-4 md:px-12 mt-4 space-y-8">
            <div className="">
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                    {title}
                </p>
                {/* [5] Extract movie from data. Key value is to store movie data. */}
                <div className="grid grid-cols-4 gap-2">
                    {data.map((movie)=>(
                        // Old:  <div key={movie.id}>movie</div>
                        <MovieCard key={movie.id} data={movie} />
                    ))}
                </div>
            </div>
        </div>

    )
}

export default MovieList;


/**
 * To render the movies, the code uses the data.map() function, which iterates over each item in the data array.
 * For each movie object in the data array, it creates a <div> element. The key attribute is set to movie.id, which is used to uniquely identify each movie element in the list. Using a unique key is important for React to efficiently update and manage the rendered components.
 */