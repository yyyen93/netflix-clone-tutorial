//What are the purpose of fetcher?
//Answer: Its for front-end fetching.

// Use axios for this. Axos is imported from auth.

// [1]
import axios from 'axios';

//trigger axios to get url, when success, it just return the response data.
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;