import { useState, useEffect } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ItemModal from './ItemModal'
import './App.css'
import { fetchweatherdata, getWeatherCondition } from '../utils/weatherApi'
import { getUserCoordinates } from '../utils/geolocationApi'
import { defaultClothingItems } from '../utils/defaultclothing'
import { CurrentTemperatureUnitProvider, useCurrentTemperatureUnit } from '../Contexts/CurrentTemperaturUnitContext'
import {Routes, Route} from 'react-router-dom';
import Profile from './profile/Profile';
import AddItemModal from './AddItemModal'

function AppContent() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useCurrentTemperatureUnit();
  const [activeModal, setActiveModal] = useState('');
  const [clothingItems, setClothingItems] = useState([]);
  const [allClothingItems, setAllClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const isToggleSwitchOn = currentTemperatureUnit === 'C';
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  function handleOpenAddGarmentModal() {
    setActiveModal('add-garment-modal');
  }
  
  async function handleAddItemSubmit(values) {
    console.log('handleAddItemSubmit called with values:', values);
    const newGarment = {
      name: values.name.trim(),
      weather: values.weather.toLowerCase(),
      imageUrl: values.link.trim(), // Mapped 'link' from form to 'imageUrl' for database
    };
    console.log('Prepared garment object:', newGarment);
    
    // Check if we're in production (GitHub Pages)
    const isProduction = import.meta.env.PROD || window.location.hostname !== 'localhost';
    
    if (isProduction) {
      // In production, just add to local state (no backend)
      const createdItem = {
        ...newGarment,
        _id: Date.now(), // Generate a temporary ID
      };
      console.log('Adding item to local state (production mode):', createdItem);
      
      setAllClothingItems((prev) => {
        const updated = [...prev, createdItem];
        console.log('Updated allClothingItems, new count:', updated.length);
        return updated;
      });
      
      // Update filtered items if weather matches
      if (weatherData && weatherData.temp !== undefined) {
        const weatherCondition = getWeatherCondition(weatherData.temp);
        console.log('Weather condition:', weatherCondition, 'Item weather:', createdItem.weather);
        if (createdItem.weather?.toLowerCase() === weatherCondition.toLowerCase()) {
          setClothingItems((prev) => {
            const updated = [...prev, createdItem];
            console.log('Updated clothingItems, new count:', updated.length);
            return updated;
          });
        }
      } else {
        setClothingItems((prev) => {
          const updated = [...prev, createdItem];
          console.log('No weather data, updated clothingItems, new count:', updated.length);
          return updated;
        });
      }
    } else {
      // In development, use json-server
      try {
        console.log('Sending POST request to http://localhost:3001/items');
        const response = await fetch('http://localhost:3001/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newGarment),
        });
        
        console.log('Response status:', response.status, response.statusText);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Response error text:', errorText);
          throw new Error(`Failed to add item: ${response.status} ${response.statusText}`);
        }
        
        const createdItem = await response.json();
        console.log('Item created successfully:', createdItem);
        
        setAllClothingItems((prev) => {
          const updated = [...prev, createdItem];
          console.log('Updated allClothingItems, new count:', updated.length);
          return updated;
        });
        
        // Update filtered items if weather matches
        if (weatherData && weatherData.temp !== undefined) {
          const weatherCondition = getWeatherCondition(weatherData.temp);
          console.log('Weather condition:', weatherCondition, 'Item weather:', createdItem.weather);
          if (createdItem.weather?.toLowerCase() === weatherCondition.toLowerCase()) {
            setClothingItems((prev) => {
              const updated = [...prev, createdItem];
              console.log('Updated clothingItems, new count:', updated.length);
              return updated;
            });
          }
        } else {
          setClothingItems((prev) => {
            const updated = [...prev, createdItem];
            console.log('No weather data, updated clothingItems, new count:', updated.length);
            return updated;
          });
        }
      } catch (error) {
        console.error('Error adding item:', error);
        alert(`Failed to add item: ${error.message}`);
      }
    }
  }

  async function handleDeleteItem(id) {
    // Check if we're in production (GitHub Pages)
    const isProduction = import.meta.env.PROD || window.location.hostname !== 'localhost';
    
    if (isProduction) {
      // In production, just remove from local state
      setAllClothingItems((prev) => prev.filter((item) => item._id !== id));
      setClothingItems((prev) => prev.filter((item) => item._id !== id));
      if (selectedCard?._id === id) {
        handleCloseModal();
      }
    } else {
      // In development, use json-server
      try {
        const response = await fetch(`http://localhost:3001/items/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`Failed to delete item: ${response.statusText}`);
        }
        setAllClothingItems((prev) => prev.filter((item) => item._id !== id));
        setClothingItems((prev) => prev.filter((item) => item._id !== id));
        if (selectedCard?._id === id) {
          handleCloseModal();
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  }
  
  function handleCloseModal() {
    setActiveModal('');
    setSelectedCard(null);
  }

  function handleOpenItemModal(card) {
    setSelectedCard(card);
    setActiveModal('item-modal');
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("Starting data load...");
      
        
         // Get user coordinates using Geolocation API
        setIsLoadingLocation(true);
        const coordinates = await getUserCoordinates();
        setIsLoadingLocation(false);
        console.log("Coordinates obtained:", coordinates);
        

        let weatherData = null;
        let items = [];
        
        try {
          console.log("Fetching weather data...");
          weatherData = await fetchweatherdata(coordinates);
          console.log("Weather data received:", weatherData);
          setWeatherData(weatherData);
        } catch (weatherErr) {
          console.error("Weather API error:", weatherErr);
          console.error("Weather error message:", weatherErr.message);
        }
        
        // Check if we're in production (GitHub Pages) - use mock data
        // In development, use json-server
        const isProduction = import.meta.env.PROD || window.location.hostname !== 'localhost';
        
        if (isProduction) {
          // Use default clothing items for GitHub Pages
          console.log("Using default clothing items for production");
          items = defaultClothingItems.map(item => ({
            ...item,
            imageUrl: item.link || item.imageUrl, // Normalize field name
            _id: item._id
          }));
          console.log("Items loaded from default data:", items.length);
        } else {
          // Use json-server in development
          try {
            console.log("Fetching items from http://localhost:3001/items...");
            const itemsRes = await fetch("http://localhost:3001/items", {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            console.log("Items response status:", itemsRes.status, itemsRes.statusText);
            
            if (!itemsRes.ok) {
              const errorText = await itemsRes.text();
              console.error("Response error text:", errorText);
              throw new Error(`Items fetch failed: ${itemsRes.status} ${itemsRes.statusText}`);
            }
    
            const responseText = await itemsRes.text();
            console.log("Response text preview:", responseText.substring(0, 200));
            items = JSON.parse(responseText);
            console.log("Items parsed:", items);
            console.log("Number of items:", items.length);
            
            if (!Array.isArray(items)) {
              console.error("Items is not an array:", items);
              items = [];
            }
          } catch (fetchError) {
            console.warn("Failed to fetch from json-server, using default items:", fetchError);
            // Fallback to default items if json-server is not available
            items = defaultClothingItems.map(item => ({
              ...item,
              imageUrl: item.link || item.imageUrl,
              _id: item._id
            }));
          }
        }
        
        setAllClothingItems(items);
        
        if (weatherData && weatherData.temp !== undefined) {
          const weatherCondition = getWeatherCondition(weatherData.temp);
          console.log("Weather condition:", weatherCondition, "from temp:", weatherData.temp);
          const filtered = items.filter(
            (item) => item.weather?.toLowerCase() === weatherCondition.toLowerCase()
          );
          console.log("Filtered items:", filtered);
          setClothingItems(filtered);
        } else {
          console.log("No weather data, showing all items");
          setClothingItems(items);
        }
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };
    loadData();
  }, []);
  return (
    <div className="app">
      <Header
        handleOpenAddGarmentModal={handleOpenAddGarmentModal}
        weatherData={weatherData}
        isToggleSwitchOn={isToggleSwitchOn}
        onToggleSwitchChange={handleToggleSwitchChange}
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <Main 
              clothingItems={clothingItems} 
              handleOpenItemModal={handleOpenItemModal} 
              weatherData={weatherData}
            />
          } 
        />
        <Route 
          path="/profile" 
          element={
            <Profile 
              clothingItems={allClothingItems}
              handleOpenItemModal={handleOpenItemModal}
              handleOpenAddGarmentModal={handleOpenAddGarmentModal}
            />
          }
        />
      </Routes>
      <Footer />
      
      {/* Modals - always rendered, controlled by isOpen prop */}
      <AddItemModal
        isOpen={activeModal === 'add-garment-modal'}
        onClose={handleCloseModal}
        onSubmit={handleAddItemSubmit}
      />
      
      <ItemModal 
        isOpen={activeModal === 'item-modal'}
        card={selectedCard}
        onClose={handleCloseModal}
        onDelete={handleDeleteItem}
      />
    </div>
  )
}

function App() {
  return (
    <CurrentTemperatureUnitProvider>
      <AppContent />
    </CurrentTemperatureUnitProvider>
  );
}

export default App




