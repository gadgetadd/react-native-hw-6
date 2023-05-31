import { useState } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    ImageBackground
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Fontisto } from '@expo/vector-icons';
import background from '../../assets/images/background.jpg'
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/authOperations';



export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = () => {
        const formData = { email, password }
        dispatch(logIn(formData))


    };

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ImageBackground
                    source={background}
                    style={styles.container}
                    resizeMode="cover">
                    <View style={styles.form}>
                        <View style={styles.icon}>
                            <Fontisto
                                name="person"
                                size={80}
                                color="#767b91"
                            />
                        </View>
                        <Text style={styles.title}>Login</Text>
                        <KeyboardAvoidingView enabled behavior={Platform.OS == "ios" ? "padding" : "height"}>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                style={styles.input}
                                placeholder="Email"
                            />
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                style={styles.input}
                                placeholder="Password"
                                secureTextEntry
                            />
                        </KeyboardAvoidingView>
                        <Button
                            title="Login"
                            color="#FF6C00"
                            onPress={handleLogin}
                        />
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text style={styles.text}>Don't have an account? Register</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground >
            </TouchableWithoutFeedback >
            <StatusBar style="light" />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    icon: {
        position: 'absolute',
        top: -70,
        backgroundColor: '#e1e5ee',
        width: 100,
        height: 100,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 36,
        fontFamily: 'Inter-Medium',
        marginBottom: 20,
        textAlign: 'center'
    },
    text: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        marginTop: 20,
        textAlign: 'center'
    },
    form: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    input: {
        height: 40,
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
});