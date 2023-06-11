import { ActivityIndicator, View, StyleSheet } from 'react-native';

export const Loader = () => (
    <View style={styles.backdrop}>
        <ActivityIndicator size="large" color={'#FF6C00'} />
    </View>
);

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});