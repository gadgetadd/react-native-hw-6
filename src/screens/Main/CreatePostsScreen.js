import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    TextInput,
    Button,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import uuid from 'react-native-uuid';
import * as Location from "expo-location";
import { useToast } from "react-native-fast-toast";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { storage, db } from "../../firebase/config";
import { selectUserId, selectUserName } from "../../redux/selectors";
import CameraPreview from "../../components/CameraPreview";
import PhotoPreview from "../../components/PhotoPreview";

export default function CreatePostsScreen({ navigation }) {
    const toast = useToast()
    const [photo, setPhoto] = useState(null);
    const [title, setTitle] = useState('');
    const [place, setPlace] = useState('');
    const [loading, setLoading] = useState(false);
    const isFieldsEmpty = !Boolean(photo && title && place);
    const userId = useSelector(selectUserId);
    const userName = useSelector(selectUserName);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                toast.show("Permission to access location was denied", { type: "warning" });
            }
        })();
    }, []);

    const formReset = () => {
        setPhoto(null);
        setTitle('');
        setPlace('');
    }

    const uploadPhotoToCloud = async (uri) => {
        try {
            const response = await fetch(uri);
            const file = await response.blob();
            const id = uuid.v1()
            const photoRef = ref(storage, `photo/${id}`);
            await uploadBytes(photoRef, file)
            const cloudPhoto = await getDownloadURL(photoRef);
            return cloudPhoto;
        } catch (error) {
            toast.show(error, { type: "warning" });
        }
    }

    const handleAddNewPost = async () => {
        setLoading(true);
        try {
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
                maximumAge: 10000
            });
            const cloudPhoto = await uploadPhotoToCloud(photo);
            const newPost = {
                photo: cloudPhoto,
                title,
                place,
                location: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                },
                createdAt: Date.now(),
                author: { id: userId, name: userName }
            };
            const postsRef = collection(db, 'posts')
            await addDoc(postsRef, newPost)
            navigation.navigate("DefaultScreen");
            formReset();
        } catch (error) {
            toast.show(error, { type: "warning" });
        }
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.photoContainer}>
                {photo
                    ? <PhotoPreview photo={photo} onCancel={() => setPhoto(null)} />
                    : <CameraPreview onCapture={setPhoto} />
                }
            </View>
            <KeyboardAvoidingView enabled behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                    placeholder="Name"
                />
                <TextInput
                    value={place}
                    onChangeText={setPlace}
                    style={styles.input}
                    placeholder="Location"
                />
                <Button
                    disabled={isFieldsEmpty}
                    title={loading ? "Posting..." : 'Post'}
                    onPress={handleAddNewPost}
                    color="#FF6C00"
                />
            </KeyboardAvoidingView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    photoContainer: {
        marginTop: 10,
        marginBottom: 20,
        width: '100%',
        aspectRatio: 3 / 4,
    },
    input: {
        height: 40,
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
});