import axios from 'axios';
import Input from "../components/Input";

import { useCallback, useState } from "react";// usecallback is a react hook

// [22] get details from [...nextauth.ts]
import {signIn} from 'next-auth/react';
// [24]
// import {useRouter} from 'next/router';


// [28] use React-icons
import {FcGoogle} from 'react-icons/fc'; 
import {FaGithub} from 'react-icons/fa';


// [1]
const Auth = () => {
    // [25] this router is a hook
    // const router = useRouter();

    // [8] Set default state email and setEmail which will be use in below Input component.
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    // [12] Create a variant toggle method which can switch between login and register
    const [variant, setVariant] = useState('login');

    // [13] Create a toggleVariant method
    const toggleVariant = useCallback(() => {
        //if currentVariant is login, then will toggle register, otherwise stay login.
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login'); 
        //Make sure add dependency array [] 
    }, [])

    // [23] Login function
    const login = useCallback(async() => {
        try{
            await signIn('credentials', {
                email,
                password,
                // redirect: false,
                callbackUrl: '/profiles',
            });
    
            //[26] redicrect to '/' route
            // router.push('/profiles');
            
        }catch(error){
            console.log(error);
        }
    },[email, password]);

    // [19] Create register function
    const register = useCallback(async() => {
        try{
            await axios.post('/api/register',{
                // In this body element, send couple of builds
                email,
                name,
                password
            });

            // [27] After register, straight to login
            login();
        }catch(error){
            console.log(error);
        }
    }, [email, name, password, login]);


    return(
        // [2] Give background consist of hero.jpg. Special background: bg-[url('/images/hero.jpg'))]
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            {/* [3] Small black overlay over image  */}
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                {/* [4] Navigation with logo  */}
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="logo" className="h-12"/>
                </nav>

                {/* [5] container contain inputs, button & others */}
                <div className="">
                    <div className="flex justify-center">
                        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                            {/* [6] Title */}
                            <h2 className="text-white text-4xl mb-8 font-semibold">
                                {/* [15] Instead of plain 'sign in', we can change it */}
                                {variant === 'login' ? 'Sign in' : 'Register'}
                            </h2>
                            {/* [7] Inputs */}
                            <div className="flex flex-col gap-4">
                                {/* [16] Not showing Email label when in 'sign in' */}
                                {variant === 'register' && (
                                    <Input 
                                    label="Username"
                                    onChange={(event: any)=> setName(event.target.value)}
                                    id="name"
                                    type="name"
                                    value={name}
                                />
                                )}
                                <Input 
                                    // [9] Input component from input.tsx . 
                                    label="Email"
                                    onChange={(event: any)=> setEmail(event.target.value)}
                                    id="email"
                                    type="email"
                                    value={email}
                                />
                                <Input 
                                    label="Password"
                                    onChange={(event: any)=> setPassword(event.target.value)}
                                    id="password"
                                    type="password"
                                    value={password}
                                />
                            </div>
                            {/* [10] Create button */}
                            {/* [21] call register or login function */}
                            <button onClick={variant === 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                                    {/* [16] */}
                                    {variant === 'login' ? 'Login' : 'Sign up'}
                            </button>
                            {/* [29] */}
                            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                                <div onClick={() => signIn('google', {callbackUrl: '/profiles'})}  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                    <FcGoogle size={32}/>
                                </div>
                                
                                <div onClick={() => signIn('github', {callbackUrl: '/profiles'})} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                    <FaGithub size={32}/>
                                </div>
                            </div>
                            {/* [11] Create p tag */}
                            <p className="text-neutral-500 mt-12">
                                {/* [17] */}
                                {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
                                {/* [14] use toggleVariant */}
                                <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                    {/* [18] */}
                                    {variant === 'login' ? 'Create an account' : 'Login'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}; 

export default Auth;