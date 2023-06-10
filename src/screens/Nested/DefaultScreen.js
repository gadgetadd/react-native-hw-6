
import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from 'react-native';
import PostItem from "../../components/PostItem";

import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";



export default function DefaultScreen() {

    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const ref = collection(db, "posts");
        const unsubscribe = onSnapshot(ref, (snapshot) => {
            const posts = [];
            snapshot.forEach((doc) => {
                posts.push({ ...doc.data(), id: doc.id });
            });
            posts.sort((a, b) => b.createdAt - a.createdAt)
            setPosts(posts);
        });
        return unsubscribe;
    }



    useEffect(() => {
        fetchPosts()
    }, []);


    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={({ item }) => <PostItem item={item} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
});

