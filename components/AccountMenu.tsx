// [1]
import {signOut} from 'next-auth/react';
import React from 'react';

// [7]
import useCurrentUser from '../hooks/useCurrentUser';

// [2]
interface AccountMenuProps{
    visible?: boolean;
}


// [3]
const AccountMenu: React.FC<AccountMenuProps> = ({visible}) => {
    // [6]
    const {data} = useCurrentUser();

    if(!visible){
        return null;
    }

    return(
        <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
            <div className="flex flex-col gap-3">
                {/* [4] Create container for profile image */}
                <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                    <img className="w-8 rounded-md" src="/images/default-red.png" alt="profile-pic"/>
                    <p className="text-white text-sm group-hover/item:underline">
                        {/* [8] */}
                        {data?.name}
                    </p>
                </div>
                <hr className="bg-gray-600 border-0 h-px my-4"/>
                {/* {5} Add onClick to trigger sign out */}
                <div onClick={()=> signOut()} className="px-3 text-center text-white text-sm 8hover:underline">
                    Sign out of Netflix
                </div>
            </div>
        </div>
    ) 
};

export default AccountMenu;

/**
 * group/item : A way we can target multiple group inside another group.
 */