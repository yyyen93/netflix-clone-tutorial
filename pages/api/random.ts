// [1]
import { NextApiRequest, NextApiResponse} from 'next';
import prismadb from '../../lib/prismadb';
import serverAuth from '../../lib/serverAuth'; // Remember we created serverAuth in order to authenticate  our route.

// [2]
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    //limit function only works for GET request.
    if(req.method !== 'GET'){
        return res.status(405).end();
    }

    try{
        // Check are we logged in.
        await serverAuth(req,res);

        // Find the random movie that will be loaded when the time we refresh 
        const movieCount = await prismadb.movie.count();
        // Random generate integefer from the movie count
        const randomIndex = Math.floor(Math.random() * movieCount);
        // Find the random movie object from the database. Using pagination to make our algorithm for a random movie 
        const randomMovies = await prismadb.movie.findMany({
            take:1,
            skip: randomIndex
        })
        
        // randomMovies is an array, but we only want 1 inside. Why i know we will be taking [0], because at the randomMovies, i explicitely say take 1.
        return res.status(200).json(randomMovies[0]);

    }catch(error){
        console.log(error);
        return res.status(400).end();
    }
}
