//Movies API

// [1]
import {NextApiRequest, NextApiResponse} from 'next';
import prismadb from '../../../lib/prismadb';
import serverAuth from '../../../lib/serverAuth';

// [2]
export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method !== 'GET') {
        res.status(405).json({message: 'Method not allowed'});
    }

    try{
        // [3] This is gonna authenticate this route.
        await serverAuth(req,res);

        // [4] Load movies
        const movies = await prismadb.movie.findMany();

        // [5] return success
        return res.status(200).json(movies);

    }catch(error){
        console.log(error);
        return res.status(400).end();
    }


};