import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";



import RegistrationScreen from './src/screens/Auth/RegistrationScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
// import Home from './src/screens/Main/Home';
import MainRouter from './src/components/MainRouter';

import { Provider, useSelector } from 'react-redux';

import { store } from './src/redux/store';

export default function App() {



  const [fontsLoaded] = useFonts({
    'Inter-Medium': require('./src/assets/fonts/Inter-Medium.ttf'),
    'Roboto-Medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
    'fontisto': require('./src/assets/fonts/Fontisto.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>

      <NavigationContainer>
        <MainRouter />
      </NavigationContainer>

    </Provider>
  );
}


