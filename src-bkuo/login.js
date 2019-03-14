import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, Platform, View, Image, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
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
        var formStatus = '';
        formStatus += this.validateEmail(this.state.email);
        formStatus += this.validatePassword(this.state.password);
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
               <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
               <StatusBar backgroundColor="#282828" barStyle="light-content" />
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
                                        onChangeText={text => this.setState({ email: text })}
                                    />
                                </View>
                            </View>
                            <Text style={styles.errorText}>{this.state.emailError}</Text>
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView style={styles.containerK} behavior="padding" enabled>
                            <View style={styles.containerKa}>
                                <View style={styles.containerKb}>
                                    <Linericon name='lock1' size={wp('7%')} color='#2F610D' />
                                </View>
                                <View>
                                    <TextInput style={styles.containerKc}
                                        placeholder='Password' secureTextEntry={true} />
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
                            <Button buttonStyle={[styles.buttonstyle]} title='Continue as Guest' titleStyle={[styles.buttonText,]} />
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
                            <TouchableOpacity style={[styles.touchStyle, { marginTop: wp('3%') }]}>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ alignSelf: 'center' }}>
                                        <Linericon name='google-plus' size={wp('8%')} color='black' />
                                    </View>
                                    <View style={{ alignSelf: 'center' }}>
                                        <Text style={styles.touchText}>Sign in with Google</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
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
                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: 'center' }}>
                        <TouchableOpacity style={[styles.bottomtouch, { width: wp('100%'), height: hp('6.5%'), backgroundColor: '#48981F', }]}>
                            <Text style={{ textAlign: 'center', color: '#fff', fontFamily: fontSemiBold, fontSize: hp('2%') }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
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
        height: hp('5%'),
        backgroundColor: '#fff',
        borderRadius: 24,
        borderWidth: wp('.2'),
        borderColor: 'black',
        marginBottom: wp('2%')
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