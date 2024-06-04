// components/Header.tsx

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface WeatherData {
    location: {
        name: string;
        region: string;
        country: string;
        localtime: string;
    };
    current: {
        temp_c: number;
        feelslike_c: number;
        humidity: number;
        cloud: number;
    };
}

const Header: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=Dubai`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <header className="flex justify-between items-center p-4 bg-white">
            <div>
                <h1 className="text-2xl font-bold text-black">Weather Forecast</h1>
                {weatherData && (
                    <h1 className="text-gray-500">
                        {weatherData.location.name}, {weatherData.location.country}
                        <br />
                        {weatherData.location.localtime}
                    </h1>
                )}
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
                <Link href="/AnimationPage">Do I need an umbrella today?</Link>
            </button>
        </header>
    );
};

export default Header;