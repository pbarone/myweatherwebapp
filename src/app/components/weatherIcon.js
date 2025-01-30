import { weatherIconMapping } from '../utils/weatherIconMapping';
import Image from 'next/image'

const WeatherIcon = ({ weatherData }) => {
    const getWeatherIcon = (code) => {
        const mapping = weatherIconMapping.find(entry => entry.accuweatherCodes.includes(code));
        return mapping ? mapping.localIcon : '100-sun-white.png'; 
    };

    const localIconFilename = getWeatherIcon(
        weatherData.WeatherIcon
    );

    console.log(weatherData.weatherIcon)

    const weatherText = weatherData.WeatherText;

    return (
        <div className="flex items-center space-x-5"> {/* Ensures 20px gap */}
            <Image
                src={`/weather-icons/${localIconFilename}`}
                width={30}
                height={30}
                alt="Weather icon"
                className="object-contain" // Removed w-full and h-full
            />
            <span className="text-sm">{weatherText}</span>
        </div>


    );
};

export default WeatherIcon;