"use client";

import React, { useState, useEffect } from 'react';
import { Suspense } from 'react'
import { useHydration } from '../hooks/useHydration';

const Page = () => {
    const imageUrl = "https://images.unsplash.com/photo-1642810533525-f0839298cfad?ixid=M3w2OTI1NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzU4NDM4NjF8&ixlib=rb-4.0.3";
    const hydrated = useHydration()

    const city = "Rome";
    const currentTempC = 0;
    const currentTempF = 32;
    const feelsLikeC = -2;
    const feelsLikeF = 26;
    const weatherText = "Cloudy";

    // State to track current time
    const [time, setTime] = useState('');

    useEffect(() => {
        // Set the time dynamically after hydration
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        setTime(`${hours}:${minutes}`);
    }, []);

    return (
        <section suppressHydrationWarning 
            className="grid h-screen w-screen place-items-center bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.0)), url(${imageUrl})`,
            }}
        >
            <div className="relative flex h-full w-full max-w-md flex-col justify-between p-4 text-white">
                {/* Top Section: Search, Date, and Time */}
                <div>
                    {/* Search box */}
                    <div className="relative flex items-center gap-x-2 mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-search absolute left-4 h-5 w-5 text-gray-800"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                            className="w-full rounded-full bg-gray-300 placeholder:text-gray-400 py-3 pl-11 pr-4 text-gray-800 outline-none focus:ring-0"
                            placeholder="Search"
                        />
                        <button className="grid aspect-square h-12 w-12 place-items-center rounded-full outline-none transition-colors duration-200 ease-in-out hover:bg-gray-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-chevron-right h-5 w-5"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    </div>

                    {/* Date and Time */}
                    <header className="font-medium tracking-tighter">
                        <h1 className="text-xl">Tue, 19 Dec</h1>
                        <Suspense key={hydrated ? 'local' : 'utc'}>
                            <time className="text-base" dateTime={new Date().toISOString()} suppressHydrationWarning >
                                {time}
                            </time>
                        </Suspense>
                    </header>
                </div>

                {/* Middle Section: City and Temperature */}
                <div className="flex flex-col items-center text-center mt-auto mb-auto"
                    style={{ marginTop: '45px' }}
                >
                    <h2 className="font-bold text-3xl">{city}</h2>
                    <h3 className="font-extrabold text-5xl">{currentTempC}°C</h3>
                    <h4 className="font-bold text-3xl">{currentTempF}F</h4>
                    <p className="text-lg">
                        Feels like {feelsLikeC}°C / {feelsLikeF}F
                    </p>
                    <p className='text-sm'>{weatherText}</p>
                </div>

                {/* Bottom Section: Weather Description */}
                <div className="text-center pt-3 border-t flex justify-between px-4">
                    <p className="text-lg font-bold">{weatherText}</p>
                    <p className="text-lg font-bold">{weatherText}</p>
                </div>
            </div>
        </section>
    );
};

export default Page;
