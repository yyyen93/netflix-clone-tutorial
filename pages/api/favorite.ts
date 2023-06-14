// [1]
import {NextApiRequest, NextApiResponse} from 'next';
import {without} from 'lodash';

import prismadb from '../../lib/prismadb';
import serverAuth from '../../lib/serverAuth';


// [2]
export default async function handler(req:NextApiRequest, res:NextApiResponse){

    try{
        // [3] POST request :  Do the follow-ing
        if(req.method === 'POST'){
            const {currentUser} = await serverAuth(req,res);

            // [4] Get movies
            const {movieId} = req.body;

            // [5] Find movie from existing id
            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id:movieId,
                }
            });

            if(!existingMovie){
                throw new Error('Invalid ID');
            }

            /** [6]
             * Update user and push movieId in their favorite IDs
             * Please refer to schema.prisma, user section
             */
            const user  = await prismadb.user.update({
                where: {
                    //  Put || '' to avoid typescript
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: {
                        push: movieId,
                    }
                }
            });

            // return success
            return res.status(200).json(user);
        }

        // [7] DELETE request :  Do the follow-ing
        if (req.method === "DELETE") {
            const { currentUser } = await serverAuth(req, res);
      
            const { movieId } = req.query as { movieId: string };
      
            const existingMovie = await prismadb.movie.findUnique({
              where: {
                id: movieId,
              },
            });
      
            if (!existingMovie) {
              throw new Error("Invalid ID");
            }

             /** [8]
             * A list of our current favorite IDs without the movieId
             * Used lodash
             */
            const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);
      
             // [9] update the user
            const updatedUser = await prismadb.user.update({
              where: {
                email: currentUser.email || "",
              },
              data: {
                favoriteIds: updatedFavoriteIds,
              },
            });
      
            return res.status(200).json(updatedUser);
          }

        // [10] If not POST or DELETE, return error
        return res.status(405).end();

    }catch(error){
        console.log(error);
        return res.status(400).end();
    }
};

