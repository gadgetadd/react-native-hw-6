import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import { ToastProvider } from 'react-native-fast-toast'
import { store } from './src/redux/store';
import MainRouter from './src/components/MainRouter';

export default function App() {

  const [fontsLoaded] = useFonts({
    'Inter-Medium': require('./src/assets/fonts/Inter-Medium.ttf'),
    'Roboto-Medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ToastProvider textStyle={{ fontSize: 24 }} offset={50}>
        <NavigationContainer>
          <MainRouter />
        </NavigationContainer>
      </ToastProvider>
    </Provider>
  );
}


