import React, { Component } from 'react';
import { StyleSheet, Alert,Text, Platform, ScrollView,View, Image, AsyncStorage, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import StatusBar from './statusBar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
import Constants from './constants';
import restapi from './class/restapi';
import Loader from './loader';
//import { ScrollView } from 'react-native-gesture-handler';
const apiUrl = Constants.WITHOUT_AUTH_API_URL;
export default class password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwdError: '',
            loading: false,
            togglePass: true,
            valid1: '#AEAEAE',
            valid2: '#AEAEAE',
            valid3: '#AEAEAE',
        }
    }
    toggleIn() {
        if (this.state.togglePass === true) {
            this.setState({ togglePass: false });
        } else {
            this.setState({ togglePass: true });
        }
    }
    validatePass1 = (text) => {
        var error;
        if (text && text.length >= 8) {
            this.setState({ valid1: '#2F610D' });
            error = '';
        } else {
            this.setState({ valid1: '#AEAEAE' });
            error = 1;
        }
        return error;
    }
    validatePass2 = (text) => {
        var error;
        var reg = /[A-Za-z]/;
        if (text) {
            if (reg.test(text) == false) {
                this.setState({ valid2: '#AEAEAE' });
                error = 2;
            } else {
                this.setState({ valid2: '#2F610D' });
                error = '';
            }
        } else {
            this.setState({ valid2: '#AEAEAE' });
            error = 2;
        }
        return error;
    }
    validatePass3 = (text) => {
        var error;
        var reg1 = /[0-9_@./#&+-]/;
        if (text) {
            if (reg1.test(text) == false) {
                this.setState({ valid3: '#AEAEAE' });
                error = 1;
            } else {
                this.setState({ valid3: '#2F610D' });
                error = '';
            }
        } else {
            this.setState({ valid2: '#AEAEAE' });
            error = 2;
        }
        return error;
    }
    changeText(pass) {
        var formStatus = '';
        formStatus += this.validatePass1(pass);
        formStatus += this.validatePass2(pass);
        formStatus += this.validatePass3(pass);
        this.setState({ password: pass });
    }
    handleSubmit() {
        this.setState({ loading: true });
        var formStatus = '';
        formStatus += this.validatePass1(this.state.password);
        formStatus += this.validatePass2(this.state.password);
        formStatus += this.validatePass3(this.state.password);
        if (formStatus.length > 0) {
            this.setState({ loading: false });
            return false;
        } else {
            AsyncStorage.getItem("userdata").then((info) => {
                if (info) {
                    let dt = {};
                    dt = JSON.parse(info);
                    this.userInfo = JSON.parse(info);
                    dt.password = this.state.password;
                    AsyncStorage.setItem("userdata", JSON.stringify(dt));
                    //signup app
                    let res = restapi.post(apiUrl + 'signup', { email: dt.email.trim(), password: this.state.password, fname: dt.firstName, lname: dt.lastName, zip_code: dt.zipCode, mobile: dt.phone });
                    res.then(res => {
                        console.log(res);
                    if (res.status == 'success') {
                        this.setState({ loading: false });
                        AsyncStorage.clear();
                        Alert.alert("","Account created.Please verify your email!!");
                        this.props.navigation.navigate('login');
                    } else {
                        this.setState({ loading: false });
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
            });
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
                    <ScrollView>
                    <View style={styles.container}>
                        <Text style={[styles.headerS, { fontFamily: fontBold, color: 'black' }]}>Tiny Protection!</Text>
                        <Text style={[styles.headerS, { fontSize: wp('4%'), fontFamily: fontSemiBold, color: '#828282' }]}>
                            Create a password.
                        </Text>
                    </View>
                    <KeyboardAvoidingView style={styles.containerK} behavior="padding" enabled>
                        <View style={styles.containerKa}>
                            <View style={[styles.containerKb, { justifyContent: 'flex-end' }]}>
                                <Linericon name='lock1' size={wp('6%')} color='#2F610D' />
                            </View>
                            <View style={{ width: wp('55%'), flexDirection: 'row', borderBottomWidth: 1, color: '#000', marginLeft: wp('1%') }}>
                                <TextInput style={styles.containerKc}
                                    placeholder='Password'
                                    secureTextEntry={this.state.togglePass}
                                    autoCapitalize='none'
                                    onChangeText={text => this.changeText(text)}
                                />
                                <View style={[styles.containerKb]}>
                                    <Linericon name='eye' size={wp('5%')} color='#48981F' onPress={() => this.toggleIn()} />
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={{ alignSelf: 'center' }}>
                        <View style={{ flexDirection: 'column', width: wp('60') }}>
                            <View style={styles.containerT}>
                                <Linericon name='check-mark-1' size={wp('4%')} color={this.state.valid1} />
                                <Text style={[styles.textS, { color: this.state.valid1 }]}>At Least 8 characters</Text>
                            </View>
                            <View style={styles.containerT}>
                                <Linericon name='check-mark-1' size={wp('4%')} color={this.state.valid2} />
                                <Text style={[styles.textS, { color: this.state.valid2 }]}>Must Contains letters</Text>
                            </View>
                            <View style={styles.containerT}>
                                <Linericon name='check-mark-1' size={wp('4%')} color={this.state.valid3} />
                                <Text style={[styles.textS, { color: this.state.valid3 }]}>One number or special character</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <Button
                            buttonStyle={[styles.buttonstyle, { backgroundColor: '#69C53A' }]}
                            title='CONTINUE'
                            titleStyle={styles.buttonText}
                            onPress={() => this.handleSubmit()}
                        // onPress={()=>navigate('activity')}
                        />
                    </View>
                    <TouchableOpacity onPress={() => navigate('signupb')} style={{ alignSelf: 'center', marginTop: wp('2%') }}><Text style={{ fontFamily: fontReg, }} >Back</Text></TouchableOpacity>
                    </ScrollView>
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
                marginBottom: hp('5%'),
            },
            android: {
                marginBottom: hp('4%'),
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
                flex: 1,
                color: '#000',
                marginLeft: wp('1.5%'),
                justifyContent: "center",
                alignItems: "stretch",
            },
            android: {
                padding: 0,
                justifyContent: "center",
                flex: 1,
                marginLeft: wp('1.5%'),
                alignItems: "stretch",
            }
        })
    },
    containerT: {
        flexDirection: 'row',
        marginBottom: wp('4%')
    },
    textS: {
        marginLeft: wp('1%'),
        fontFamily: fontSemiBold,
    },
    headerS: {
        textAlign: 'center',
        fontSize: wp('9%'),
    },
    buttonText: {
        color: '#fff',
        fontFamily: fontSemiBold,
    },
    buttonstyle: {
        padding:1,
        marginTop: hp('3%'),
        width: wp('50%'),
        height: hp('6%'),
        backgroundColor: '#fff',
        borderRadius: 24,
    },
})