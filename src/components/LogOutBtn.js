import { SimpleLineIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LogOutBtn() {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={{ marginHorizontal: 20 }} onPress={() => navigation.navigate("Login")}>
            <SimpleLineIcons name={'logout'} size={24} color={'black'} />
        </TouchableOpacity>
    )
}
