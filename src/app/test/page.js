"use client";

import React, { useState, useEffect } from 'react';

const Page = () => {

    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const getLocation = () => {
            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude });
                        
    
                    },
                    () => setError("Unable to retrieve your location.")
                );
            } else {
                setError("Geolocation is not supported by this browser.");
            }
        };
    
        getLocation();
    }, []);


    return (
        <div>
            <h1 className='text-white'>{location?.latitude} {location?.longitude}</h1>
        </div>
    );
};

export default Page;
