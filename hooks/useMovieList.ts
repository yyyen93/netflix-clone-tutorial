// [1]
import useSWR from 'swr';
import fetcher from '../lib/fetcher';


// [2] define hook
const useMovieList = () => {
    const {data,error,isLoading} = useSWR('/api/movies', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus:false,
        revalidateOnReconnect:false,
    });

    return{
        data,error,isLoading
    }
};

export default useMovieList;