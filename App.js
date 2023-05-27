import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from './src/screens/Auth/RegistrationScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import Home from './src/screens/Main/Home';

export default function App() {

  const { Navigator, Screen } = createStackNavigator();

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
    <NavigationContainer>
      <Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Screen name="Register" component={RegistrationScreen} />
        <Screen name="Login" component={LoginScreen} />
        <Screen name="Home" component={Home} />
      </Navigator>
    </NavigationContainer>
  );
}


