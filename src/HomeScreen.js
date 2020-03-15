import React from 'react';
import {
    SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, View, Text, StatusBar, Button,
} from 'react-native';
import { firebaseAuth } from './config';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            isReady: false,
        }
    }

    componentDidMount() {
        const userInfo = this.props.navigation.getParam('params', 'No Info')
        const loginMethod = this.props.navigation.getParam('loginMethod', 'No Info')
        this.setState({
            userInfo: userInfo,
            isReady: true,
            loginMethod: loginMethod,
        })
    }

    onPressGoToLogin = () => {
        this.props.navigation.navigate('LoginRoute')
    }

    emailSignOut = async () => {
        firebaseAuth.signOut()
            .then(() => this.props.navigation.navigate('LoginRoute'))
            .catch(error => this.setState({ errorMessage: error.message }));

    }
    googleSignOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.props.navigation.navigate('LoginRoute')
            // this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    }

    onPressSignOut = async () => {
        if (this.state.isReady && this.state.loginMethod === 'google') {
            this.googleSignOut()
        }
        else
            this.emailSignOut()
    }



    render() {
        return (

                <View style={styles.container}>

                    {
                        this.state.isReady && this.state.loginMethod === 'google' ?
                            <Text style={styles.userText}>
                                Hello {JSON.stringify(this.state.userInfo.user.email).replace(/['"]+/g, '')}!
                    </Text>
                            : <View />
                    }
                    {/* {
                        this.state.isReady && this.state.loginMethod === 'google' ?
                            <Text style={styles.userText}>
                                Hi new {JSON.stringify(this.state.userInfo.user.name)}!
                    </Text>
                            : <View />
                    } */}

                    {
                        this.state.isReady && this.state.loginMethod === 'email' ?
                            <Text style={styles.userText}>
                                Hello {JSON.stringify(this.state.userInfo.email).replace(/['"]+/g, '')}!
                    </Text>
                            : <View />
                    }

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPressSignOut} >
                        <Text style={styles.buttonText}>Sign Out</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPressGoToLogin} >
                        <Text style={styles.buttonText}>Go to login</Text>
                    </TouchableOpacity> */}
                </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        // alignItems:'center'
    },
    userText: {
        padding: 20,
        fontSize: 20,
        color: 'black',
    },
    buttonText:
    {
        fontSize: 18,
        alignContent: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        textAlign: 'center'
    },
    button:
    {
        paddingVertical: 15,
        paddingHorizontal: 15,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        width: 140,
        backgroundColor: '#3598dc',
    },
})