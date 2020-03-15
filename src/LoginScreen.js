import React from 'react';
import {
    SafeAreaView, StyleSheet, ScrollView, View, TextInput, TouchableOpacity, Button, Text, Dimensions, StatusBar,
} from 'react-native';
import { firebaseAuth } from './config';
import * as firebase from 'firebase';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';


export default class LoginScreen extends React.Component {
    state = {
        email: '',
        password: '',
        errorMessage: null,
        userInfo: null,
        loggedIn: false,
    }

    handleLogin = () => {
        firebaseAuth
            .signInWithEmailAndPassword(this.state.email, this.state.password)

            .then(this.setState({
                userInfo: {
                    email: this.state.email,
                    password: this.state.password,
                }
            }))
            .then(console.warn(this.state.userInfo))
            .then(() => this.props.navigation.navigate('HomeRoute', { params: this.state.userInfo, loginMethod: 'email' }))
            .catch(error => this.setState({ errorMessage: error.message }));
    }


    googleLogin = async () => {
        try {
            GoogleSignin.configure({
                webClientId: '421375847879-accs26s9racjr3tljdu94re1lvd4voqf.apps.googleusercontent.com',
                offlineAccess: true,
                hostedDomain: '',
                forceConsentPrompt: true,
            });

            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo: userInfo, loggedIn: true });
            console.warn(this.state.userInfo)
            this.props.navigation.navigate('HomeRoute', { params: this.state.userInfo, loginMethod: 'google' })
        } catch (e) {
            console.error(e);
        }
    }

    static navigationOptions = {
        title: 'Log In Page',
        headerStyle: {
            backgroundColor: 'black',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    render() {
        return (
                <View style={styles.container}>
                    <View style={styles.innerContainer}>

                   
                    <StatusBar backgroundColor='#29434e'
                        barStyle='light-content' />
                    <Text style={styles.heading}>Login</Text>

                    {this.state.errorMessage &&
                        <Text style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </Text>
                    }
                    <TextInput
                        style={styles.inputBox}
                        underLineColorAndroid='#000000'
                        placeholderTextColor='rgba(0,0,0,0.4)'
                        placeholder="email-id"
                        keyboardType='email-address'
                        autoCapitalize='none'
                        onChangeText={(text) => this.setState({ email: text })}
                    />

                    <TextInput
                        style={styles.inputBox}
                        underLineColorAndroid='#000000'
                        placeholder="password"
                        placeholderTextColor='rgba(0,0,0,0.4)'
                        secureTextEntry={true}
                        autoCapitalize="none"
                        onChangeText={(text) => this.setState({ password: text })}
                    />

                    <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>



                    <View style={{ flexDirection: "row", margin:10, }}>
                        <View style={styles.horizontalLine} />
                        <Text> OR </Text>
                        <View style={styles.horizontalLine} />
                    </View>

                    <GoogleSigninButton
                        style={{ width: 250, height: 60 , margin:10, }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={this.googleLogin}
                    // disabled={this.state.isSigninInProgress} 
                    />

                    <Text style={styles.lastText}>
                        Don't have an account? {"\t\t"}

                        <Text
                            style={styles.signupText}
                            onPress={() => this.props.navigation.navigate('RegisterRoute')}>
                            Sign Up
                        </Text>
                    </Text>
                    </View>
                </View>
        )
    }
}
const heightConst = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    
    horizontalLine: {
        borderBottomColor: 'black',
        borderColor: 'red',
        height: 0,
        width: 150,
        borderStyle: 'solid',
        margin: 10,
        borderBottomWidth: 1,
    },
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor:'#3598dc',
        justifyContent: 'center',
        // alignSelf:'center',
        // alignItems: 'center',
        // alignContent:'center',
    },
    heading: {
        color: 'black',
        fontSize: 26,
        marginBottom: 10
    },
    inputBox: {
        marginVertical: 14,
        paddingHorizontal: 16,
        width: 300,
        height: 50,
        backgroundColor: '#e2e2e2',
        fontSize: 16,
        // borderRadius: 25,
    },
    innerContainer:{
        padding:10,
        margin:20,
        borderRadius:10,
        backgroundColor:'#fff',
        // alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        // alignSelf:'center',
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
    signupText: {
        fontSize: 16,
        color: '#1133ff',
        textDecorationLine: 'underline',
    },
    lastText: {
        margin: 20,
        fontSize: 16,
    }
})
