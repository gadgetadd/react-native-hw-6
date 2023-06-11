import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PostItem({ item }) {

    const navigation = useNavigation();
    const { photo, title, author, location, place, totalComments = null, id } = item;

    return (
        <View style={styles.post}>
            <View style={styles.imageWrap}>
                <Image
                    style={styles.image}
                    source={{ uri: photo }}
                />
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.authorChip}>
                <Ionicons
                    name='person-outline'
                    size={10}
                    color='#fff9'
                />
                <Text style={styles.author}>{author?.name}</Text>
            </View>
            <View style={styles.btnsWrap}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("MapScreen", location)}
                    style={styles.button}
                >
                    <EvilIcons
                        name='location'
                        size={20}
                        color={'black'}
                    />
                    <Text style={{ textDecorationLine: 'underline' }}>{place}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("CommentsScreen",
                        {
                            id,
                            photo,
                            author: author.name
                        }
                    )}
                    style={styles.button}
                >
                    <EvilIcons
                        name={'comment'}
                        size={20}
                        color={'black'}
                    />
                    <Text>{totalComments || ''}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    post: {
        marginBottom: 50,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    authorChip: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#0005',
        paddingHorizontal: 5,
        borderRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    },
    author: {
        fontSize: 13,
        color: '#fff9',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    imageWrap: {
        aspectRatio: 3 / 4,
        width: '100%',
        alignSelf: 'center',
        marginBottom: 10,
    },
    button: {
        flexDirection: 'row'
    },
    btnsWrap: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flexDirection: 'row',
        padding: 10
    },
});