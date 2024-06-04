import "../app/globals.css";
import React, { useState, useEffect } from 'react';
import StickFigureAnimation from '../components/stickfigureanimation';

const HomePage: React.FC = () => {
  const [weatherCondition, setWeatherCondition] = useState<string | undefined>(undefined);

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
        setWeatherCondition(data.current.condition.text.toLowerCase());
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="mt-8">
        {weatherCondition ? (
          <StickFigureAnimation weatherCondition={weatherCondition} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
