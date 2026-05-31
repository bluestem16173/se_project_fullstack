import { createContext, useContext, useState, type ReactNode } from 'react';

interface CurrentTemperatureUnitContextType {
  currentTemperatureUnit: 'F' | 'C';
  handleToggleSwitchChange: () => void;
}

export const CurrentTemperatureUnitContext = createContext<CurrentTemperatureUnitContextType | undefined>(undefined);

interface CurrentTemperatureUnitProviderProps {
  children: ReactNode;
}

export function CurrentTemperatureUnitProvider({ children }: CurrentTemperatureUnitProviderProps) {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState<'F' | 'C'>('F');

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit(prev => prev === 'F' ? 'C' : 'F');
  }

  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
      {children}
    </CurrentTemperatureUnitContext.Provider>
  );
}

export function useCurrentTemperatureUnit() {
  const context = useContext(CurrentTemperatureUnitContext);
  if (context === undefined) {
    throw new Error('useCurrentTemperatureUnit must be used within a CurrentTemperatureUnitProvider');
  }
  return context;
}
