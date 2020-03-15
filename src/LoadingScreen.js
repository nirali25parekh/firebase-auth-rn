import React from 'react';
import { firebaseAuth } from './config';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
export default class LoadingScreen extends React.Component {

    componentDidMount() {
        firebaseAuth.onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'HomeRoute' : 'RegisterRoute')
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#455a64',
        justifyContent: 'center',
        alignItems: 'center',
    }
})