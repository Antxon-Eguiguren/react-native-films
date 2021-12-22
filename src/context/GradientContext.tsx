import React, {createContext, useState} from 'react';

interface ImageColors {
  primary: string;
  secondary: string;
}

interface GradienContextProps {
  colors: ImageColors;
  prevColors: ImageColors;
  setCurrentColors: (colors: ImageColors) => void;
  setPreviousColors: (colors: ImageColors) => void;
}

export const GradienContext = createContext({} as GradienContextProps);

export const GradientProvider = ({children}: any) => {
  const [colors, setColors] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });

  const [prevColors, setPrevColors] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });

  const setCurrentColors = (col: ImageColors) => {
    setColors(col);
  };

  const setPreviousColors = (col: ImageColors) => {
    setPrevColors(col);
  };

  return (
    <GradienContext.Provider
      value={{colors, prevColors, setCurrentColors, setPreviousColors}}>
      {children}
    </GradienContext.Provider>
  );
};
