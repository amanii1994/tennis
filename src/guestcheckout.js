import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, KeyboardAvoidingView,TextInput,Platform, Image, Alert, AsyncStorage, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
import { Button, Card } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import Rest from './class/restapi';
import Loader from './loader';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
import Modal from 'react-native-modal';
import Constants from './constants';
import {
    SQIPCardEntry,
    SQIPApplePay,
    SQIPCore,
    SQIPGooglePay,
} from 'react-native-square-in-app-payments';
import {
    printCurlCommand,
    showAlert,
} from './Utilities';

export default class guestcheckout extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {   
            loading: false,
            showingCardEntry: false,
            showingBottomSheet: false,
            saveData:{}
        };
        this.onStartCardEntry = this.startCardEntry.bind(this);
        this.onShowCardEntry = this.onShowCardEntry.bind(this);
        this.onCardNonceRequestSuccess = this.onCardNonceRequestSuccess.bind(this);
        this.onCardEntryCancel = this.onCardEntryCancel.bind(this);
        this.showOrderScreen = this.showOrderScreen.bind(this);
        this.closeOrderScreen = this.closeOrderScreen.bind(this);
    }
    applicationIdIsSet() { return Constants.SQUARE_APP_ID !== 'REPLACE_ME'; }
    chargeServerHostIsSet() { return Constants.CHARGE_SERVER_HOST !== 'REPLACE_ME'; }

    showOrderScreen() {
        this.setState({ showingBottomSheet: true });
    }
    closeOrderScreen() {
        this.setState({ showingBottomSheet: false });
    }
    onShowCardEntry() {
        this.closeOrderScreen();
        this.setState({ showingCardEntry: true });
    }
    onCardEntryCancel() {
        this.showOrderScreen();
    }
    
    async onCardNonceRequestSuccess(cardDetails) {
        if (this.chargeServerHostIsSet()) {
            try {
                console.log(cardDetails);
                let amt = this.state.saveData.price * this.state.saveData.quantity;
                let res = restapi.post(Constants.CHARGE_SERVER_URL, { card_nounce: cardDetails.nonce, amount: amt, activity_name: this.state.saveData.activity_name });
                res.then(res => {
                    if (res.status == 'success') {
                                this.data = {
                                    'user_id': 0,
                                    'activity_id': this.state.saveData.activity_id,
                                    'quantity': this.state.saveData.quantity,
                                    'product_id': this.state.saveData.product_id,
                                    'price': this.state.saveData.price,
                                    'app_date': this.state.saveData.app_date,
                                    'location_id': this.state.saveData.location_id,
                                    'first_name' : this.state.fname,
                                    'last_name' : this.state.lname,
                                    'session_id': this.state.saveData.session_id,
                                    'email' : this.state.email.trim(),
                                    'phone': this.state.phone,
                                    'zip_code' : this.state.zip_code,
                                    'total_price': this.state.saveData.total_price,
                                    't_id': res.id
                                };       
                            let p = Rest.saveAppointGuest(this.data);
                        SQIPCardEntry.completeCardEntry(() => {
                            showAlert('Your order was successful',
                                'Go to your Square dashbord to see this order reflected in the sales tab.');
                                this.props.navigation.navigate('home');
                        });
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

            } catch (error) {
                SQIPCardEntry.showCardNonceProcessingError(error.message);
            }
        } else {
            SQIPCardEntry.completeCardEntry(() => {
                printCurlCommand(cardDetails.nonce);
                showAlert(
                    'Nonce generated but not charged',
                    'Check your console for a CURL command to charge the nonce, or replace CHARGE_SERVER_HOST with your server host.',
                );
            });
        }
    }
    
    checkStateAndPerform() {
        if (this.state.showingCardEntry) {
            // if application id is not set, we will let you know where to set it,
            // but the card entry will still open due to allowing visuals to be shown
            if (!this.applicationIdIsSet()) {
                showAlert('Missing Square Application ID',
                    'To request a nonce, replace SQUARE_APP_ID in Constants.js with an Square Application ID.',
                    this.startCardEntry);
            } else {
                this.startCardEntry();
            }
        } else if (this.state.showingDigitalWallet) {
            this.startDigitalWallet();
            this.setState({ showingDigitalWallet: false });
        }
    }

    async startCardEntry() {
        this.setState({ showingCardEntry: false });
        const cardEntryConfig = {
            collectPostalCode: true,
        };
        await SQIPCardEntry.startCardEntryFlow(
            cardEntryConfig,
            this.onCardNonceRequestSuccess,
            this.onCardEntryCancel,
        );
    }

    async componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({saveData: this.props.navigation.getParam('saveData')});
        }
        await SQIPCore.setSquareApplicationId(Constants.SQUARE_APP_ID);
        if (Platform.OS === 'ios') {
            await SQIPCardEntry.setIOSCardEntryTheme({
                saveButtonFont: {
                    size: 30,
                },
                saveButtonTitle: 'Pay',
                keyboardAppearance: 'Light',
                tintColor: {
                    r: 36,
                    g: 152,
                    b: 141,
                    a: 0.9,
                },
                textColor: {
                    r: 36,
                    g: 152,
                    b: 141,
                    a: 0.9,
                },
            });
        } else if (Platform.OS === 'android') {
            await SQIPGooglePay.initializeGooglePay(
                GOOGLE_PAY_LOCATION_ID, SQIPGooglePay.EnvironmentTest,
            );
        }
        // this.setState({
        //   canUseDigitalWallet: digitalWalletEnabled,
        // });
    }
   
    componentWillUnmount() {
        this._isMounted = false;
    }
    validateFname = (text) => {
        var error;
        if (text) {
            let reg = /^[a-zA-Z]*$/;
            if (reg.test(text) == false) {
                error = 2;
                this.setState({ fnameError: 'please enter only Text!!' });
            } else {
                error = '';
                this.setState({ fnameError: '' });
            }
        } else {
            error = 1;
            this.setState({ fnameError: 'Please enter First Name!!' });
        }
        return error;
    }
    validateLname = (text) => {
        var error;
        if (text) {
            let reg = /^[a-zA-Z]*$/;
            if (reg.test(text) == false) {
                error = 2;
                this.setState({ lnameError: 'please enter only Text!!' });
            } else {
                error = '';
                this.setState({ lnameError: '' });
            }
        } else {
            error = 1;
            this.setState({ lnameError: 'Please enter Last Name!!' });
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
    
    readerData(){
        this.setState({ showingBottomSheet: false });
        this.data = {
            'user_id': 0,
            'activity_id': this.state.saveData.activity_id,
            'quantity': this.state.saveData.quantity,
            'product_id': this.state.saveData.product_id,
            'price': this.state.saveData.price,
            'app_date': this.state.saveData.app_date,
            'location_id': this.state.saveData.location_id,
            'first_name' : this.state.fname,
            'last_name' : this.state.lname,
            'session_id': this.state.saveData.session_id,
            'email' : this.state.email.trim(),
            'phone': this.state.phone,
            'zip_code' :this.state.zip_code,
            'total_price': this.state.saveData.total_price,
        };  
        AsyncStorage.setItem('itemReader', JSON.stringify(this.data));
        this.props.navigation.navigate('reader');  
    }
   
    handleSubmit(){
        var formStatus = '';
        formStatus += this.validateFname(this.state.fname);
        formStatus += this.validateLname(this.state.lname);
        formStatus += this.validateEmail(this.state.email);
        formStatus += this.validatePhone(this.state.phone);
        if (formStatus.length > 0) {
            return false;
        } else {
            this.showOrderScreen();
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <StatusBar backgroundColor="#282828" barStyle="light-content" />
                <Loader
                    loading={this.state.loading} />
                <View style={styles.container}>
                    <TouchableOpacity style={{ alignSelf: 'center', marginLeft: wp('3%'), }} onPress={() => this.props.navigation.goBack(null)}><Linericon name="left-arrow-1" size={wp('7.5%')} color='#000000' /></TouchableOpacity>
                    <View style={{ flex: 6, justifyContent: 'center' }}><Text style={[styles.headerText, { fontSize: wp('5'), fontFamily: fontMed }]}>Details</Text></View>
                </View>
                <ScrollView>
                <KeyboardAvoidingView style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'space-around', marginTop:wp('6%') }}>
                        <View style={[styles.containerC, {  }]}>
                        {/* <View style={{ width: wp('30%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> First Name  </Text>
                            </View> */}
                            <View style={{ width: wp('95%'), justifyContent: 'space-around' }}>
                                <TextInput 
                                    style={[styles.textcontainerC, { alignItems: 'flex-start' , marginLeft: wp('5%')}]} 
                                    placeholder='Enter First Name' 
                                    autoCapitalize='none'
                                    onChangeText={(text) => {this.setState({fname: text})}}
                                    />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.fnameError}</Text>
                    </KeyboardAvoidingView>
                    
                    <KeyboardAvoidingView style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'space-around', marginTop:wp('6%') }}>
                        <View style={[styles.containerC, {  }]}>
                        {/* <View style={{ width: wp('30%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Last Name  </Text>
                            </View> */}
                            <View style={{ width: wp('95%'), justifyContent: 'space-around' }}>
                                <TextInput 
                                    style={[styles.textcontainerC, { alignItems: 'flex-start', marginLeft: wp('5%') }]} 
                                    placeholder='Enter Last Name' 
                                    autoCapitalize='none'
                                    onChangeText={(text) => {this.setState({lname: text})}}
                                    />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.lnameError}</Text>
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'space-around', marginTop:wp('6%') }}>
                        <View style={[styles.containerC, { }]}>
                        {/* <View style={{ width: wp('30%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Email  </Text>
                            </View> */}
                            <View style={{ width: wp('95%'), justifyContent: 'space-around' }}>
                                <TextInput 
                                    style={[styles.textcontainerC, { alignItems: 'flex-start', marginLeft: wp('5%') }]} 
                                    placeholder='Enter Email' 
                                    autoCapitalize='none'
                                    onChangeText={(text) => {this.setState({email: text})}}
                                    />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.emailError}</Text>
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'space-around', marginTop:wp('6%') }}>
                        <View style={[styles.containerC, {  }]}>
                        {/* <View style={{ width: wp('30%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Phone  </Text>
                            </View> */}
                            <View style={{ width: wp('95%'), justifyContent: 'space-around' }}>
                                <TextInput 
                                    style={[styles.textcontainerC, { alignItems: 'flex-start', marginLeft: wp('5%') }]} 
                                    placeholder='Enter Phone' 
                                    keyboardType={'phone-pad'}
                                    onChangeText={(text) => {this.setState({phone: text})}}
                                    />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{this.state.phoneError}</Text>
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'space-around', marginTop:wp('6%') }}>
                        <View style={[styles.containerC, {  }]}>
                        {/* <View style={{ width: wp('30%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Phone  </Text>
                            </View> */}
                            <View style={{ width: wp('95%'), justifyContent: 'space-around' }}>
                                <TextInput 
                                    style={[styles.textcontainerC, { alignItems: 'flex-start', marginLeft: wp('5%') }]} 
                                    placeholder='Enter zip code' 
                                    onChangeText={(text) => {this.setState({zip_code: text})}}
                                    />
                            </View>
                        </View>
                        {/* <Text style={styles.errorText}>{this.state.phoneError}</Text> */}
                    </KeyboardAvoidingView>
                    <View style={{ alignSelf: 'center' }}>
                        <Button
                            buttonStyle={[styles.buttonstyle, { backgroundColor: '#1AB31A' }]}
                            title='CONTINUE'
                            color='#fff'
                            titleStyle={styles.buttonText}
                            onPress={() => this.handleSubmit()}
                        />
                    </View>
                </ScrollView>
                <Modal
                    isVisible={this.state.showingBottomSheet}
                    style={styles.bottomModal}
                    // onBackdropPress={this.closeOrderScreen}
                    // set timeout due to iOS needing to make sure modal is closed
                    // before presenting another view
                    onModalHide={() => setTimeout(() => this.checkStateAndPerform(), 200)}
                >
                    <View style={styles.modalContent}>
                        <View style={stylesTitle.container}>
                            <TouchableHighlight
                                style={stylesTitle.closeButton}
                                underlayColor="#FFFFFF"
                                onPress={this.closeOrderScreen}
                            >
                                <Image
                                    style={stylesTitle.button}
                                    source={require('./images/btnClose.png')}
                                />
                            </TouchableHighlight>
                            <Text style={stylesTitle.title}>Order Information</Text>
                        </View>
                        <View style={stylesBody.bodyContent}>
                        <ScrollView>
                            <View style={stylesBody.row}>       
                                    <Text style={stylesBody.titleText}>Contact Information</Text>
                            </View>
                            <View style={stylesBody.descriptionColumn}>
                                    <Text style={stylesBody.bodyText}>{this.state.fname} {this.state.lname}</Text>
                                    <Text style={stylesBody.bodyText}>{this.state.phone}</Text>                 
                            </View>
                            <View style={stylesBody.horizontalLine} />
                            <View style={stylesBody.row}>
                                <View style={stylesBody.titleColumn}>
                                    <Text style={stylesBody.titleText}>Activity Name</Text>
                                </View>
                                <View style={stylesBody.descriptionColumn}>
                                    <Text style={stylesBody.bodyText}>{this.state.saveData.activity_name}</Text>
                                </View>
                            </View>
                            <View style={stylesBody.horizontalLine} />
                            <View style={stylesBody.row}>
                                <View style={stylesBody.titleColumn}>
                                    <Text style={stylesBody.titleText}>Quantity</Text>
                                </View>
                                <View style={stylesBody.descriptionColumn}>
                                    <Text style={stylesBody.bodyText}>{this.state.saveData.quantity}</Text>
                                </View>
                            </View>
                            <View style={stylesBody.horizontalLine} />
                            <View style={stylesBody.row}>
                                <View style={stylesBody.titleColumn}>
                                    <Text style={stylesBody.titleText}>Location</Text>
                                </View>
                                <View style={stylesBody.descriptionColumn}>
                                    <Text style={stylesBody.bodyText}>{this.state.saveData.loc_name}</Text>
                                </View>
                            </View>
                            <View style={stylesBody.horizontalLine} />
                            <View style={stylesBody.row}>
                                <View style={stylesBody.titleColumn}>
                                    <Text style={stylesBody.titleText}>Appointment Date & Duration</Text>
                                </View>
                                <View style={stylesBody.descriptionColumn}>
                                    <Text style={stylesBody.bodyText}>{this.state.saveData.app_date}</Text>
                                    <Text style={stylesBody.bodyText}>{this.state.saveData.time_detail}</Text>
                                </View>
                            </View>
                            <View style={stylesBody.horizontalLine} />
                            <View style={stylesBody.row}>
                                <View style={stylesBody.titleColumn}>
                                    <Text style={stylesBody.titleText}>Price</Text>
                                </View>
                                <View style={stylesBody.descriptionColumn}>
                                    <Text style={stylesBody.bodyText}>$ {this.state.saveData.price}</Text>
                                </View>
                            </View>
                            <View style={stylesBody.horizontalLine} />
                            <View style={stylesBody.row}>
                                <View style={stylesBody.titleColumn}>
                                    <Text style={stylesBody.titleText}>Total</Text>
                                </View>
                                <View style={stylesBody.descriptionColumn}>
                                    <Text style={stylesBody.bodyText}>$ {this.state.saveData.total_price}</Text>
                                </View>
                            </View>
                            <View style={stylesBody.horizontalLine} />
                            <Text style={stylesBody.refundText}>
                              
                            </Text>
                            </ScrollView>
                        </View>
                        <View style={stylesBody.buttonRow}>
                        <TouchableOpacity onPress={this.onShowCardEntry} style={[stylesBody.button,{backgroundColor:'#000'}]}>    
                            <View style={styles.imgContainer}>
                                    <Image source={require('../src/img/card.png')} style={{flex: 1, height: undefined,
    width: undefined}}/>
                                </View>
                                <Text style={stylesBody.buttonText}>Pay</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.readerData()}
                                style={stylesBody.button}
                            >
                                <View style={styles.imgContainer}>
                                    <Image source={require('../src/img/square.png')} style={{flex: 1, height: undefined,
    width: undefined}}/>
                                </View>
                                
                                <Text style={stylesBody.buttonText}>Pay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View >
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
    imgContainer: {
        width: wp('6%'), height: wp('6.2%'),
        marginRight: wp('2%'),
       // backgroundColor:'#24988D'
        //alignSelf: 'center',
      },
    containerB: {
        width: wp('40%'),
        alignSelf: 'center',
        height: wp('10%'),
        borderRadius: wp('10%'),
        borderWidth: wp('0.5%'),
        backgroundColor: '#000000',
        flexDirection: 'row',
        marginLeft: wp('2%')
    },
    containerBa: {
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row',
        marginLeft: wp('4%'),
        marginRight: wp('4%'),
        justifyContent: 'space-around',
    },
    containerBb: {
        alignSelf: 'center',
        marginRight: wp('5%')
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
    errorText: {
        color: 'red',
        marginTop: hp('1%'),
        textAlign: 'center',
        fontFamily: fontReg
    },
    textcontainerC:{
        fontSize: wp('4%'),
        color: '#000000',
        fontFamily: fontReg,
        //alignSelf: 'center',
    },
    touchText: {
        color: "#fff",
        fontSize: wp('4%'),
        alignSelf: 'center',
        fontFamily: fontSemiBold
    },
    textP: {
        fontSize: wp('4%'),
        fontFamily: fontReg
    },
    containerCD:
    {
        flexDirection: 'column',
        height: hp('18%'),
        width: wp('98%'), borderRadius: wp('2%'),
        marginTop: wp('5%'),
        marginBottom: wp('5%'),
        borderRadius: wp('2%'),
        borderWidth: wp('0.5%'),
        borderColor: '#828282',
        shadowColor: '#828282',
        shadowOpacity: .5,
        shadowRadius: wp('2%'),
        alignSelf: 'center',
        shadowOffset: {
            width: 0,
            height: 1
        },
    },
    containerCDa: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: wp('2%')
    },

    containerCDb:
    {
        flex: 1, height: undefined,
        width: undefined,
        borderRadius: wp('9%'), margin: wp('1%')
    },
    buttonstyle: {
        padding: 1,
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
    modalContent: {
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flex: 0,
        flexShrink: 1,
        justifyContent: 'flex-start',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
})
const stylesTitle = StyleSheet.create({
    closeButton: {
        zIndex: 1,
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',

    },
    title: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
        zIndex: 0,
        fontFamily: fontBold
    },
})
const stylesBody = StyleSheet.create({
    bodyContent: {
        margin: wp('8%'),
        height:hp('40%')
    },
    buttonRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp('8%'),
        width: '100%',
    },
    descriptionColumn: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    horizontalLine: {
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
        marginBottom: '3%',
        marginTop: '3%',
    },
    refundText: {
        color: '#7B7B7B',
        fontSize: 12,
        marginBottom: '3%',
        fontFamily: fontMed
    },
    row: {
        flexDirection: 'column',
        width: '80%',
        justifyContent: 'space-around',
        alignItems:'flex-start'
    },
    titleColumn: {
        width: wp('100%')
       // flexDirection: 'column',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#24988D',
        borderRadius: 32,
        justifyContent: 'center',
        minHeight: 50,
        width: '40%',
        flexDirection:'row'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: fontBold
    },
    titleText: {
        fontFamily: fontBold,
        lineHeight:hp('3%')
        // textAlign:'justify'
    },
    bodyText: {
        fontFamily: fontReg,
      //  textAlign: 'right'
    }
})




