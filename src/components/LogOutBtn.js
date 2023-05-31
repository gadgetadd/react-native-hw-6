import { SimpleLineIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/authOperations';

export default function LogOutBtn() {

    // const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <TouchableOpacity
            style={{ marginHorizontal: 20 }}
            onPress={() => {
                console.log('logout');
                dispatch(logOut())
            }}>
            <SimpleLineIcons name={'logout'} size={24} color={'black'} />
        </TouchableOpacity>
    )
}
