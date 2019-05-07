import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView,TextInput,Alert,AsyncStorage,ScrollView,TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
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
import Constants from './constants';
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
            userData:{},
            show:false
        }

    }
    handleSubmit(){
        if(this.state.show){
            var formStatus = '';
            formStatus += this.validateCname(this.state.cname,'cnameError');
            formStatus += this.validateCname(this.state.userData.user_name,'fnameError');
            formStatus += this.validateEmail(this.state.userData.email);
            formStatus += this.validatePhone(this.state.userData.mobile);
            formStatus += this.validateText(this.state.userData.pin_code,'zipError');
            formStatus += this.validateText(this.state.budget,'budgetError');
            if (formStatus.length > 0) {
                return false;
            } else {
                let activity_id = this.props.navigation.getParam('activity_id');
                let apdate = this.props.navigation.getParam('app_date');
                let res = restapi.post(Constants.API_URL + 'object=app&action=createBdayGuest', { 
                user_id: 0,
                activity_id:activity_id ,
                child_name: this.state.cname,
                phone: this.state.userData.mobile,
                zip: this.state.userData.pin_code,
                budget: this.state.budget,
                name:this.state.userData.user_name,
                email:this.state.userData.email.trim(),
                app_date: apdate});
                res.then(res => {
                    if (res.status == 'success') {
                        Alert.alert(res.msg);
                       // AsyncStorage.clear();
                        this.props.navigation.navigate('home');
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
        }else{
            if(this.state.cname && this.state.userData.pin_code && this.state.budget){
                let activity_id = this.props.navigation.getParam('activity_id');
                let apdate = this.props.navigation.getParam('app_date');
                let res = restapi.post(Constants.API_URL + 'object=app&action=createBday', { 
                user_id: this.state.userData.id,
                activity_id:activity_id ,
                child_name: this.state.cname,
                phone: this.state.userData.mobile,
                zip: this.state.userData.pin_code,
                budget: this.state.budget,
                app_date: apdate});
                res.then(res => {
                    if (res.status == 'success') {
                        Alert.alert(res.msg);
                        this.props.navigation.navigate('birthdayB');
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
            }else{
                Alert.alert('Please fill all fields!!');
            }
        }
        
    }
    validateCname=(text,type)=>{
        var error='';
        if(text){
            let reg = /^[a-zA-Z]*$/;
            if(reg.test(text) == false){
                error = 2;
                this.setState({ [type]: 'please enter only Text!!' });
            }else{
                error = '';
                this.setState({ [type]: '' });
            }
        }else{
            error = 1;
            this.setState({ [type]: 'Please enter Name!!' });
        }
        return error;
    }
    validateText = (text,type) => {
        var error='';
        if(text){        
                error = '';
                this.setState({ [type]: '' });
        }else{
            error = 1;
            this.setState({ [type]: 'Please enter Value!!' });
        }
        return error;
    }
    validateEmail = (text) => {
        var error;
        if (text) {
            let reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
            if (reg.test(text.trim()) === false) {
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
    
    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            AsyncStorage.getItem("authData").then((info) => {
                if (info) {
                    let dt = JSON.parse(info);
                    console.log(dt);
                    this.setState({ userData: dt });
                }
            });
            AsyncStorage.getItem("userType").then((info) => {
                if (info) {
                    if(info == 'guest'){
                        this.setState({show:true});
                    }else{
                        this.setState({show:false});
                    }
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
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: wp('3%'), }} onPress={() => navigate('birthday')}><Linericon name="left-arrow-1" size={wp('7.5%')} color='#000000' /></TouchableOpacity>
                        <View style={{ flex: 6, justifyContent: 'center' }}><Text style={[styles.headerText, { fontSize: wp('5'),fontFamily:fontMed }]}>Tiny Request</Text></View>
                    </View>
                    <ScrollView>
                    <KeyboardAvoidingView style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'space-around', marginTop:wp('6%') }}>
                        <View style={[styles.containerC]}>
                        {/* <View style={{ width: wp('30%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Name  </Text>
                            </View> */}
                            <View style={{ width: wp('70%'), justifyContent: 'space-around' }}>
                                <TextInput 
                                    editable={this.state.show?true:false}
                                    style={[styles.textcontainerC, { alignItems: 'flex-start' ,marginLeft: wp('5%')}]} 
                                    placeholder='Enter Name' 
                                    autoCapitalize='none'
                                    onChangeText={ text => this.setState(
                                        prevState => ({
                                            userData: {...prevState.userData,
                                                user_name:text
                                            }
                                        }))
                                    }
                                    value={this.state.userData.user_name}
                                    />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.fnameError}</Text>
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'space-around', marginTop:wp('3%') }}>
                        <View style={[styles.containerC, {  }]}>
                        {/* <View style={{ width: wp('30%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Child Name  </Text>
                            </View> */}
                            <View style={{ width: wp('70%'), justifyContent: 'space-around' }}>
                            <TextInput 
                                style={[styles.textcontainerC, { alignItems: 'flex-start',marginLeft: wp('5%') }]} 
                                placeholder='Enter Child Name'
                                autoCapitalize='none'
                                onChangeText={text => this.setState({ cname: text })}
                                value={this.state.cname}
                            />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.cnameError}</Text>
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'space-around', marginTop:wp('3%') }}>
                        <View style={[styles.containerC, {  }]}>
                            {/* <View style={{ width: wp('30%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Phone  </Text>
                            </View> */}
                            <View style={{ width: wp('70%'), justifyContent: 'space-around' }}>
                            <TextInput 
                                editable={this.state.show?true:false}
                                style={[styles.textcontainerC, { alignItems: 'flex-start',marginLeft: wp('5%') }]} 
                                placeholder='Enter Phone' 
                                autoCapitalize='none'
                                keyboardType={'numeric'}
                                value={this.state.userData.mobile}
                                onChangeText={ text => this.setState(
                                    prevState => ({
                                        userData: {...prevState.userData,
                                            mobile:text
                                        }
                                    }))
                                }
                            />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.phoneError}</Text>
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView style={{ flexDirection: 'column', alignSelf: 'center', marginTop:wp('3%') }}>
                        <View style={[styles.containerC, { }]}>
                            {/* <View style={{ width: wp('30%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Email  </Text>
                            </View> */}
                            <View style={{ width: wp('95%'), justifyContent: 'space-around' }}>
                            <TextInput 
                                 editable={this.state.show?true:false}
                                style={[styles.textcontainerC, { alignItems: 'flex-start',marginLeft: wp('5%') }]} 
                                placeholder='Enter Email' 
                                autoCapitalize='none'
                                value={this.state.userData.email}
                                onChangeText={ text => this.setState(
                                    prevState => ({
                                        userData: {...prevState.userData,
                                            email:text
                                        }
                                    }))
                                }
                            />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.emailError}</Text>
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView style={{ flexDirection: 'column', alignSelf: 'center', marginTop:wp('3%') }}>
                        <View style={[styles.containerC, {  }]}>
                            {/* <View style={{ width: wp('30%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Zip  </Text>
                            </View> */}
                            <View style={{ width: wp('95%'), justifyContent: 'space-around' }}>
                            <TextInput 
                                style={[styles.textcontainerC, { alignItems: 'flex-start',marginLeft: wp('5%') }]} 
                                placeholder='Enter Zip Code' 
                                autoCapitalize='none'
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
                        <View style={[styles.containerC, {  }]}>
                            {/* <View style={{ width: wp('30%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Budget  </Text>
                            </View> */}
                            <View style={{ width: wp('95%'), justifyContent: 'space-around' }}>
                            <TextInput 
                                style={[styles.textcontainerC, { alignItems: 'flex-start',marginLeft: wp('5%') }]} 
                                placeholder='Enter Budget' 
                                keyboardType={'numeric'}
                                autoCapitalize='none'
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
                    </ScrollView>
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
        height: hp('6.6%'),
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
