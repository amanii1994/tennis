import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Image, Alert, TextInput,TouchableOpacity, AsyncStorage, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
import { Dropdown } from 'react-native-material-dropdown';
import Rest from './class/restapi';
import CalendarStrip from 'react-native-calendar-strip';
import { Button } from 'react-native-elements';
import moment from 'moment';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
export default class teamtennisA extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
            location: [],
            selectedLoc: '',
            selectedLabel: '',
            userData: {},
            showInfo: true
        };
    }
    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            AsyncStorage.getItem("appData").then((info) => {
                if (info) {
                    let dt = JSON.parse(info);
                    let p = [];
                    dt.location.map((data) => {
                        p.push({ label: data.address, value: data.id });
                    })
                    this.setState({ location: p, selectedLoc: p[0].value, selectedLabel: p[0].label });
                }
            });
            Rest.getCurrentUser('authData').then((uData) => {
                if (uData != null)
                    this.setState({ userData: uData });
            });
            AsyncStorage.getItem("userType").then((info) => {
                if (info == 'guest') {
                    this.setState({ 'showInfo': false });
                } else {
                    this.setState({ 'showInfo': true });
                }
            })
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    goNext() {
        let activity_id = this.props.navigation.getParam('activity_id');
        let quantity = this.props.navigation.getParam('quantity');
        let price = this.props.navigation.getParam('price');
        let product_id = this.props.navigation.getParam('product_id');
        let activity_name = this.props.navigation.getParam('activity_name');
        Rest.getCurrentUser('authData').then((uData) => {
            if (uData != null){
                this.itemdata = {
                    'user_id': uData.id,
                    'activity_id': activity_id,
                    'quantity': quantity,
                    'product_id': product_id,
                    'price': price,
                    'app_date': '0000-00-00',
                    'location_id': this.state.selectedLoc,
                    'loc_name': this.state.selectedLabel,
                    'activity_name': activity_name,
                    'total_price': this.props.navigation.getParam('total_price'),
                    'zip_code':this.state.userData.pin_code,
                };
            }else{
                this.itemdata = {
                    'user_id': 0,
                    'activity_id': activity_id,
                    'quantity': quantity,
                    'product_id': product_id,
                    'price': price,
                    'app_date': '0000-00-00',
                    'location_id': this.state.selectedLoc,
                    'loc_name': this.state.selectedLabel,
                    'activity_name': activity_name,
                    'total_price': this.props.navigation.getParam('total_price'),
                    'zip_code':this.state.userData.pin_code,
                };
            }          
            this.props.navigation.navigate('teamtennisC', { itemData: this.itemdata });
        })
    }
    _showData() {
        if (this.state.showInfo) {
            return (
                <View>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-around', marginTop: wp('6%') }}>
                            <View style={[styles.containerC, {}]}>
                                {/* <View style={{ width: wp('20%'), justifyContent: 'space-around' }}>
                                    <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Name  </Text>
                                </View> */}
                                <View style={{ width: wp('95%'), justifyContent: 'space-around' }}>
                                    <Text style={[styles.textcontainerC, { alignItems: 'flex-start',marginLeft: wp('5%') }]}> {this.state.userData.user_name}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-around', marginTop: wp('3%') }}>
                            <View style={[styles.containerC, {}]}>
                                {/* <View style={{ width: wp('20%'), justifyContent: 'space-around' }}>
                                    <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Phone  </Text>
                                </View> */}
                                <View style={{ width: wp('95%'), justifyContent: 'space-around' }}>
                                    <Text style={[styles.textcontainerC, { alignItems: 'flex-start',marginLeft: wp('5%') }]}> {this.state.userData.mobile}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: wp('3%') }}>
                            <View style={[styles.containerC, { }]}>
                                {/* <View style={{ width: wp('20%'), justifyContent: 'space-around' }}>
                                    <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Email  </Text>
                                </View> */}
                                <View style={{ width: wp('95%'), justifyContent: 'space-around' }}>
                                    <Text style={[styles.textcontainerC, { alignItems: 'flex-start',marginLeft: wp('5%') }]}> {this.state.userData.email}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: wp('3%') }}>
                            <View style={[styles.containerC, { }]}>
                                {/* <View style={{ width: wp('20%'), justifyContent: 'space-around' }}>
                                    <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Zip  </Text>
                                </View> */}
                                <View style={{ width: wp('95%'), justifyContent: 'space-around' }}>
                                    <TextInput 
                                        style={[styles.textcontainerC, { alignItems: 'flex-start', marginLeft: wp('5%') }]} 
                                        placeholder='Enter zipcode' 
                                        value={this.state.userData.pin_code != 'undefined' ? this.state.userData.pin_code : ''}
                                        onChangeText={ text => this.setState(
                                            prevState => ({
                                                userData: {...prevState.userData,
                                                    pin_code:text
                                                }
                                            }))
                                        }
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
            );
        } else {
            return null;
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ backgroundColor: '#fff', width: '100%', height: '100%', flex: 1 }}>
                    <StatusBar backgroundColor="#282828" barStyle="light-content" />
                    <View style={styles.container}>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: wp('3%'), }} onPress={() => navigate('summerA')}><Linericon name="left-arrow-1" size={wp('7.5%')} color='#000000' /></TouchableOpacity>
                        <View style={{ flex: 6, justifyContent: 'center' }}><Text style={[styles.headerText, { fontSize: wp('5'), fontFamily: fontMed }]}>Save a SPOT!</Text></View>
                    </View>
                    <View style={{ width: wp('90%'), marginLeft: wp('1%'), alignSelf: 'center' }}>
                        <Dropdown
                            itemTextStyle={{ fontFamily: fontBold, }}
                            inputContainerStyle={{ borderBottomColor: 'transparent', }}
                            fontFamily={fontBold}
                            dropdownPosition={0}
                            data={this.state.location}
                            value={this.state.selectedLoc}
                            baseColor={'#000'}
                            onChangeText={(value, index) => { this.setState({ selectedLoc: value, selectedLabel: this.state.location[index].label }) }}
                        />
                    </View>
                    {this._showData()}
                    <View style={{ alignSelf: 'center' }}>
                        <Button
                            buttonStyle={[styles.buttonstyle, { backgroundColor: '#1AB31A' }]}
                            title='NEXT'
                            color='#fff'
                            titleStyle={styles.buttonText}
                            onPress={() => this.goNext()}
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
        borderWidth: wp('0.5%'),
        marginTop: wp('6%'),
        backgroundColor: '#000000',
        flexDirection: 'row',
        marginLeft: wp('2%')
    },

    textP: {
        fontSize: wp('4%'),
        fontFamily: fontMed
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
        fontFamily: fontReg,
        //alignSelf: 'center',
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
})
