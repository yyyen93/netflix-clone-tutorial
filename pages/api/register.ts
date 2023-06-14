import bcrypt from 'bcrypt';
import {NextApiRequest, NextApiResponse} from 'next';
import prismadb from '../../lib/prismadb';

//[1]
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    //limit the handler to a post call
    if(req.method !== 'POST'){
        //This means we only want to allow post calls to this /api/register route
        return res.status(405).end();
    }

    try{
        // extract values needed from req.body
        const {email, name, password} = req.body;

        // check if an email has been taken
        const existingUser = await prismadb.user.findUnique({
            where: {
                email
            }
        });

        if(existingUser){
            return res.status(422).json({error: 'Email taken'});
        }

        // hash user password - make sure use await because it's asynchronous
        const hashedPassword = await bcrypt.hash(password, 12)

        // Save new hashedPassword into a new user model.
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date()
            }
        });

        // return success user response
        return res.status(200).json(user);

    }catch(error){
        return res.status(400).json({ error: `Something went wrong: ${error}` });
    }

}