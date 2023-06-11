import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import {
    collection,
    onSnapshot,
    doc,
    addDoc,
    updateDoc
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { selectUserId, selectUserName } from "../../redux/selectors";
import CommentItem from '../../components/CommentItem';
import { useToast } from 'react-native-fast-toast';


export default function CommentsScreen({ route }) {

    const { photo, id, author } = route.params
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const userId = useSelector(selectUserId);
    const userName = useSelector(selectUserName);
    const toast = useToast();

    const fetchComments = async () => {
        try {
            const ref = collection(doc(db, "posts", id), "comments");
            onSnapshot(ref, (snapshot) => {
                const comments = [];
                snapshot.forEach((doc) => {
                    comments.push({ ...doc.data(), id: doc.id });
                });
                comments.sort((a, b) => b.createdAt - a.createdAt)
                setComments(comments);
            });
        } catch (error) {
            toast.show(error, { type: "warning" });
        }
    }

    const addComment = async () => {
        try {
            const postRef = doc(db, "posts", id);
            const commentsRef = collection(postRef, "comments");
            const newComment = {
                comment,
                createdAt: Date.now(),
                author: { id: userId, name: userName }
            }
            await addDoc(commentsRef, newComment);
            await updateDoc(postRef, { totalComments: comments.length + 1 })
        } catch (error) {
            toast.show(error, { type: "warning" });
        }
    }

    useEffect(() => {
        fetchComments()
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={<View style={styles.imageWrap}>
                    <Image
                        style={styles.image}
                        source={{ uri: photo }}
                    />
                    <View style={styles.authorChip}>
                        <Ionicons
                            name='person-outline'
                            size={10}
                            color='#fff9'
                        />
                        <Text style={styles.author}>{author}</Text>
                    </View>
                </View>}
                ListEmptyComponent={<Text style={styles.text}>No Comments Yet</Text>}
                data={comments}
                renderItem={({ item }) => <CommentItem item={item} />}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.inputWrap}>
                <TextInput
                    style={styles.input}
                    value={comment}
                    onChangeText={setComment}
                    placeholder="Write a comment"
                />
                <TouchableOpacity
                    style={styles.icon}
                    onPress={addComment}
                >
                    <Feather name={'arrow-up'} size={25} color={'white'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 36,
        textAlign: 'center',
        marginTop: 20
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageWrap: {
        aspectRatio: 3 / 4,
        width: '100%',
        alignSelf: 'center'
    },
    input: {
        height: 40,
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        marginBottom: 20,
        marginTop: 10
    },
    icon: {
        position: 'absolute',
        right: 5,
        top: 15,
        height: 30,
        width: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF6C00',
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
});