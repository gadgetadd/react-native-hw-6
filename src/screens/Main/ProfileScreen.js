
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { selectUserId, selectUserMail, selectUserName } from "../../redux/selectors"
import PostItem from "../../components/PostItem";
import LogOutBtn from "../../components/LogOutBtn";
import { useToast } from "react-native-fast-toast";

export default function ProfileScreen() {

    const [posts, setPosts] = useState([]);
    const userId = useSelector(selectUserId);
    const userName = useSelector(selectUserName);
    const userMail = useSelector(selectUserMail);
    const toast = useToast();

    const fetchPosts = async () => {
        try {
            const ref = collection(db, "posts");
            const filter = query(ref, where('author.id', '==', userId))
            onSnapshot(filter, (snapshot) => {
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
                ListHeaderComponent={<View style={styles.profile}>
                    <View>
                        <Text style={styles.name}>{userName}</Text>
                        <Text style={styles.mail}>{userMail}</Text>
                    </View>
                    <LogOutBtn />
                </View>}
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
    profile: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    name: {
        fontSize: 24,
    },
    mail: {
        color: 'gray'
    }
});

