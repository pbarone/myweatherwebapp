"use client";

import { use, useEffect, useState } from "react";

export default function Page({ params }) {
    const [postId, setPostId] = useState(null);

    const [location, setLocation] = useState(null);
    const [cityData, setCityData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    // State to track current time
    const [time, setTime] = useState('');

    useEffect(() => {
        // Set the time dynamically after hydration
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        setTime(`${hours}:${minutes}`);
    }, []);

    useEffect(() => {
        async function unwrapParams() {
            const resolvedParams = await params;
            setPostId(resolvedParams?.postId);
        }
        unwrapParams();
    }, [params]);

    // Mock data for now
    const imageUrl = "https://images.unsplash.com/photo-1642810533525-f0839298cfad?ixid=M3w2OTI1NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzU4NDM4NjF8&ixlib=rb-4.0.3";

    const fetchCityData = async (latitude, longitude) => {
        try {
            const cityURL = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}&q=${latitude}%2C${longitude}&details=true`;
            const response = await fetch(cityURL);
            const data = await response.json();
            setCityData(data);
        } catch (err) {
            setError("Unable to fetch city data.");
        }
    };


    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    await fetchCityData(latitude, longitude);
                },
                () => setError("Unable to retrieve your location.")
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };
 

    const fetchWeatherData = async (cityKey) => {
        try {
            const weatherURL = `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}&details=true&language=en-us`;
            const response = await fetch(weatherURL);
            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            setError("Unable to fetch weather data.");
        }
    };

    useEffect(() => {
        getLocation();
    }, []);


    useEffect(() => {
        fetchCityData(40.7128, -74.0060);
    }, []);

    console.log(cityData);

    useEffect(() => {
        if (cityData?.Key) {
            fetchWeatherData(cityData.Key);

        }
    }, [cityData]);

    if (weatherData) {
        const city = cityData?.LocalizedName;
        const currentTempC = weatherData[0]?.Temperature?.Metric?.Value;
        const currentTempF = weatherData[0]?.Temperature?.Imperial?.Value;
        const feelsLikeC = weatherData[0]?.RealFeelTemperature?.Metric?.Value;
        const feelsLikeF = weatherData[0]?.RealFeelTemperature?.Imperial?.Value;
        const weatehrText = weatherData[0]?.WeatherText
        const sunrise = "07:20";
        const sunset = "16:40";

        return (
            <section
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
                        <header className="tracking-tighter">
                            <h1 className="text-l font-extrabold">Tue, 19 Dec</h1>
                            <p className="text-l from-neutral-100">
                                {time} am
                            </p>
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
                        <p className='text-sm'>{weatehrText}</p>
                    </div>
    
                    {/* Bottom Section: Weather Description */}
                    <div className="text-center pt-3 border-t flex justify-between px-4">
                        <p className="text-lg font-bold">{weatehrText}</p>
                        <p className="text-lg font-bold">{weatehrText}</p>
                    </div>
                </div>
            </section>
        );
    } else {
        return null;
    }


}
