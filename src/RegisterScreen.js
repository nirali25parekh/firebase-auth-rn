import React from 'react';
import {
    SafeAreaView, StyleSheet, ScrollView, View, Text, TouchableOpacity, Button,
    StatusBar, Dimensions, TextInput
} from 'react-native';
import { firebaseAuth } from './config';

export default class RegisterScreen extends React.Component {

    state = {
        name: '',
        email: '',
        password: '',
        errorMessage: null
    }

    handleSignUp = () => {
        firebaseAuth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.name,
                })
            })
            .then(() => this.props.navigation.navigate('HomeRoute'))
            .catch(error => this.setState({ errorMessage: error.message }));
    }

    static navigationOptions = {
        title: 'Sign Up Page',
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

                    <Text style={styles.heading}>Sign Up</Text>

                    {this.state.errorMessage &&
                        <Text style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </Text>}

                    <TextInput
                        style={styles.inputBox}
                        placeholderTextColor='rgba(0,0,0,0.4)'
                        underLineColorAndroid='#000000'
                        placeholder="Name"
                        onChangeText={(text) => this.setState({ name: text })}
                    />
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

                    <View style={{ flexDirection: "row", margin: 10, }}>
                        <View style={styles.horizontalLine} />
                        <Text> OR </Text>
                        <View style={styles.horizontalLine} />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleSignUp} >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <Text style={styles.lastText}>
                        Already have an account? {"\t\t"}

                        <Text
                            style={styles.loginText}
                            onPress={() => this.props.navigation.navigate('LoginRoute')}>
                            Login
                        </Text>


                    </Text>
                    {/* <Button
                        color="transparent"
                        title="Login "
                        onPress={() => this.props.navigation.navigate('LoginRoute')}
                    /> */}
                    </View>
                </View>

           
        )
    }
}
const heightConst = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        justifyContent: 'center',
        // alignItems: 'center',
        // alignContent:'center',
        backgroundColor:'#3598dc',
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
    buttonText:
    {
        fontSize: 18,
        alignContent: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        textAlign: 'center'
    },
    horizontalLine: {
        borderBottomColor: 'black',
        borderColor: 'red',
        height: 0,
        width: 150,
        borderStyle: 'solid',
        margin: 10,
        borderBottomWidth: 1,
    },
    innerContainer:{
        // padding:10,
        margin:20,
        paddingTop:16,
        borderRadius:10,
        backgroundColor:'#fff',
        // alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        // alignSelf:'center',
    },
    button:
    {
        paddingVertical: 15,
        paddingHorizontal: 15,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        width: 140,
        backgroundColor: '#3598dc',
    },
    loginText: {
        fontSize: 16,
        color: '#1133ff',
        textDecorationLine: 'underline',
    },
    lastText: {
        margin: 20,
        fontSize: 16,
    }
})
