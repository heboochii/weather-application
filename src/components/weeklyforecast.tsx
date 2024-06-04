import React, { useState, useEffect } from 'react';

interface WeeklyForecastRowProps {
  location: string;
}

const WeeklyForecastRow: React.FC<WeeklyForecastRowProps> = ({ location }) => {
  const [forecastData, setForecastData] = useState<any[]>([]);

  useEffect(() => {
    const fetchWeeklyForecast = async () => {
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location}&days=7&aqi=no&alerts=no`);
        if (!response.ok) {
          throw new Error('Failed to fetch weekly forecast data');
        }
        const data = await response.json();
        setForecastData(data?.forecast?.forecastday || []);
      } catch (error) {
        console.error('Error fetching weekly forecast data:', error);
      }
    };

    fetchWeeklyForecast();
  }, [location]);

  // Function to get the day of the week from a date string
  const getDayOfWeek = (dateString: string) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  return (
    <div className="flex flex-wrap justify-center mt-8">
      {forecastData.map((day: any, index: number) => (
        <div key={index} className="bg-blue-200 p-4 rounded-lg shadow-md text-white mr-4 mb-4">
          <h2 className="text-lg font-semibold">{getDayOfWeek(day.date)}</h2>
          <p className="text-lg">{day.date}</p>
          <p className="text-2xl">{day.day.avgtemp_c}°C</p>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecastRow;
