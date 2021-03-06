import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Alert,Image,AsyncStorage, TouchableOpacity, Keyboard, TouchableWithoutFeedback ,TouchableHighlight} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
import { Button, Card } from 'react-native-elements';
import Rest from './class/restapi';
import { Dropdown } from 'react-native-material-dropdown';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
import Constants from './constants';
import Modal from 'react-native-modal';
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
export default class homeCourtD extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
            location: [],
            selectedLoc: '',
            selectedLabel:'',
            sessions: [],
            session_id:'',
            showingCardEntry: false,
            showingBottomSheet: false,
            userData: {},
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
    async componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            AsyncStorage.getItem("appData").then((info) => {
                if (info) {
                    let dt = JSON.parse(info);
                    let p = [];
                    dt.location.map((data) => {
                        p.push({ label: data.address, value: data.id });
                    })
                    let itemId = this.props.navigation.getParam('itemId');
                    this.setState({ location: p, selectedLoc: p[0].value, selectedLabel: p[0].label, sessions: dt.activities[itemId].session });
                }
            });
            AsyncStorage.getItem("authData").then((info) => {
                if (info) {
                    let dt = JSON.parse(info);
                    console.log(dt);
                    this.setState({ userData: dt });
                    console.log(this.state.userData)
                }
            });
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
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    _updateWeek(val) {
        if (this.state.selectedDate > val) {
            this.setState({ selectedDate: moment(this.state.selectedDate).add(-7, 'days') });
        } else {
            this.setState({ selectedDate: moment(this.state.selectedDate).add(7, 'days') });
        }
    }
    reserve(id,name){
        this.setState({session_id:id,session_name:name});
    }
    goNext(){
        if(this.state.session_id){
            AsyncStorage.getItem("userType").then((info) => {
                if (info) {
                    if(info == 'guest'){
                        let saveData = {
                            'user_id' : 0,
                            'activity_id' : this.props.navigation.getParam('activity_id'),
                            'quantity' : this.props.navigation.getParam('quantity'),
                            'product_id' : this.props.navigation.getParam('product_id'),
                            'price' : this.props.navigation.getParam('price'),
                            'app_date' : moment(this.state.selectedDate).format('YYYY-MM-DD'),
                            'location_id' : this.state.selectedLoc,
                            'session_id': this.state.session_id,
                            'session_name' : this.state.session_name,
                            'loc_name' : this.state.selectedLabel,
                            'time_detail':this.props.navigation.getParam('time_detail'),
                            'activity_name':this.props.navigation.getParam('activity_name'),
                            'total_price' : this.props.navigation.getParam('total_price')
                        }
                        this.props.navigation.navigate('guestcheckout',{'saveData': saveData});
                    }else{
                        this.showOrderScreen();
                    }
                }
            });   
        }else{
            Alert.alert('Please choose session!');
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
    readerData(){
        this.setState({ showingBottomSheet: false });
        Rest.getCurrentUser('authData').then((uData) => {
            if (uData != null){
                let saveData = {
                    'user_id' : uData.id,
                    'activity_id' : this.props.navigation.getParam('activity_id'),
                    'quantity' : this.props.navigation.getParam('quantity'),
                    'product_id' : this.props.navigation.getParam('product_id'),
                    'price' : this.props.navigation.getParam('price'),
                    'app_date' : moment(this.state.selectedDate).format('YYYY-MM-DD'),
                    'location_id' : this.state.selectedLoc,
                    'session_id': this.state.session_id,
                    'session_name' : this.state.session_name,
                    'loc_name' : this.state.selectedLabel,
                    'time_detail':this.props.navigation.getParam('time_detail'),
                    'activity_name':this.props.navigation.getParam('activity_name'),
                    'total_price' : this.props.navigation.getParam('total_price')
                };
                AsyncStorage.setItem('itemReader', JSON.stringify(saveData));
                this.props.navigation.navigate('reader');
            }
        })
    }
    async onCardNonceRequestSuccess(cardDetails) {
        if (this.chargeServerHostIsSet()) {
            try {
                console.log(cardDetails);
                let res = Rest.post(Constants.CHARGE_SERVER_URL, { card_nounce: cardDetails.nonce, amount: this.props.navigation.getParam('price') * this.props.navigation.getParam('quantity'), activity_name: this.props.navigation.getParam('activity_name') });
                res.then(res => {
                    if (res.status == 'success') {
                        let dataSave = {
                            'user_id' : this.state.userData.id,
                            'activity_id' : this.props.navigation.getParam('activity_id'),
                            'quantity' : this.props.navigation.getParam('quantity'),
                            'product_id' : this.props.navigation.getParam('product_id'),
                            'price' : this.props.navigation.getParam('price'),
                            'app_date' : moment(this.state.selectedDate).format('YYYY-MM-DD'),
                            'location_id' : this.state.selectedLoc,
                            'session_id': this.state.session_id,
                            'session_name' : this.state.session_name,
                            'loc_name' : this.state.selectedLabel,
                            'time_detail':this.props.navigation.getParam('time_detail'),
                            'activity_name':this.props.navigation.getParam('activity_name'),
                            'total_price' : this.props.navigation.getParam('total_price')
                        };
                        dataSave.t_id = res.id;
                        let p = Rest.saveAppoint(dataSave);
                        p.then((data) => {
                            console.log(data);
                        });
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

    render() {
        const { navigate } = this.props.navigation;
        return (
                <View style={{ backgroundColor: '#fff', flex: 1 }}>
                    <StatusBar backgroundColor="#282828" barStyle="light-content" />
                    <View style={styles.container}>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: wp('3%'), }} onPress={() => navigate('homeCourt')}><Linericon name="left-arrow-1" size={wp('7.5%')} color='#000000' /></TouchableOpacity>
                        <View style={{ flex: 6, justifyContent: 'center' }}><Text style={[styles.headerText, { fontSize: wp('5'),fontFamily:fontMed }]}>Find a class</Text></View>
                    </View>
                    <View style={{ width: wp('60%'), marginLeft: wp('1%') }}>
                        <Dropdown
                            itemTextStyle={{fontFamily:fontBold}}
                            inputContainerStyle={{ borderBottomColor: 'transparent' }}
                            fontFamily={fontBold}
                            dropdownPosition={0}
                            label=''
                            data={this.state.location}
                            value={this.state.selectedLoc}
                            baseColor ={'#000'}
                            onChangeText={(value,index) => { this.setState({ selectedLoc: value , selectedLabel:this.state.location[index].label}) }}
                        />
                    </View>
                    <ScrollView>
                        {/* <Card style={{width:wp}}> */}
                        {/* </Card> */}
                        <View style={{ paddingTop: 20, backgroundColor: '#fff', }}>
                            <CalendarStrip
                                calendarAnimation={{ type: 'sequence', duration: 30 }}
                                daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: '#CBCBCB' }}
                                style={{ height:100, backgroundColor: '#F7F7F7' }}
                                calendarHeaderStyle={{ color: 'black' }}
                                dateNumberStyle={{ color: 'black' }}
                                dateNameStyle={{ color: 'black' }}
                                highlightDateNumberStyle={{ color: 'green' }}
                                highlightDateNameStyle={{ color: 'green' }}
                                disabledDateNameStyle={{ color: 'grey' }}
                                disabledDateNumberStyle={{ color: 'grey' }}
                                onWeekChanged = { (value)=>this._updateWeek(value)}
                                updateWeek={false}
                                minDate={moment()}
                                selectedDate={this.state.selectedDate}
                                iconContainer={{ flex: 0.1 }}
                            />
                           
                        </View>
                        {this.state.sessions ? this.state.sessions.map((data) => {
                            return (
                                <View style={[styles.containerCD, { flexDirection: 'row', height: hp('13%'),flexWrap:'wrap'}]} key={data.id}>
                                    <View style={{ width: wp('20%'), height: wp('20%'), alignSelf: 'center' }}>
                                        <Image source={require('./img/dropin5.png')} style={styles.containerCDb} resizeMode="cover" />
                                    </View>
                                    <View style={{ flexDirection:'column',alignSelf: 'center', marginLeft: wp('1%') }}>
                                        <Text style={[styles.textP, { marginBottom: wp('2%'),flexWrap:'wrap',width:wp('50%') }]}>{data.session} - {this.state.selectedLabel}</Text>
                                        <Text style={styles.textP}>{this.props.navigation.getParam('activity_name')} </Text>
                                    </View>
                                    <TouchableOpacity onPress={()=>this.reserve(data.id,data.session)} style={{ 
                                        flex: 1, 
                                        justifyContent: 'center', 
                                        backgroundColor: this.state.session_id==data.id?'#1AB31A':'transparent', 
                                        borderColor:this.state.session_id==data.id?'#1AB31A':'#000',
                                        height: hp('16%'), width: wp('26'), 
                                        borderRadius: wp('2%'), 
                                        borderWidth: wp('0.5'), 
                                        height: hp('5%'), marginRight: wp('1%'), marginTop: hp('6%') }}>
                                        <Text style={{ color: this.state.session_id==data.id?'#fff':'#000', alignSelf: 'center' }}>Reserve</Text>
                                    </TouchableOpacity>   
                                </View>
                            )
                        }) : ''}
                        
                        <View style={{ alignSelf: 'center' }}>
                            <Button
                                buttonStyle={[styles.buttonstyle, { backgroundColor: '#1AB31A' }]}
                                title='NEXT'
                                color='#fff'
                                titleStyle={styles.buttonText}
                                onPress={() => this.goNext()}
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
                                <View style={stylesBody.titleColumn}>
                                    <Text style={stylesBody.titleText}>Contact Information</Text>
                                </View>
                                <View style={stylesBody.descriptionColumn}>
                                    <Text style={stylesBody.bodyText}>{this.state.userData.user_name}</Text>
                                    <Text style={stylesBody.bodyText}>{this.state.userData.mobile}</Text>
                                </View>
                            </View>
                            <View style={stylesBody.horizontalLine} />
                            <View style={stylesBody.row}>
                                <View style={stylesBody.titleColumn}>
                                    <Text style={stylesBody.titleText}>Activity Name</Text>
                                </View>
                                <View style={stylesBody.descriptionColumn}>
                                    <Text style={stylesBody.bodyText}>{this.props.navigation.getParam('activity_name')}</Text>
                                </View>
                            </View>
                            <View style={stylesBody.horizontalLine} />
                            <View style={stylesBody.row}>
                                <View style={stylesBody.titleColumn}>
                                    <Text style={stylesBody.titleText}>Quantity</Text>
                                </View>
                                <View style={stylesBody.descriptionColumn}>
                                    <Text style={stylesBody.bodyText}>{this.props.navigation.getParam('quantity')}</Text>
                                </View>
                            </View>
                            <View style={stylesBody.horizontalLine} />
                            <View style={stylesBody.row}>
                                <View style={stylesBody.titleColumn}>
                                    <Text style={stylesBody.titleText}>Location</Text>
                                </View>
                                <View style={stylesBody.descriptionColumn}>
                                    <Text style={stylesBody.bodyText}>{this.state.selectedLabel}</Text>
                                </View>
                            </View>
                            <View style={stylesBody.horizontalLine} />
                            <View style={stylesBody.row}>
                                <View style={stylesBody.titleColumn}>
                                    <Text style={stylesBody.titleText}>Appointment Date</Text>
                                </View>
                                <View style={stylesBody.descriptionColumn}>
                                    <Text style={stylesBody.bodyText}>{moment(this.state.selectedDate).format('YYYY-MM-DD')}</Text>
                                    <Text style={stylesBody.bodyText}>{this.props.navigation.getParam('time_detail')}</Text>
                                </View>
                            </View>
                            <View style={stylesBody.horizontalLine} />
                            <View style={stylesBody.row}>
                                <View style={stylesBody.titleColumn}>
                                    <Text style={stylesBody.titleText}>Time</Text>
                                </View>
                                <View style={stylesBody.descriptionColumn}>
                                    <Text style={stylesBody.bodyText}>{this.state.session_name}</Text>
                                </View>
                            </View>
                            <View style={stylesBody.horizontalLine} />
                            <View style={stylesBody.row}>
                                <View style={stylesBody.titleColumn}>
                                    <Text style={stylesBody.titleText}>Price</Text>
                                </View>
                                <View style={stylesBody.descriptionColumn}>
                                    <Text style={stylesBody.bodyText}>$ {this.props.navigation.getParam('price')}</Text>
                                </View>
                            </View>
                            <View style={stylesBody.horizontalLine} />
                            <View style={stylesBody.row}>
                                <View style={stylesBody.titleColumn}>
                                    <Text style={stylesBody.titleText}>Total</Text>
                                </View>
                                <View style={stylesBody.descriptionColumn}>
                                    <Text style={stylesBody.bodyText}>$ {this.props.navigation.getParam('price') * (this.props.navigation.getParam('quantity'))}</Text>
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
                </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: hp('1%'),
        flexDirection: 'row',
    },
    imgContainer: {
        width: wp('6%'), height: wp('6.2%'),
        marginRight: wp('2%'),
       // backgroundColor:'#24988D'
        //alignSelf: 'center',
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
