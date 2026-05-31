import { fetchweatherdata_api_key } from './constants';
 
export async function fetchweatherdata(coords: { latitude: number; longitude: number }) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=imperial&appid=${fetchweatherdata_api_key}`;

  
    const res = await fetch(url);
  
    // If the server says "not OK", we throw an error
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return parseweatherdata(data);
}

function parseweatherdata(data: any) {
    // Replace "Olga" with "Ft. Myers" since coordinates are in Ft. Myers area
    const cityName = data.name === 'Lochmoor Waterway Estates' ? 'Ft. Myers' : data.name;
    const parsedData = {
        city: cityName,
        temp: Math.round(data.main.temp)
    };
    return parsedData;
}


export function getWeatherCondition(weathertemp: number): 'hot' | 'warm' | 'cold' {
    if (weathertemp >= 86) {
        return 'hot';
    } else if (weathertemp >= 66 && weathertemp < 86) {
        return 'warm';
    } else {
        return 'cold';
    }
}

export function convertFahrenheitToCelsius(fahrenheit: number): number {
    return Math.round(((fahrenheit - 32) * 5) / 9);
}

export function convertCelsiusToFahrenheit(celsius: number): number {
    return Math.round((celsius * 9) / 5 + 32);
}