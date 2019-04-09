import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView,TextInput,AsyncStorage,TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
import { Button } from 'react-native-elements';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
export default class birthdayA extends Component {
    constructor(props){
        super(props);
        this.state={
            fnameError:'',
            cnameError:'',
            phoneError:'',
            emailError:'',
            zipError:'',
            budgetError:'',
            loading: false,
            userData:{}
        }

    }
    handleSubmit(){
        // this.setState({loading:true});
        // var formStatus='';
        // formStatus += this.validateFname(this.state.fname);
        // formStatus += this.validateCname(this.state.cname);
        // formStatus += this.validateEmail(this.state.cname);
        // formStatus += this.validatePhone(this.state.cname);
    }
    validateCname=(text)=>{
        var error='';
        if(text){
            let reg = /^[a-zA-Z]*$/;
            if(reg.test(text) == false){
                error = 2;
                this.setState({ cnameError: 'please enter only Text!!' });
            }else{
                error = '';
                this.setState({ cnameError: '' });
            }
        }else{
            error = 1;
            this.setState({ cnameError: 'Please enter Child Name!!' });
        }
        return error;
    }
    
    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            AsyncStorage.getItem("authData").then((info) => {
                if (info) {
                    let dt = JSON.parse(info);
                    console.log(dt);
                    this.setState({ userData: dt });
                    console.log(this.state.userData)
                }
            });
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ backgroundColor: '#fff', width: '100%', height: '100%', flex: 1 }}>
                    <StatusBar backgroundColor="#282828" barStyle="light-content" />
                    <View style={styles.container}>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: wp('3%'), }} onPress={() => navigate('birthday')}><Linericon name="left-arrow-1" size={wp('5%')} color='#000000' /></TouchableOpacity>
                        <View style={{ flex: 6, justifyContent: 'center' }}><Text style={[styles.headerText, { fontSize: wp('5'),fontFamily:fontMed }]}>Tiny Request</Text></View>
                    </View>
                   
                    <KeyboardAvoidingView style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'space-around', marginTop:wp('6%') }}>
                        <View style={[styles.containerC, { padding: wp('2%') }]}>
                        <View style={{ width: wp('30%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Name  </Text>
                            </View>
                            <View style={{ width: wp('70%'), justifyContent: 'space-around' }}>
                                <TextInput 
                                    editable={false}
                                    style={[styles.textcontainerC, { alignItems: 'flex-start' }]} 
                                    placeholder='Enter Name' 
                                    value={this.state.userData.user_name}
                                    />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.fnameError}</Text>
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'space-around', marginTop:wp('3%') }}>
                        <View style={[styles.containerC, { padding: wp('2%') }]}>
                        <View style={{ width: wp('30%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Child Name  </Text>
                            </View>
                            <View style={{ width: wp('70%'), justifyContent: 'space-around' }}>
                            <TextInput 
                                style={[styles.textcontainerC, { alignItems: 'flex-start' }]} 
                                placeholder='Enter Name'
                                onChangeText={text => this.setState({ cname: text })}
                                value={this.state.cname}
                            />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.cnameError}</Text>
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'space-around', marginTop:wp('3%') }}>
                        <View style={[styles.containerC, { padding: wp('2%') }]}>
                            <View style={{ width: wp('30%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Phone  </Text>
                            </View>
                            <View style={{ width: wp('70%'), justifyContent: 'space-around' }}>
                            <TextInput 
                                editable={false}
                                style={[styles.textcontainerC, { alignItems: 'flex-start' }]} 
                                placeholder='Enter Phone' 
                                value={this.state.userData.mobile}
                            />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.phoneError}</Text>
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView style={{ flexDirection: 'column', alignSelf: 'center', marginTop:wp('3%') }}>
                        <View style={[styles.containerC, { padding: wp('1%') }]}>
                            <View style={{ width: wp('30%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Email  </Text>
                            </View>
                            <View style={{ width: wp('70%'), justifyContent: 'space-around' }}>
                            <TextInput 
                                editable={false}
                                style={[styles.textcontainerC, { alignItems: 'flex-start' }]} 
                                placeholder='Enter Email' 
                                value={this.state.userData.email}
                            />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.emailError}</Text>
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView style={{ flexDirection: 'column', alignSelf: 'center', marginTop:wp('3%') }}>
                        <View style={[styles.containerC, { padding: wp('1%') }]}>
                            <View style={{ width: wp('30%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Zip  </Text>
                            </View>
                            <View style={{ width: wp('70%'), justifyContent: 'space-around' }}>
                            <TextInput 
                                style={[styles.textcontainerC, { alignItems: 'flex-start' }]} 
                                placeholder='Enter Zip Code' 
                                onChangeText={ text => this.setState(
                                    prevState => ({
                                        userData: {...prevState.userData,
                                            pin_code:text
                                        }
                                    }))
                                }
                                value={this.state.userData.pin_code!='undefined'?this.state.userData.pin_code:''}
                                />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.zipError}</Text>
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView style={{ flexDirection: 'column', alignSelf: 'center', marginTop:wp('3%') }}>
                        <View style={[styles.containerC, { padding: wp('1%') }]}>
                            <View style={{ width: wp('30%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Budget  </Text>
                            </View>
                            <View style={{ width: wp('70%'), justifyContent: 'space-around' }}>
                            <TextInput 
                                style={[styles.textcontainerC, { alignItems: 'flex-start' }]} 
                                placeholder='Enter Budget' 
                                onChangeText={text => this.setState({ budget: text })}  
                                value={this.state.budget}  
                            />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.budgetError}</Text>
                    </KeyboardAvoidingView>
                    <View style={{ alignSelf: 'center' }}>
                        <Button
                            buttonStyle={[styles.buttonstyle, { backgroundColor: '#1AB31A' }]}
                            title='SUBMIT'
                            color='#fff'
                            titleStyle={styles.buttonText}
                            onPress={() => this.handleSubmit()}
                            // onPress={()=> navigate('birthdayB')}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: hp('1%'),
        flexDirection: 'row',
    },
    headerText: {
        fontSize: wp('5%'),
        color: '#000000',
        fontFamily: fontBold,
        alignSelf: 'center',
    },
    containerB: {
        width: wp('40%'),
        alignSelf: 'center',
        height: wp('10%'),
        borderRadius: wp('10%'),
        borderWidth: wp('0.3%'),
        marginTop: wp('6%'),
        backgroundColor: '#000000',
        flexDirection: 'row',
        marginLeft: wp('2%')
    },
  
    textP:{
        fontSize: wp('4%'),
        fontFamily: fontReg
    },
    containerC:
    {
        width: wp('95%'),
        height: hp('6%'),
        borderWidth: wp('0.3%'),
        flexDirection: 'row',
        borderColor: '#000000',
        borderRadius: wp('3%'),
    },
    textcontainerC:{
        fontSize: wp('4%'),
        color: '#000000',
        fontFamily: fontReg,
        //alignSelf: 'center',
    },
    buttonstyle: {
        padding:1,
        marginTop: hp('3%'),
        width: wp('50%'),
        height: hp('6%'),
        backgroundColor: '#fff',
        borderRadius: 24,
    },
    buttonText: {
        color: '#fff',
        fontFamily: fontSemiBold
    },
    errorText: {
        color: 'red',
        marginTop: hp('1%'),
        textAlign: 'center'
    }
})
