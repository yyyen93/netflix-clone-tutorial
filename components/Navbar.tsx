// [8]
import {useState , useCallback, useEffect} from 'react';

// [6]
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';

// [3]
import NavbarItem from '../components/NavbarItem';
import MobileMenu from '../components/MobileMenu';
import AccountMenu from '../components/AccountMenu';

/** [18]
 * Add dark background when scrolling. Otherwise keep transparent.
 * 66 is the number where the animation starts to looks good.
 */
const TOP_OFFSET = 66;


// 【1】
const Navbar = () => {
    // [7]
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    // [15]
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    // [19]
    const [showBackground, setShowBackground] = useState(false);

    // 【20】 function to set offset 66
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET ){
                setShowBackground(true);
            }else{
                setShowBackground(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

  
        /** Unmount functions
         * important have to remove eventlistener on our unmount event listener.
         * This functions in use effect algorith like this so have to return  
         * to remove handleScroll.
         */
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    // [9] simple function
    const toggleMobileMenu = useCallback(()=>{
        // [10] use current value and reverse current value
        setShowMobileMenu((current) => !current);
    }, []);//Make sure put dependency array


    // [16]
    const toggleAccountMenu = useCallback(()=>{
        setShowAccountMenu((current) => !current);
    }, []);

    return(
        // [2]
        <nav className=" w-full fixed z-40 ">
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>

                <img className="h-4 lg:h-7" src="/images/logo.png" alt="netflix"/>

                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    {/* [4] Just pass label called home */}
                    <NavbarItem label="Home" />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Films" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="My List" />
                    <NavbarItem label="Browse by Languages" />
                </div>

                {/* [5] This is visible on mobile screen / smaller screen/ [11]trigger toggleMobileMenu whether to show or hide */}
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0' }`}/>
                    {/* [6] Make mobilemenu dynamic, trigger when click 'browse' */}
                    <MobileMenu visible={showMobileMenu} />
                </div>

                {/* [12] Create Profile Menu */}
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch />
                    </div>

                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell />
                    </div>

                    {/* [13] This is collapsible and hidden in mobile | [17] Add onClick toggleAccountMenu */}
                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-red.png" alt="profile"/>
                        </div>
                        {/* [17] if show accountmenu, i want to rotate 180 otherwise rotate back to 0 */}
                        <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'} `} />
                        {/* [14] AccountMenu Component */}
                        <AccountMenu visible={showAccountMenu}/>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar;

/**
 * z-40 : we want it to be above other things.
 */