// [1] import
import { PrismaClient } from '@prisma/client';

// [2] The reason of doing this is because of nextJS hot preloading
//hot preloading means that on every code change, our code updates and re-runs
//Prisma in this case is that it creates a bunch of this new PrismaClient instances
//And if you get an error saying 'warn(prisma-client) Already 10 Prisma Clients are actively running.'
//So, we do a trick which can be find in goggle and is a practice that is done. Is when we save PrismaClient in a global file. Global file is not affected by hot reloading so that's why it works and in production, we don't do that so we just make sure everything is normal.
//Just make sure you have a file like this.
const client = global.prismadb || new PrismaClient(); 
if(process.env.NODE_ENV === 'production') global.prismadb = client;

export default client;