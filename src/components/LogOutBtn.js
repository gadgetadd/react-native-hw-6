import { SimpleLineIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/authOperations';

export default function LogOutBtn() {
    const dispatch = useDispatch();

    return (
        <TouchableOpacity
            style={{ marginHorizontal: 20 }}
            onPress={() => {
                dispatch(logOut())
            }}>
            <SimpleLineIcons name={'logout'} size={24} color={'black'} />
        </TouchableOpacity>
    )
}
