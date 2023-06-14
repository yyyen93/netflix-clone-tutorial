/**React SWR 
 * is a library that stands for "Stale-While-Revalidate." It is a data fetching and caching library for React applications. SWR provides a lightweight and intuitive approach to handling remote data fetching, caching, and synchronization with the UI. 
*/
/** Exaplanation:
 *  SWR is very good in fetching data. Its something similar as react query.
 * basically the first time we fetch  this API 'useCurrentUser', no matter where we use this hook, it is not going to fetch again.if the data is already exists.
 * basically this way, we don't redux or any state management for fetching our user.
 * 
 */

// [1]
import useSWR from 'swr'
import fetcher from '../lib/fetcher';

// [2] hook
const useCurrentUser = () => {
    //[3] current is the endpoint we defined in current.ts and we also use fetcher.
    const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

    return{
        data,
        error,
        isLoading,
        mutate
    }
};

export default useCurrentUser;