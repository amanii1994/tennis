import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Image, Alert, TouchableOpacity, Keyboard, TouchableHighlight ,AsyncStorage} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
import Rest from './class/restapi';
import { Button } from 'react-native-elements';
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
export default class mommymeC extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            saveData: {},
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
    checkout() {
        AsyncStorage.getItem("userType").then((info) => {
            if (info) {
                if(info == 'guest'){
                    this.props.navigation.navigate('guestcheckout',{'saveData': this.state.saveData});
                }else{
                    this.showOrderScreen();
                }
            }
        });   
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
            let activity_data = this.props.navigation.getParam('itemData');
            this.setState({ saveData: activity_data });
        }
        AsyncStorage.getItem("authData").then((info) => {
            if (info) {
                let dt = JSON.parse(info);
                this.setState({ userData: dt });
            }
        });
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
    async onCardNonceRequestSuccess(cardDetails) {
        if (this.chargeServerHostIsSet()) {
            try {
                console.log(cardDetails);
                let res = restapi.post(Constants.CHARGE_SERVER_URL, { card_nounce: cardDetails.nonce, amount: this.state.saveData.price * (this.state.saveData.quantity/2), activity_name: this.state.saveData.activity_name });
                res.then(res => {
                    if (res.status == 'success') {
                        let dataSave = this.state.saveData;
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
            <View style={{ backgroundColor: '#fff', width: '100%', height: '100%', flex: 1 }}>
                <StatusBar backgroundColor="#282828" barStyle="light-content" />
                <View style={styles.container}>
                    <TouchableOpacity style={{ alignSelf: 'center', marginLeft: wp('3%'), }} onPress={() => navigate('mommymeB')}><Linericon name="left-arrow-1" size={wp('4.5%')} color='#000000' /></TouchableOpacity>
                    <View style={{ flex: 6, justifyContent: 'center' }}><Text style={[styles.headerText, { fontSize: wp('5'), fontFamily: fontMed }]}>Confirmation</Text></View>
                </View>

                <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-around', marginTop: wp('6%') }}>
                    <View style={[styles.containerC, { padding: wp('2%') }]}>
                        <View style={{ width: wp('20%'), justifyContent: 'space-around' }}>
                            <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Where  </Text>
                        </View>
                        <View style={{ width: wp('80%'), justifyContent: 'space-around' }}>
                            <Text style={[styles.textcontainerC, { alignItems: 'flex-start' }]}> {this.state.saveData.loc_name}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-around', marginTop: wp('3%') }}>
                    <View style={[styles.containerC, { padding: wp('2%') }]}>
                        <View style={{ width: wp('20%'), justifyContent: 'space-around' }}>
                            <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Time  </Text>
                        </View>
                        <View style={{ width: wp('80%'), justifyContent: 'space-around' }}>
                            <Text style={[styles.textcontainerC, { alignItems: 'flex-start' }]}> {this.state.saveData.session_name}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: wp('3%') }}>
                    <View style={[styles.containerC, { padding: wp('1%') }]}>
                        <View style={{ width: wp('20%'), justifyContent: 'space-around' }}>
                            <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Date  </Text>
                        </View>
                        <View style={{ width: wp('80%'), justifyContent: 'space-around' }}>
                            <Text style={[styles.textcontainerC, { alignItems: 'flex-start' }]}> {this.state.saveData.app_date}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ alignSelf: 'center' }}>
                    <Button
                        buttonStyle={[styles.buttonstyle, { backgroundColor: '#1AB31A' }]}
                        title='CHECKOUT'
                        color='#fff'
                        titleStyle={styles.buttonText}
                        onPress={() => this.checkout()}
                    />
                </View>
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
                                    <Text style={stylesBody.titleText}>Time</Text>
                                </View>
                                <View style={stylesBody.descriptionColumn}>
                                    <Text style={stylesBody.bodyText}>{this.state.saveData.session_name}</Text>
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
                                    <Text style={stylesBody.bodyText}>$ {this.state.saveData.price * (this.state.saveData.quantity / 2)}</Text>
                                </View>
                            </View>
                            <View style={stylesBody.horizontalLine} />
                            <Text style={stylesBody.refundText}>
                                You can refund this transaction through your Square dashboard,
                                go to squareup.com/dashboard.
                            </Text>
                        </View>
                        <View style={stylesBody.buttonRow}>
                            <TouchableOpacity
                                onPress={this.onShowCardEntry}
                                style={stylesBody.button}
                            >
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
        marginTop: wp('6%'),
        backgroundColor: '#000000',
        flexDirection: 'row',
        marginLeft: wp('2%')
    },

    textP: {
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
        // justifyContent: 'space-around',
        borderRadius: wp('3%'),
        margin: wp('2%')
    },
    textcontainerC: {
        fontSize: wp('4%'),
        color: '#000000',
        fontFamily: fontMed,
        alignSelf: 'center',
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
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '3%',
    },
    buttonRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: '5%',
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
        width: '100%'
       // flexDirection: 'column',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#24988D',
        borderRadius: 32,
        justifyContent: 'center',
        minHeight: 50,
        width: '40%',
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
