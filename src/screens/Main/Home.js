import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from 'expo-status-bar';
import { Fontisto } from '@expo/vector-icons';

import PostsScreen from './PostsScreen';
import ProfileScreen from './ProfileScreen';
import CreatePostsScreen from './CreatePostsScreen';
import { useSelector } from "react-redux";








export default function Home() {

    const Tab = createBottomTabNavigator();




   



    return (
        <>
            <Tab.Navigator initialRouteName="PostsScreen"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === "ProfileScreen") iconName = "person";
                        else if (route.name === "PostsScreen") iconName = "photograph";
                        else if (route.name === "CreatePostsScreen") iconName = "plus-a";
                        return <Fontisto name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "#e4dfda",
                    tabBarActiveBackgroundColor: "#FF6C00",
                    tabBarShowLabel: false,
                    tabBarItemStyle: {
                        borderRadius: 30,
                        marginVertical: 5,
                        marginHorizontal: 25,
                    },
                    tabBarStyle: { height: 60 },
                })}
            >
                <Tab.Screen
                    name="CreatePostsScreen"
                    component={CreatePostsScreen}
                    options={{
                        title: 'Create a new publication',
                        headerTitleAlign: 'center'
                    }}
                />
                <Tab.Screen
                    name="PostsScreen"
                    component={PostsScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{
                        title: 'My profile',
                        headerTitleAlign: 'center'
                    }}
                />
            </Tab.Navigator>
            <StatusBar style="dark" />
        </>
    )
}

