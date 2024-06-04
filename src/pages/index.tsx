import React, { useState, useEffect } from 'react';
import "../app/globals.css";
import Header from '../components/header';
import CurrentWeather from '../components/currentweather';
import SunriseSunsetCard from '../components/sunrisesunsetcard';
import WeeklyForecastRow from '../components/weeklyforecast';

const Home: React.FC = () => {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=Dubai&aqi=no`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                setError((error as Error).message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className="header bg-blue-80">
                <Header />
                <div className="flex flex-col gap-4 p-5 m-10">
                    <CurrentWeather />
                    <SunriseSunsetCard location="Dubai" date={''} />
                    <div className="flex justify-center">
                        <div className="max-w-screen-lg">
                            <WeeklyForecastRow location="Dubai" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
