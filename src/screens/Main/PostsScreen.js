import { createStackNavigator } from "@react-navigation/stack";

import LogOutBtn from "../../components/LogOutBtn";
import DefaultScreen from "../Nested/DefaultScreen";
import MapScreen from "../Nested/MapScreen";
import CommentsScreen from "../Nested/CommentsScreen";

export default function PostsScreen({ }) {

    const { Navigator, Screen } = createStackNavigator();

    return (
        <Navigator initialRouteName={"Default"}>
            <Screen
                title='Publications'
                name="DefaultScreen"
                component={DefaultScreen}
                options={{
                    headerRight: LogOutBtn,
                    headerLeft: null,
                    title: 'Publications',
                    headerTitleAlign: 'center'
                }}
            />
            <Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                    title: 'Location',
                    headerTitleAlign: 'center'
                }}
            />
            <Screen
                name="CommentsScreen"
                component={CommentsScreen}
                options={{
                    title: 'Comments',
                    headerTitleAlign: 'center'
                }}
            />
        </Navigator>
    )
}

