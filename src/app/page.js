"use client";

import { use, useEffect, useState } from "react";

export default function Page({ params }) {
    // fallback image if unsplash API limits are hit
    const imageUrl = "https://img.freepik.com/free-vector/modern-city-quay-night-landscape-cartoon-vector_1441-2954.jpg";

    const [postId, setPostId] = useState(null);

    const [location, setLocation] = useState(null);
    const [cityData, setCityData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);

    // State to track current time
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        // Set the time dynamically after hydration
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');

        const dayName = days[now.getDay()];
        const day = now.getDate();
        const monthName = months[now.getMonth()];

        setDate(`${dayName}, ${day} ${monthName}`);

        setTime(`${hours}:${minutes}`);
    }, []);

    useEffect(() => {
        async function unwrapParams() {
            const resolvedParams = await params;
            setPostId(resolvedParams?.postId);
        }
        unwrapParams();
    }, [params]);


    const fetchCityData = async (latitude, longitude) => {
        try {
            const cityURL = `/api/city?latitude=${latitude}&longitude=${longitude}`;

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


    const fetchBackgroundImage = async (cityData) => {
        const cityName = cityData?.ParentCity?.LocalizedName || cityData?.LocalizedName + " " + cityData?.Country?.LocalizedName;
        const apiUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(cityName)}&orientation=portrait`;
        
        const authorizationToken = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY;
        if (!cityName) return;
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`, // Provide your Unsplash access key
                },
            });
            
            if (!response.ok) {
                setBackgroundImage(null)
                return;
            }

            const data = await response.json();
            setBackgroundImage(data);

        } catch (error) {
            setError("Failed to fetch the background image");
        }
    }

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
        fetchBackgroundImage(cityData)
    }, [cityData]);


    useEffect(() => {
        if (cityData?.Key) {
            fetchWeatherData(cityData.Key);

        }
    }, [cityData]);



    if (weatherData) {

        const city = cityData?.LocalizedName;
        const parentCity = cityData?.ParentCity?.LocalizedName || city;
        const currentTempC = weatherData[0]?.Temperature?.Metric?.Value;
        const currentTempF = weatherData[0]?.Temperature?.Imperial?.Value;
        const feelsLikeC = weatherData[0]?.RealFeelTemperature?.Metric?.Value;
        const feelsLikeF = weatherData[0]?.RealFeelTemperature?.Imperial?.Value;
        const weatehrText = weatherData[0]?.WeatherText
        const sunrise = "07:20";
        const sunset = "16:40";


        let backgroundImageURL = imageUrl;
        let author = "Paolo Barone";
        let authorLink = "https://unsplash.com/@pbarone";
        let imagePageLink = imageUrl

        if (backgroundImage != null) {

            backgroundImageURL = backgroundImage.urls.full;
            author = backgroundImage.user.name;
            authorLink = backgroundImage.user.links.html;
            imagePageLink = backgroundImage.links.html

        } 

        return (
            <section
                className="bordergrid h-screen w-screen place-items-center bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.0)), url(${backgroundImageURL})`,
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
                            <h1 className="text-l font-extrabold">{date}</h1>
                            <p className="text-l from-neutral-100">
                                {time}
                            </p>
                        </header>
                    </div>

                    {/* Middle Section: City and Temperature */}
                    <div className="flex flex-col items-center text-center mt-auto mb-auto"
                        style={{ marginTop: '45px' }}
                    >
                        <h2 className="font-bold text-3xl">{parentCity}</h2>
                        <h4 className="font-normal text-l">{city}</h4>
                        <br />
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

                {/* Photo credit */}
                
                <div
                    className="absolute right-0 top-1/2 transform translate-x-16  -translate-y-1/2 text-xs text-white -rotate-90"
                >
                    <a href={imagePageLink} target="_blank" rel="noopener noreferrer"  className="text-white underline">Photo</a> by <a target="_blank" rel="noopener noreferrer"  className="text-white underline" href={authorLink}>{author}</a> on <a className="text-white underline" target="_blank" rel="noopener noreferrer" href="https://unsplash.com/?utm_source=my_weather_app&utm_medium=referral">Unsplash</a>
                </div>
            </section>
        );
    } else {
        return null;
    }


}
