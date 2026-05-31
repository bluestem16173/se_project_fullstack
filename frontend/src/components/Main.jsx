import ItemCard from './ItemCard'
import WeatherCard from './WeatherCard'
import './main.css'
import { useCurrentTemperatureUnit } from '../Contexts/CurrentTemperaturUnitContext'
import { convertFahrenheitToCelsius } from '../utils/weatherApi'

function Main({ clothingItems = [], handleOpenItemModal, weatherData }) {
  const { currentTemperatureUnit } = useCurrentTemperatureUnit();
  
  const displayTemp = weatherData ? (
    currentTemperatureUnit === 'C' 
      ? convertFahrenheitToCelsius(weatherData.temp)
      : weatherData.temp
  ) : null;
  
  const unitSymbol = currentTemperatureUnit === 'C' ? '°C' : '°F';

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData}/>
      <p className="main__text">Today is {displayTemp}{unitSymbol}/ You may want to wear:</p>
      <ul className="main__clothing-list">
        {clothingItems && clothingItems.length > 0 ? (
          clothingItems.map((item) => (
            <li key={item._id} className="main__clothing-item">
              <ItemCard 
                name={item.name}
                link={item.imageUrl || item.link}
                onClick={() => handleOpenItemModal(item)} 
              />
            </li>
          ))
        ) : (
          <li>No clothing items available</li>
        )}
      </ul>
    </main>
  )
}

export default Main














