import React from 'react';

interface HourlyForecastCardProps {
    hourlyData: any[];
    onClose: () => void; 
}

const HourlyForecastCard: React.FC<HourlyForecastCardProps> = ({ hourlyData, onClose }) => {
    // Function to chunk the hourly data into arrays of 6 items
    const chunkArray = (array: any[], size: number) => {
        return array.reduce((chunks, item, index) => {
            if (index % size === 0) {
                chunks.push([item]);
            } else {
                chunks[chunks.length - 1].push(item);
            }
            return chunks;
        }, []);
    };

    // Function to convert 24-hour format to 12-hour format
    const convertTo12HourFormat = (hour: number) => {
        if (hour === 0) return { hour: 12, period: 'AM' };
        if (hour === 12) return { hour: 12, period: 'PM' };
        return hour < 12 ? { hour, period: 'AM' } : { hour: hour - 12, period: 'PM' };
    };

    // Chunk hourly data into arrays of 6 items
    const chunkedHourlyData = chunkArray(hourlyData, 6);

    return (
        <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Hourly Forecast</h2>
            {chunkedHourlyData.map((row: any[], rowIndex: React.Key | null | undefined) => (
                <div key={rowIndex} className="flex flex-wrap gap-4 pb-9">
                    {row.map((hourData: any, index: number) => {
                        const { hour, period } = convertTo12HourFormat(new Date(hourData.time_epoch * 1000).getHours());
                        return (
                            <div key={index} className="bg-blue-200 p-4 rounded-lg">
                                <p className="text-xl font-semibold text-white text-center">{hour}:00 {period}</p>
                                <p className='text-white text-center'>{hourData.temp_c}°C</p>
                            </div>
                        );
                    })}
                </div>
            ))}
            <button onClick={onClose} className="bg-blue-950 text-blue-50 px-4 py-2 rounded-md mt-4">Close</button>
        </div>
    );
};

export default HourlyForecastCard;