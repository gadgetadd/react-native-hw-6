import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db } from "../../firebase/config";
import { collection, onSnapshot, doc, addDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';

export default function CommentsScreen({ route }) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const fetchComments = async () => {
        const ref = collection(doc(db, "posts", id), "comments");
        const unsubscribe = onSnapshot(ref, (snapshot) => {
            const comments = [];
            snapshot.forEach((doc) => {
                comments.push({ ...doc.data(), id: doc.id });
            });
            comments.sort((a, b) => b.createdAt - a.createdAt)
            setComments(comments);
        });

    }

    const addComment = async () => {
        const ref = collection(doc(db, "posts", id), "comments");
        const newComment = {
            comment,
            createdAt: Date.now()
        }
        await addDoc(ref, newComment)


    }




    useEffect(() => {
        fetchComments()
    }, []);



    const { photo, id } = route.params
    console.log(comments);
    return (
        <View style={styles.container}>
            <View style={styles.imageWrap}>
                <Image
                    style={styles.image}
                    source={{ uri: photo }}
                />
            </View>
            <Text style={styles.text}>No Comments Yet</Text>
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
                    <FontAwesome name={'arrow-up'} size={25} color={'black'} />
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
    },
    icon: {
        position: 'absolute',
        right: 5,
        top: 5,
        height: 30,
        width: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF6C00',
    }
});