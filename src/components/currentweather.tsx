import React, { useState, useEffect } from 'react';
import HourlyForecastCard from './hourlyforecastcard';
import WeatherDetailsCard from './weatherdetails';

const CurrentWeather = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hourlyData, setHourlyData] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);

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

  const handleCardClick = async () => {
    try {
      const response = await fetch(
        'https://api.weatherapi.com/v1/marine.json?key=4b9f7bf84468464fa5d213444240206&q=Dubai&days=1'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch hourly weather data');
      }
      const data = await response.json();
      const hourlyForecast = data?.forecast?.forecastday[0]?.hour || [];
      setHourlyData(hourlyForecast);
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching hourly weather:', error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div 
        className="bg-blue-200 p-4 rounded-lg shadow-md cursor-pointer"
        onClick={handleCardClick}
        style={{
          backgroundImage: `url(${weatherData?.current?.condition?.icon})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right bottom'
        }}
      >
        <h2 className="text-4xl font-semibold">{weatherData?.current?.temp_c}°C</h2>
        <p className="text-sm mt-2">Feels like: {weatherData?.current?.feelslike_c}°C</p>
      </div>

      <WeatherDetailsCard weatherData={weatherData} />

      {/* Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <HourlyForecastCard hourlyData={hourlyData} onClose={handleClosePopup} />
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
