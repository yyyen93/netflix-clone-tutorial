// This is very important so its in square bracket []

//[1]
import {NextApiRequest, NextApiResponse} from 'next';

import prismadb from '../../../lib/prismadb';
import serverAuth from '../../../lib/serverAuth';

// [2]
export default async function handler(req:NextApiRequest, res:NextApiResponse){

    if(req.method !=='GET'){
        return res.status(405).end();
    }

    try{
        await serverAuth(req,res);
        /** [3]
         *  Get movieId from req.query
         * Where did the req.query came from? In nextJS, we defined a route name in square bracket [movieId], Its going to know that this is going to put that in the req.query, In this case, we named it movieId, so we can search the movieId.
         */
        const {movieId} = req.query;

        // [4] Check what type of movie we have sent.
        if(typeof movieId !== 'string'){
            throw new Error('Invalid ID');
        }

        // [5] Check if we don't have movieId
        if(!movieId){
            throw new Error('Invalid ID');
        }

        // [6] Find the movie
        const movie = await prismadb.movie.findUnique({
            where: {
                // Get the ID from our request parameter.
                id: movieId    
            }
        })

        // [7] Check movie exist?
        if(!movie){
            throw new Error('ID movie is not exist')
        }

        // [8] return success
        return res.status(200).json(movie);

    }catch(error){
        console.log(error);
        return res.status(400).end()
    }
}