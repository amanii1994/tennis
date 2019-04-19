import React, { Component } from 'react';
import { StyleSheet, Text, Platform, View, Image, Alert,AsyncStorage,TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
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
const fontNameBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
import Loader from './loader';
import restapi from './class/restapi';
import Constants from './constants';
export default class signupfb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneError: '',
            loading:false,
            userData:{}
        }
    }
    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
           this.setState({userData:this.props.navigation.getParam('uData')});
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    validatePhone = (text) => {
        var error;
        if (text) {
            let reg = /^\d{10}$/;
            
            if (text.match(reg)) {
                error = '';
                this.setState({ phoneError: '' }); 
            } else {
                error = 2;
                this.setState({ phoneError: 'please enter valid phone number!!' });
            }
        } else {
            error = 1;
            this.setState({ phoneError: 'Please enter Phone number!!' });
        }
        return error;
    }
    
    handleSubmit = () => {
        this.setState({loading:true});
        var formStatus = '';
        formStatus += this.validatePhone(this.state.userData.mobile);
        if (formStatus.length > 0) {
            this.setState({loading:false});
            return false;
        }else{
            let res = restapi.post(Constants.WITHOUT_AUTH_API_URL + 'savePhone', {'mobile': this.state.userData.mobile, 'user_id': this.state.userData.id});
            res.then(res => {
                if (res.status == 'success') {
                    AsyncStorage.setItem("userToken", "authData");
                    AsyncStorage.setItem("userType", "user");
                    AsyncStorage.setItem("authData", JSON.stringify(res.data));
                    let resData = restapi.get(Constants.API_URL + 'object=app&action=getStaticData');
                    resData.then((res) => {
                        AsyncStorage.setItem('appData', JSON.stringify(res.data));
                        Alert.alert('Successfully logged in!!');
                        this.props.navigation.navigate('App');
                    })
                } else {
                    Alert.alert(res.msg);
                }
            }).then(this.setState({ loading: false }))
            .catch(err => {
                    if (err == 'TypeError: Network request failed') {
                        Alert.alert('Something went wrong', 'Kindly check if the device is connected to stable cellular data plan or WiFi.');
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
                    <View style={styles.container}>
                        <Text style={[styles.headerS, { fontFamily: fontBold, color: 'black',marginBottom:wp('3%') }]}>Let's Keep in touch!</Text>
                     <Text style={[styles.headerS, { fontSize: wp('4%'),fontFamily: fontSemiBold, color: '#828282' }]}>
                            Tiny Tennis will text you when your child’sDrop In starts and ends.
                        </Text>
                    </View>
                    <KeyboardAvoidingView style={styles.containerK} behavior="padding" enabled>
                        <View style={styles.containerKa}>
                            <View style={[styles.containerKb]}>
                                <Linericon name='phone-call-1' size={wp('6%')} color='#2F610D' />
                            </View>
                            <View>
                                <TextInput style={styles.containerKc}
                                    placeholder='Phone'
                                    keyboardType={'phone-pad'}
                                    onChangeText={ text => this.setState(
                                        prevState => ({
                                            userData: {...prevState.userData,
                                                mobile:text
                                            }
                                        }))
                                    }
                                    value={this.state.userData.phone}
                                />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.phoneError}</Text>
                    </KeyboardAvoidingView>
                    <View style={{ alignSelf: 'center' }}>
                        <Button
                            buttonStyle={[styles.buttonstyle, { backgroundColor: '#69C53A' }]}
                            title='CONTINUE'
                            titleStyle={styles.buttonText}
                            //onPress={() => navigate('password')}
                            onPress={() => this.handleSubmit()}
                        />
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
        fontSize: wp('12%'),
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
    errorText: {
        color: 'red',
        marginTop: hp('1%'),
        textAlign: 'center'
    }
})