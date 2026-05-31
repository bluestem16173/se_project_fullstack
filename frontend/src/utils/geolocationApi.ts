import { fallbackCoordinates } from './constants';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export const getUserCoordinates = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    // Check if geolocation is available
    if (!('geolocation' in navigator)) {
      console.warn('Geolocation is not available. Using fallback coordinates.');
      resolve(fallbackCoordinates);
      return;
    }

    // Get user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('User location obtained:', { latitude, longitude });
        resolve({ latitude, longitude });
      },
      (error) => {
        console.warn('Geolocation error:', error.message);
        console.warn('Using fallback coordinates.');
        // Return fallback coordinates on error
        resolve(fallbackCoordinates);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
};