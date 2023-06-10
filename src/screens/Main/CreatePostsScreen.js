import React, { useState, useEffect } from "react";
import { TextInput, Button, View, StyleSheet } from "react-native";
import uuid from 'react-native-uuid';
import * as Location from "expo-location";

import CameraPreview from "../../components/CameraPreview";
import PhotoPreview from "../../components/PhotoPreview";

import { storage, db } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";

export default function CreatePostsScreen({ navigation }) {

    const [photo, setPhoto] = useState(null);
    const [title, setTitle] = useState('');
    const [place, setPlace] = useState('');

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
            }
        })();
    }, []);

    const formReset = () => {
        setPhoto(null);
        setTitle('');
        setPlace('');
    }

    const uploadPhotoToCloud = async (uri) => {
        const response = await fetch(uri);
        const file = await response.blob();
        const id = uuid.v1()
        const photoRef = ref(storage, `photo/${id}`);
        await uploadBytes(photoRef, file)
        const cloudPhoto = await getDownloadURL(photoRef);
        return cloudPhoto;
    }

    const handleAddNewPost = async () => {
        if (!photo) { return console.log('no photo'); }
        try {
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
                maximumAge: 10000
            });
            console.log('location ok');
            const cloudPhoto = await uploadPhotoToCloud(photo)
            console.log('photo uploaded');

            // const id = uuid.v1()
            const newPost = {
                // id: ,
                photo: cloudPhoto,
                title,
                place,
                location: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                },
                createdAt: Date.now()
                // comments: []
            }

            const postsRef = collection(db, 'posts')
            console.log('postRef', postsRef);
            await addDoc(postsRef, newPost)
            console.log('newPost', newPost);
            navigation.navigate("DefaultScreen");
            formReset();

        } catch (error) {
            console.log(error);
        }



    }

    return (
        <View style={styles.container}>
            <View style={styles.photoContainer}>
                {photo
                    ? <PhotoPreview photo={photo} onCancel={() => setPhoto(null)} />
                    : <CameraPreview onCapture={setPhoto} />
                }
            </View>
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                placeholder="Name"
            /><TextInput
                value={place}
                onChangeText={setPlace}
                style={styles.input}
                placeholder="Location"
            /><Button
                title='Post'
                onPress={handleAddNewPost}
                color="#FF6C00"
            />
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