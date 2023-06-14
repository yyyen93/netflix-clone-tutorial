// [1] 
import {NextApiRequest, NextApiResponse} from 'next';
// [2] 
import serverAuth from '../../lib/serverAuth'

// [3]
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    /**  [4]
     *  Limit the function only for GET request.
     *  405 : wrong method
     */
    if(req.method !== 'GET'){
        return res.status(405).end();
    }

    //[5]
    try{
        // [6] fetch currentUser
        const {currentUser} = await serverAuth(req,res);
        return res.status(200).json(currentUser);

    }catch(error){
        console.log(error); //for development
        return res.status(400).end();
    }

};