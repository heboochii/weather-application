import React, { useEffect, useState } from 'react';

interface SunriseSunsetCardProps {
  location: string;
  date: string; 
}

const SunriseSunsetCard: React.FC<SunriseSunsetCardProps> = ({ location }) => {
  const [sunrise, setSunrise] = useState<string>('');
  const [sunset, setSunset] = useState<string>('');

  useEffect(() => {
    const fetchSunriseSunset = async () => {
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/astronomy.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location}`);
        if (!response.ok) {
          throw new Error('Failed to fetch sunrise and sunset data');
        }
        const data = await response.json();
        setSunrise(data.astronomy.astro.sunrise);
        setSunset(data.astronomy.astro.sunset);
      } catch (error) {
        console.error('Error fetching sunrise and sunset data:', error);
      }
    };

    fetchSunriseSunset();
  }, [location]);

  return (
    <div className="bg-blue-100 rounded-t-lg overflow-hidden">
      <div className="text-blue-950 py-4 text-center">
        <h2 className="text-xl font-bold">Sunrise</h2>
        <p className="text-3xl">{sunrise}</p>
      </div>
      <div className="bg-blue-950 text-blue-50 py-4 text-center">
        <h2 className="text-xl font-bold">Sunset</h2>
        <p className="text-3xl">{sunset}</p>
      </div>
    </div>
  );
};

export default SunriseSunsetCard;
