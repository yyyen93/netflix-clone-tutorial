import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prismadb from '../lib/prismadb';
import { authOptions } from "../pages/api/auth/[...nextauth]";


const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    throw new Error('Not signed in');
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    }
  });
  
  if (!currentUser) {
    throw new Error('Not signed in');
  }

  return { currentUser };
}

export default serverAuth;

/** Explanation:
 * The way it works is that we are using serverAuth in our API controller and pass the request parameter. The request parameter is going to hold the jvt token which the getSession can then use to get our logged in user.
 * There is a problem, getSession doesn't have all field we need in schema.prisma. So we use this session to get other field.
 * 
 * Conclusion: We will use serverAuth in all our API route to check whether the user is logged in or not.
 */