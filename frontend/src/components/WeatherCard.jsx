import './WeatherCard.css'
import cloudImage from "../assets/images/Cloudy.svg";
import { useCurrentTemperatureUnit } from '../Contexts/CurrentTemperaturUnitContext';
import { convertFahrenheitToCelsius } from '../utils/weatherApi';

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useCurrentTemperatureUnit();
  
  const displayTemp = weatherData ? (
    currentTemperatureUnit === 'C' 
      ? convertFahrenheitToCelsius(weatherData.temp)
      : weatherData.temp
  ) : null;
  
  const unitSymbol = currentTemperatureUnit === 'C' ? '°C' : '°F';

  return (
    <section className="weather-card">
      <span className='weather-card__temp'>{displayTemp}{unitSymbol}</span>
      <img src={cloudImage} alt="Cloudy Weather" className="weather-card__image"/>
    </section>
  )
}

export default WeatherCard























