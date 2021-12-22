import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './src/navigator/Navigator';
import {GradientProvider} from './src/context/GradientContext';

export const App = () => {
  return (
    <NavigationContainer>
      <GradientProvider>
        <Navigator />
      </GradientProvider>
    </NavigationContainer>
  );
};
