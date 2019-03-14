import React, { Component } from 'react';
import { StyleSheet, Text, Platform, View, Image, Alert,TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import StatusBar from './statusBar';
import Constants from './constants';
import Loader from './loader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
const fontNameBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
const apiUrl = Constants.WITHOUT_AUTH_API_URL;
export default class forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            loading: false
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
    handleSubmit = () => {
        this.setState({ loading: true });
        var formStatus = '';
        formStatus += this.validateEmail(this.state.email)
        if (formStatus.length > 0) {
            this.setState({ loading: false });
            return false;
        } else {
            fetch(apiUrl + 'forgetPassword', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                }),
                body: 'email=' + this.state.email
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if (responseJson.status == 'success') {
                        this.setState({ loading: false });
                        Alert.alert('Password successfully changed.Please check your email!!');
                        this.props.navigation.navigate('login');
                    } else {
                        this.setState({ loading: false });
                        Alert.alert(responseJson.msg);
                    }
                }).catch((error) => {
                    this.setState({ loading: false });
                    console.error(error);
                    if (error == 'TypeError: Network request failed') {
                        Alert.alert('Something went wrong', 'Kindly check if the device is connected to stable cellular data plan or WiFi.');
                    }
                });
            this.setState({ loading: false });
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
                    <StatusBar backgroundColor="#282828" barStyle="light-content" />
                    <Loader
                        loading={this.state.loading} />
                    <View style={styles.container}>
                        <Text style={[styles.headerS, { fontFamily: fontBold, color: 'black' }]}>Reset Password</Text>

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
                    <View style={{ alignSelf: 'center' }}>
                        <Button
                            buttonStyle={[styles.buttonstyle, { backgroundColor: '#69C53A' }]}
                            title='Submit'
                            titleStyle={styles.buttonText}
                            onPress={() => this.handleSubmit()}
                        //onPress={() => navigate('password')}
                        />
                    </View>
                    <TouchableOpacity onPress={() => navigate('login')} style={{ alignSelf: 'center', marginTop: wp('2%'), }}><Text style={{ fontFamily: fontReg, }}>Back</Text></TouchableOpacity>
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
                width: wp('65%'),
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
        fontSize: wp('11%'),
    },
    buttonText: {
        color: '#fff',
        fontFamily: fontSemiBold,
    },
    buttonstyle: {
        marginTop: hp('3%'),
        padding:1,
        width: wp('50%'),
        height: hp('6%'),
        backgroundColor: '#fff',
        borderRadius: 24,
    },
    errorText: {
        color: 'red',
        marginTop: hp('1%'),
        textAlign: 'center',
        fontFamily: fontReg
    },
})