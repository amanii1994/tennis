import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, Platform, Image, Alert, AsyncStorage, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
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
export default class dropinRewardA extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
            location: [],
            selectedLoc: '',
            showingBottomSheet: false,
            userData: {},
            selectedName: '',
            loading:false
        };
        this.showOrderScreen = this.showOrderScreen.bind(this);
        this.closeOrderScreen = this.closeOrderScreen.bind(this);
    }
    showOrderScreen() {
        this.setState({ showingBottomSheet: true });
    }
    closeOrderScreen() {
        this.setState({ showingBottomSheet: false });
    }
    checkout() {
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
                    this.setState({ location: p, selectedLoc: p[0].value, selectedName: p[0].label });
                }
            });
            AsyncStorage.getItem("authData").then((info) => {
                if (info) {
                    let dt = JSON.parse(info);
                    this.setState({ userData: dt });
                }
            });
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
    
    
    readerData(){
        Rest.getCurrentUser('authData').then((uData) => {
            if (uData != null){
                this.data = {
                    'user_id': uData.id,
                    'activity_id': this.props.navigation.getParam('activity_id'),
                    'quantity': this.props.navigation.getParam('quantity'),
                    'product_id': this.props.navigation.getParam('product_id'),
                    'price': this.props.navigation.getParam('price'),
                    'app_date': moment(this.state.selectedDate).format('YYYY-MM-DD'),
                    'location_id': this.state.selectedLoc,
                    'total_price': this.props.navigation.getParam('total_price'),
                    't_id': 'reward',
                    'points':this.props.navigation.getParam('points')
                };
                Rest.saveAppointReward(this.data);
            }
        }).then(this.setState({ showingBottomSheet: false }));
        Alert.alert('Your order was successful, Go to your Tiny classes.');
        this.props.navigation.navigate('home');
    }
    checkStateAndPerform(){
        this.setState({ showingBottomSheet: false });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <StatusBar backgroundColor="#282828" barStyle="light-content" />
                <Loader
                    loading={this.state.loading} />
                <View style={styles.container}>
                    <TouchableOpacity style={{ alignSelf: 'center', marginLeft: wp('3%'), }} onPress={() => navigate('rewardActivity')}><Linericon name="left-arrow-1" size={wp('7.5%')} color='#000000' /></TouchableOpacity>
                    <View style={{ flex: 6, justifyContent: 'center' }}><Text style={[styles.headerText, { fontSize: wp('5'), fontFamily: fontMed }]}>Calendar</Text></View>
                </View>
                <View style={{ width: wp('60%'), marginLeft: wp('1%') }}>
                    <Dropdown
                        itemTextStyle={{ fontFamily: fontBold }}
                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                        fontFamily={fontBold}
                        dropdownPosition={0}
                        label=''
                        data={this.state.location}
                        value={this.state.selectedLoc}
                        baseColor={'#000'}
                        onChangeText={(value, index) => { this.setState({ selectedLoc: value, selectedName: this.state.location[index].label }) }}
                    />
                </View>
                <ScrollView>
                    <View style={{ paddingTop: 20, backgroundColor: '#fff', }}>
                        <CalendarStrip
                            calendarAnimation={{ type: 'sequence', duration: 30 }}
                            daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: '#CBCBCB' }}
                            style={{ height: 100, backgroundColor: '#F7F7F7' }}
                            calendarHeaderStyle={{ color: 'black' }}
                            dateNumberStyle={{ color: 'black' }}
                            dateNameStyle={{ color: 'black' }}
                            highlightDateNumberStyle={{ color: 'green' }}
                            highlightDateNameStyle={{ color: 'green' }}
                            disabledDateNameStyle={{ color: 'grey' }}
                            disabledDateNumberStyle={{ color: 'grey' }}
                            onWeekChanged={(value) => this._updateWeek(value)}
                            updateWeek={false}
                            minDate={moment()}
                            selectedDate={this.state.selectedDate}
                            iconContainer={{ flex: 0.1 }}
                        />
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
                                    <Text style={stylesBody.bodyText}>{this.state.userData.user_name}</Text>
                                    <Text style={stylesBody.bodyText}>{this.state.userData.mobile}</Text>
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
                                        <Text style={stylesBody.bodyText}>{this.state.selectedName}</Text>
                                    </View>
                                </View>
                                <View style={stylesBody.horizontalLine} />
                                <View style={stylesBody.row}>
                                    <View style={stylesBody.titleColumn}>
                                        <Text style={stylesBody.titleText}>Appointment Date & Duration</Text>
                                    </View>
                                    <View style={stylesBody.descriptionColumn}>
                                        <Text style={stylesBody.bodyText}>{moment(this.state.selectedDate).format('YYYY-MM-DD')}</Text>
                                        <Text style={stylesBody.bodyText}>{this.props.navigation.getParam('time_detail')}</Text>
                                    </View>
                                </View>
                                <View style={stylesBody.horizontalLine} />
                                <View style={stylesBody.row}>
                                    <View style={stylesBody.titleColumn}>
                                        <Text style={stylesBody.titleText}>Points</Text>
                                    </View>
                                    <View style={stylesBody.descriptionColumn}>
                                        <Text style={stylesBody.bodyText}>{this.props.navigation.getParam('points')}</Text>
                                    </View>
                                </View>
                                <View style={stylesBody.horizontalLine} />
                                <Text style={stylesBody.refundText}>
                                </Text>
                            </ScrollView>
                        </View>
                        <View style={stylesBody.buttonRow}>
                            <TouchableOpacity  onPress={() => this.readerData()}style={[stylesBody.button, { backgroundColor: '#000' }]}>
                                <Text style={stylesBody.buttonText}>Continue</Text>
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
        height: hp('40%')
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
        alignItems: 'flex-start'
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
        flexDirection: 'row'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: fontBold
    },
    titleText: {
        fontFamily: fontBold,
        lineHeight: hp('3%')
        // textAlign:'justify'
    },
    bodyText: {
        fontFamily: fontReg,
        //  textAlign: 'right'
    }
})




