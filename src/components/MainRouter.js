import Home from "../screens/Main/Home";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "../screens/Auth/RegistrationScreen";
import LoginScreen from '../screens/Auth/LoginScreen';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateUser } from '../redux/authSlice'
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth/react-native";

export default function MainRouter() {
    const Stack = createStackNavigator();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    // const user = useSelector(state => state.auth.user);
    // console.log('isLoggedIn', isLoggedIn);
    const dispatch = useDispatch();
    useEffect(() => {


        const unlisten = onAuthStateChanged(auth, (loggedUser) => {
            if (loggedUser) {
                dispatch(updateUser({
                    name: loggedUser.displayName,
                    userId: loggedUser.uid,
                    email: loggedUser.email
                }));
            }
        });
        return () => {
            unlisten();
        }
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


