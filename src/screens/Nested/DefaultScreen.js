import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from 'react-native';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import PostItem from "../../components/PostItem";
import { useToast } from "react-native-fast-toast";

export default function DefaultScreen() {

    const [posts, setPosts] = useState([]);
    const toast = useToast();

    const fetchPosts = () => {
        try {
            const ref = collection(db, "posts");
            onSnapshot(ref, (snapshot) => {
                const posts = [];
                snapshot.forEach((doc) => {
                    posts.push({ ...doc.data(), id: doc.id });
                });
                posts.sort((a, b) => b.createdAt - a.createdAt)
                setPosts(posts);
            });
        } catch (error) {
            toast.show(error, { type: "warning" });
        }
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

