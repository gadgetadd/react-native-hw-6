import Home from "../screens/Main/Home";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "../screens/Auth/RegistrationScreen";
import LoginScreen from '../screens/Auth/LoginScreen';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshUser } from "../redux/authOperations";



export default function MainRouter() {
    const Stack = createStackNavigator();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    console.log('isLoggedIn', isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('refresh');
        dispatch(refreshUser())
    }, []);



    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
                <>
                    <Stack.Screen name="Home" component={Home} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Register" component={RegistrationScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                </>
            )}
        </Stack.Navigator>
    )

}


