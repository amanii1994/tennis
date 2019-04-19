import React, { Component } from 'react';
import { StyleSheet, Text, Alert, AsyncStorage, ScrollView, Linking, Platform, View, Image, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import StatusBar from './statusBar';
import Loader from './loader';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { User } from 'react-native-google-signin';
import icoMoonConfig from '../selection.json';
import config from './config';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
import restapi from './class/restapi';
import Constants from './constants';
const apiUrl = Constants.WITHOUT_AUTH_API_URL;
export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            loading: false,
            show: false,
            signedIn: false, name: "", photoUrl: ""
        }
    }
    guestLogin(){
        AsyncStorage.setItem("userToken", "authData");
        AsyncStorage.setItem("userType", "guest");
        let resData = restapi.get(Constants.API_URL + 'object=app&action=getStaticData');
        resData.then((res) => {
            AsyncStorage.setItem('appData', JSON.stringify(res.data));
            Alert.alert('Successfully logged in!!');
            this.props.navigation.navigate('App');
        })
    }
    async componentDidMount() {
        this._configureGoogleSignIn();
        await this._getCurrentUser();
    }
    _configureGoogleSignIn() {
        GoogleSignin.configure({
            webClientId: (Platform.OS === 'ios') ? config.webClientIdIos : config.webClientId,
            offlineAccess: false,
        });
    }
    async _getCurrentUser() {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({ userInfo, error: null });
        } catch (error) {
            const errorMessage =
                error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
            this.setState({
                error: new Error(errorMessage),
            });
        }
    }
    renderIsSignedIn() {
        return (
            <Button
                onPress={async () => {
                    const isSignedIn = await GoogleSignin.isSignedIn();
                    Alert.alert(String(isSignedIn));
                }}
                title="is user signed in?"
            />
        );
    }

    renderGetCurrentUser() {
        return (
            <Button
                onPress={async () => {
                    const userInfo = await GoogleSignin.getCurrentUser();
                    Alert.alert('current user', userInfo ? JSON.stringify(userInfo.user) : 'null');
                }}
                title="get current user"
            />
        );
    }

    // renderGetTokens() {
    //     return (
    //         <Button
    //             onPress={async () => {
    //                 const isSignedIn = await GoogleSignin.getTokens();
    //                 Alert.alert('tokens', JSON.stringify(isSignedIn));
    //             }}
    //             title="get tokens"
    //         />
    //     );
    // }

    renderUserInfo(userInfo) {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
                    Welcome {userInfo.user.name}
                </Text>
                <Text>Your user info: {JSON.stringify(userInfo.user)}</Text>

                <Button onPress={this._signOut} title="Log out" />
                {this.renderError()}
            </View>
        );
    }

    renderSignInButton() {
        return (
            <View style={styles.container}>
                <GoogleSigninButton
                    style={{ width: 212, height: 48 }}
                    size={GoogleSigninButton.Size.Standard}
                    color={GoogleSigninButton.Color.Auto}
                    onPress={this._signIn}
                />
                {this.renderError()}
            </View>
        );
    }

    renderError() {
        const { error } = this.state;
        if (!error) {
            return null;
        }
        const text = `${error.toString()} ${error.code ? error.code : ''}`;
        return <Text>{text}</Text>;
    }
    _saveUser(userData){
        AsyncStorage.setItem("userToken", "authData");
        AsyncStorage.setItem("userType", "user");
        AsyncStorage.setItem("authData", JSON.stringify(userData));
        let resData = restapi.get(Constants.API_URL + 'object=app&action=getStaticData');
        resData.then((res) => {
            AsyncStorage.setItem('appData', JSON.stringify(res.data));
            Alert.alert('Successfully logged in!!');
            this.props.navigation.navigate('App');
        })
    }
    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
            userInfo.user.user_type = 'google';
            this.setState({ userInfo, error: null });
            if(userInfo){
                let res = restapi.post(apiUrl + 'socialLogin', userInfo.user);
                res.then(res => {
                    if (res.status == 'success') {
                        if(res.data.mobile){
                            this._saveUser(res.data);
                        }else{
                            this.props.navigation.navigate('signupfb',{uData: res.data});
                        } 
                    } else {
                        Alert.alert(res.msg);
                    }
                }).then(this.setState({ loading: false }))
                .catch(err => {
                        if (err == 'TypeError: Network request failed') {
                            Alert.alert('Something went wrong', 'Kindly check if the device is connected to stable cellular data plan or WiFi.');
                        }
                });
            }else{
                Alert.alert('Invalid User!');
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // sign in was cancelled
                Alert.alert('cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation in progress already
                Alert.alert('in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('play services not available or outdated');
            } else {
                Alert.alert('Something went wrong', error.toString());
                this.setState({
                    error,
                });
            }
        }
    };

   

    _showSignin() {
        if (this.state.show) {
            return (
                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: 'center' }}>
                    <TouchableOpacity style={[styles.bottomtouch, { width: wp('100%'), height: hp('6.5%'), backgroundColor: '#48981F', }]} onPress={() => this.handleSubmit()}>
                        <Text style={{ textAlign: 'center', color: '#fff', fontFamily: fontSemiBold, fontSize: hp('2%') }}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return null;
        }
    }
   
    validateEmail = (text) => {
        var error;
        if (text) {
            let reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
            if (reg.test(text) == false) {
                error = 2;
                this.setState({ emailError: 'please enter correct email!!' });
            } else {
                error = '';
                this.setState({ emailError: '' });
            }
        } else {
            error = 1;
            this.setState({ emailError: 'Please enter email!!' });
        }
        return error;
    }
    validatePassword = (text) => {
        var error;
        if (text) {
            error = '',
                this.setState({ passwordError: '' })
        } else {
            error = 1;
            this.setState({ passwordError: 'Please enter password!!' });
        }
        return error;
    }
    handleSubmit = () => {
        this.setState({ loading: true })
        var formStatus = '';
        formStatus += this.validateEmail(this.state.email);
        formStatus += this.validatePassword(this.state.password);
        if (formStatus.length > 0) {
            this.setState({ loading: false });
            return false;
        } else {
            let res = restapi.post(apiUrl + 'login', { email: this.state.email, password: this.state.password });
            res.then(res => {
                if (res.status == 'success') {
                    this._saveUser(res.data);
                } else {
                    Alert.alert(res.msg);
                }
            }).then(this.setState({ loading: false }))
                .catch(err => {
                    this.setState({ loading: false });
                    if (err == 'TypeError: Network request failed') {
                        Alert.alert('Something went wrong', 'Kindly check if the device is connected to stable cellular data plan or WiFi.');
                    }
                });
        }
    }

    render() {
        const { userInfo } = this.state;
        const body = userInfo ? this.renderUserInfo(userInfo) : this.renderSignInButton();
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
                    <StatusBar backgroundColor="#282828" barStyle="light-content" />
                    <Loader
                        loading={this.state.loading} />

                    <ScrollView>
                        <View style={styles.container}>
                            <Text style={[styles.headerS, { fontFamily: fontBold, color: 'black' }]}>
                                Let’s Play!
                        </Text>
                            <Text style={[styles.headerS, { fontSize: wp('4%'), fontFamily: fontSemiBold, color: '#828282' }]}>
                                Sign in or Create an account.
                        </Text>
                        </View>
                        <KeyboardAvoidingView style={styles.containerK} behavior="padding" enabled>
                            <View style={styles.containerKa}>
                                <View style={[styles.containerKb]}>
                                    <Linericon name='envelope' size={wp('5%')} color='#2F610D' />
                                </View>
                                <View>
                                    <TextInput style={styles.containerKc}
                                        placeholder='Email'
                                        autoCapitalize='none'
                                        onChangeText={text => this.setState({ email: text, show: true })}
                                    />
                                </View>
                            </View>
                            <Text style={styles.errorText}>{this.state.emailError}</Text>
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView style={styles.containerK} behavior="padding" enabled keyboardVerticalOffset={50} >
                            <View style={styles.containerKa}>
                                <View style={styles.containerKb}>
                                    <Linericon name='lock1' size={wp('7%')} color='#2F610D' />
                                </View>
                                <View>
                                    <TextInput style={styles.containerKc}
                                        placeholder='Password'
                                        secureTextEntry={true}
                                        autoCapitalize='none'
                                        onChangeText={text => this.setState({ password: text })}
                                    />
                                </View>
                            </View>
                            <Text style={styles.errorText}>{this.state.passwordError}</Text>

                        </KeyboardAvoidingView>
                        <View style={{ alignSelf: 'center', width: wp('75%'), marginBottom: hp('3%') }}>
                            <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => navigate('forgot')}>
                                <Text style={{ fontFamily: fontReg, color: '#2D2D2D' }}>Forget Password? </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <TouchableOpacity style={[styles.touchStyle, { marginTop: hp('1.5%') }]} onPress={() => this.guestLogin()}>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ alignSelf: 'center' }}>
                                        <Text style={styles.touchText}>Continue as Guest</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.touchStyle, { marginTop: hp('1.5%') }]}>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ alignSelf: 'center' }}>
                                        <Linericon name='Group-197' size={wp('8%')} color='black' />
                                    </View>
                                    <View style={{ alignSelf: 'center' }}>
                                        <Text style={styles.touchText}>Sign in with Facebook</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.touchStyle, { marginTop: wp('3%') }]} onPress={this._signIn}>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ alignSelf: 'center' }}>
                                        <Linericon name='google-plus' size={wp('8%')} color='black' />
                                    </View>
                                    <View style={{ alignSelf: 'center' }}>
                                        <Text style={styles.touchText}>Sign in with Google</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {/* {this.renderIsSignedIn()}
                            {this.renderGetCurrentUser()}
                            {this.renderGetTokens()}
                            {body} */}
                        </View>
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity style={styles.bottomtouch}>
                                <Text style={[styles.bottomText1, { fontFamily: fontSemiBold }]}>
                                    If you don't have account
                            </Text>
                                <Text style={styles.bottomText1} onPress={() => navigate('signupa')}> Signup</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    {this._showSignin()}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        margin: hp('7%'),
        flexDirection: 'column',
    },
    containerK: {
        ...Platform.select({
            ios: {
                marginBottom: hp('2%'),
            },
            android: {
                marginBottom: hp('0.5%'),
            }
        })
    },
    containerKa: {
        ...Platform.select({
            ios: {
                alignSelf: 'center',
                flexDirection: 'row',
            },
            android: {
                flexDirection: 'row',
                alignSelf: 'center',
            }
        })
    },
    containerKb: {
        justifyContent: 'center',
    },
    containerKc: {
        ...Platform.select({
            ios: {
                borderBottomWidth: 1,
                flex: 1,
                color: '#000',
                width: wp('60%'),
                marginLeft: wp('1.5%'),
                justifyContent: "center",
                alignItems: "stretch",
            },
            android: {
                padding: 0,
                borderBottomWidth: 1,
                justifyContent: "center",
                flex: 1,
                width: wp('60%'),
                marginLeft: wp('1.5%'),
                alignItems: "stretch",
            }
        })
    },
    headerS: {
        textAlign: 'center',
        fontSize: wp('12%'),
    },
    buttonText: {
        color: '#fff',
        fontSize: wp('4%'),
        fontFamily: fontSemiBold,
        color: 'black',
    },
    buttonstyle: {
        width: wp('75%'),
        padding: 1,
        height: hp('5%'),
        backgroundColor: '#fff',
        borderRadius: 24,
        borderWidth: wp('.2'),
        borderColor: 'black',
        marginBottom: wp('1%')
    },
    touchStyle: {
        width: wp('75%'),
        height: hp('5%'),
        backgroundColor: '#fff',
        borderRadius: 24,
        borderWidth: 0.5,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp('1%')
    },
    touchText: {
        fontSize: wp('4%'),
        marginLeft: wp('2%'),
        fontFamily: fontSemiBold,
        color: 'black'
    },
    errorText: {
        color: 'red',
        marginTop: hp('1%'),
        textAlign: 'center',
        fontFamily: fontReg
    },
    bottomContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center',
        marginBottom: wp('2%'),
        marginTop: wp('2%'),
        marginBottom: wp('2%')
    },
    bottomtouch: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    bottomText1: {
        fontFamily: fontBold,
        fontSize: wp('4%'),
        color: '#2D2D2D'
    }
})