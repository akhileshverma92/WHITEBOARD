import React, { useState } from 'react';
import {
    Users,
    Shield,
    Palette,
    MousePointer,
    Send
} from 'lucide-react';
import { SignInButton } from '@clerk/clerk-react';

const Login = () => {


    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between">
                {/* Left Side - Features and Description */}
                <div className="md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 p-8 md:p-12 text-white flex flex-col justify-center">
                    <h1 className="text-3xl font-bold mb-6 flex items-center">
                        <Palette className="mr-3" /> Collaborative Whiteboard
                    </h1>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Users className="text-yellow-300" />
                            <p>Real-time Collaboration</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <MousePointer className="text-green-300" />
                            <p>Intuitive Drawing Tools</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Shield className="text-red-300" />
                            <p>Secure Room-Based Access</p>
                        </div>
                    </div>

                    <div className="mt-8 text-sm opacity-75">
                        <p>Connect, create, and collaborate seamlessly with our interactive whiteboard platform.</p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                {/* <div className="md:w-1/2 flex items-center justify-center p-8 md:p-12">
                    <form

                        className="w-full max-w-md space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-center text-gray-800">
                            Welcome Back
                        </h2>

                        <div className="relative">

                            <div className=" inset-y-0 right-0 pr-3 flex justify-center items-center text-gray-400">
                           <button className='rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-serif font-semibold  w-full px-32  py-5 border border-black bottom-3'><SignInButton/></button>
                            </div>
                            <SignInButton/>
                        </div>


                    </form>
                </div> */}
                <div className="right flex flex-col md:pr-[10rem]">
                    <h2 className=' text-xl font-serif font-semibold'>
                        Welcome Back    

                    </h2>
                    <div className="relative">
                        <div className=" inset-y-0 right-0 px-5 py-3 bg-gradient-to-br from-indigo-600  to-purple-600 text-white  flex justify-center items-center rounded-xl">
                            <SignInButton/>
                        </div>
                        </div>
                    
                </div>
              
            </div>
        </div>
    );
};

export default Login;