import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment/moment';
import { selectUserId, selectUserName } from "../redux/selectors"

const windowWidth = Dimensions.get('window').width;

export default function CommentItem({ item }) {
    const userId = useSelector(selectUserId);
    const userName = useSelector(selectUserName);
    const { comment, author, createdAt } = item;

    return (
        <View style={userId === author.id ? styles.myComment : styles.comment}>
            <Text style={styles.title}>{comment}</Text>
            <View style={styles.info}>
                <View style={styles.authorChip}>
                    <Ionicons
                        name='person-outline'
                        size={8}
                        color='#1117'
                    />
                    <Text style={styles.textInfo}>{author?.name}</Text>
                </View>
                <Text style={styles.textInfo}>{moment(createdAt).format('D MMM YYYY, HH:mm')}</Text>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    comment: {
        marginTop: 15,
        alignSelf: 'flex-start',
        backgroundColor: '#f5e7dc',
        padding: 10,
        width: (windowWidth * 0.8),
        borderRadius: 15,
    },
    myComment: {
        marginTop: 20,
        alignSelf: 'flex-end',
        backgroundColor: '#fab07a',
        padding: 10,
        width: (windowWidth * 0.8),
        borderRadius: 15,
    },
    title: {
        fontSize: 14,
        marginBottom: 5,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    authorChip: {
        borderRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    },
    textInfo: {
        fontSize: 11,
        color: '#1117',
    },
});