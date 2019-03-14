import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, TouchableOpacity, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import StatusBar from './statusBar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
import Constants from './api';
const apiUrl = Constants.WITHOUT_AUTH_API_URL;
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
export default class signupa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            email: '',
            zipCode: '',
            fnameError: '',
            lnameError: '',
            emailError: '',
        }
    }
    validatename = (text, label, labelName) => {
        var error;
        if (text) {
            let reg = /^[a-zA-Z]*$/;
            if (reg.test(text) == false) {
                error = 2;
                this.setState({ [label]: 'Please enter only Text!!' });
            } else {
                error = '';
                this.setState({ [label]: '' });
            }
        } else {
            error = 1;
            this.setState({ [label]: 'Please enter ' + labelName + '!!' });
        }
        return error;
    }
    validateEmail = (text) => {
        var error;
        if (text) {
            let reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
            if (reg.test(text) === false) {
                error = 2;
                this.setState({ emailError: 'Please enter correct email!!' });
            } else {
                error = '';
                this.setState({ emailError: '' });
            }
        } else {
            error = 1;
            this.setState({ emailError: 'Please enter Email!!' });
        }
        return error;
    }
    handleSubmit = () => {
        var formStatus = '';
        formStatus += this.validatename(this.state.fname, 'fnameError', 'First Name');
        formStatus += this.validatename(this.state.lname, 'lnameError', 'Last Name');
        formStatus += this.validateEmail(this.state.email);
        if (formStatus.length > 0) {
            return false;
        } else {

            fetch(apiUrl + 'checkEmail', {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                    }),
                    body: 'email=' + this.state.email
                }).then((response) => { console.log(response) 
                // response.json()).then((responseJson) => {
                //     console.log(responseJson);
                //     let uData = {
                //         'firstName': this.state.fname,
                //         'lastName': this.state.lname,
                //         'email': this.state.email,
                //         'zipCode': this.state.zipCode,
                //     }
                //     AsyncStorage.setItem("uData", JSON.stringify(uData));
                }).catch((error) => {
                    console.error(error);
                    if (error == 'TypeError: Network request failed') {
                        Alert.alert('Something went wrong', 'Kindly check if the device is connected to stable cellular data plan or WiFi.');
                    }
                    Alert(error);
                });
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
                    <StatusBar backgroundColor="#282828" barStyle="light-content" />
                    <View style={styles.container}>
                        <Text style={[styles.headerS, { fontFamily: fontBold, color: 'black' }]}>
                            Hello!
                        </Text>
                        <Text style={[styles.headerS, { fontSize: wp('4%'), fontFamily: fontSemiBold, color: '#828282' }]}>create an account</Text>
                    </View>
                    <KeyboardAvoidingView style={styles.containerK} behavior="padding" enabled>
                        <View style={styles.containerKa}>
                            <View style={[styles.containerKb]}>
                                <Linericon name='name' size={wp('7%')} color='#2F610D' />
                            </View>
                            <View>
                                <TextInput style={styles.containerKc}
                                    placeholder='First Name'
                                    onChangeText={text => this.setState({ fname: text })}
                                />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.fnameError}</Text>
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView style={styles.containerK} behavior="padding" enabled>
                        <View style={styles.containerKa}>
                            <View style={[styles.containerKb]}>
                                <Linericon name='identification' size={wp('7%')} color='#2F610D' />
                            </View>
                            <View>
                                <TextInput style={styles.containerKc}
                                    placeholder='Last Name'
                                    onChangeText={text => this.setState({ lname: text })}
                                />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.lnameError}</Text>
                    </KeyboardAvoidingView>

                    <KeyboardAvoidingView style={styles.containerK} behavior="padding" enabled>
                        <View style={styles.containerKa}>
                            <View style={[styles.containerKb]}>
                                <Linericon name='envelope' size={wp('5%')} color='#2F610D' />
                            </View>
                            <View>
                                <TextInput style={styles.containerKc}
                                    placeholder='Email'
                                    onChangeText={text => this.setState({ email: text })}
                                />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.emailError}</Text>
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView style={styles.containerK} behavior="padding" enabled>
                        <View style={styles.containerKa}>
                            <View style={[styles.containerKb]}>
                                <Linericon name='zip-code' size={wp('5%')} color='#2F610D' />
                            </View>
                            <View>
                                <TextInput style={styles.containerKc}
                                    placeholder='Zip Code (Optional)'
                                    onChangeText={text => this.setState({ zipCode: text })}
                                />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.passwordError}</Text>
                    </KeyboardAvoidingView>
                    <View style={{ alignSelf: 'center' }}>
                        <Button
                            buttonStyle={[styles.buttonstyle, { backgroundColor: '#69C53A' }]}
                            title='CONTINUE'
                            color='#fff'
                            titleStyle={styles.buttonText}
                             onPress={() => navigate('signupb')}
                           // onPress={() => this.handleSubmit()}
                        />
                    </View>
                    <TouchableOpacity onPress={() => navigate('login')} style={{ alignSelf: 'center', marginTop: wp('2%') }}><Text style={{ fontFamily: fontReg, }}>Back</Text></TouchableOpacity>
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
                fontFamily: fontReg
            },
            android: {
                padding: 0,
                borderBottomWidth: 1,
                justifyContent: "center",
                flex: 1,
                width: wp('60%'),
                marginLeft: wp('1.5%'),
                alignItems: "stretch",
                fontFamily: fontReg
            }
        })
    },

    headerS: {
        textAlign: 'center',
        fontSize: wp('12%'),
    },
    buttonText: {
        color: '#fff',
        fontFamily: fontSemiBold
    },
    buttonstyle: {
        marginTop: hp('3%'),
        width: wp('50%'),
        height: hp('6%'),
        backgroundColor: '#fff',
        borderRadius: 24,
    },
    errorText: {
        color: 'red',
        marginTop: hp('1%'),
        textAlign: 'center'
    }
})