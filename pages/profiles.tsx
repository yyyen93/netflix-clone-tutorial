// [2]
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react';
import useCurrentUser from '../hooks/useCurrentUser';
import {useRouter} from 'next/router';

// [3]
export async function getServerSideProps(context: NextPageContext){
    const session = await getSession(context);

    if(!session){
        return {
            redirect: {
                destination: '/auth',
                permanent:false
            }
        }
    }

    return{
        props: {}
    }

}


// [1]
const Profiles = () => {
    // [7]
    const router = useRouter();

    // [5]
    const { data: user } = useCurrentUser();

    return(
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">Who is watching?</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={() => router.push('/')}>
                        {/* [4] Style the actual profile */}
                        {/* group is similar className to peer which we had in input. */}
                        <div className="group flex-row w-44 mx-auto">
                            <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                                <img src="/images/default-red.png" alt="Profile" />
                            </div>
                            <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                                {/* [6] */}
                                {user?.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profiles;