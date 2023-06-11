import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { useToast } from 'react-native-fast-toast'
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth/react-native";
import { selectIsLoggedIn, selectIsLoading, selectError } from "../redux/selectors";
import { updateUser, loadUser, stopLoading, resetError } from '../redux/authSlice'
import Home from "../screens/Main/Home";
import RegistrationScreen from "../screens/Auth/RegistrationScreen";
import LoginScreen from '../screens/Auth/LoginScreen';
import { Loader } from "./Loader";

export default function MainRouter() {
    const toast = useToast()
    const Stack = createStackNavigator();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
        const unlisten = onAuthStateChanged(auth, (loggedUser) => {
            if (loggedUser) {
                dispatch(updateUser({
                    name: loggedUser.displayName,
                    userId: loggedUser.uid,
                    email: loggedUser.email
                }));
            }
            dispatch(stopLoading());
        });
        return () => {
            unlisten();
        }
    }, []);

    if (error) {
        toast.show(error, { type: "warning" });
        dispatch(resetError())
    }

    if (isLoading) {
        return (<Loader />)
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
                <Stack.Screen name="Home" component={Home} />
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegistrationScreen} />
                </>
            )}
        </Stack.Navigator>
    )
}


