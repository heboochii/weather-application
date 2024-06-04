import React from 'react';

interface WeatherDetailsCardProps {
  weatherData: any;
}


const WeatherDetailsCard: React.FC<WeatherDetailsCardProps> = ({ weatherData }) => {
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Weather Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <p className="text-gray-600 font-semibold mb-2 border-b pb-2">Humidity</p>
          <p>{weatherData?.current?.humidity}%</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 font-semibold mb-2 border-b pb-2">Visibility</p>
          <p>{weatherData?.current?.vis_km} km</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 font-semibold mb-2 border-b pb-2">Cloudiness</p>
          <p>{weatherData?.current?.cloud}%</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 font-semibold mb-2 border-b pb-2">Precipitation</p>
          <p>{weatherData?.current?.precip_mm} mm</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 font-semibold mb-2 border-b pb-2">Wind</p>
          <p>{weatherData?.current?.wind_kph} km/h</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 font-semibold mb-2 border-b pb-2">Wind Direction</p>
          <p>{weatherData?.current?.wind_dir}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetailsCard;
