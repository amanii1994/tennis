import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
import { Button, Card } from 'react-native-elements';
import Calender from 'react-native-calendar';
import { Dropdown } from 'react-native-material-dropdown';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';

export default class tinygroupA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
        };
    }

    _updateWeek(val){
        if(this.state.selectedDate > val){
            this.setState({selectedDate:moment(this.state.selectedDate).add(-7, 'days')});
        }else{
            this.setState({selectedDate:moment(this.state.selectedDate).add(7, 'days')});
        }
    }

    render() {
        let data = [{
            value: 'Southern California',
        }, {
            value: 'Southern California',
        }, {
            value: 'Southern California',
        }];
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ backgroundColor: '#fff', flex: 1 }}>
                    <StatusBar backgroundColor="#282828" barStyle="light-content" />
                    <View style={styles.container}>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: wp('3%'), }} onPress={() => navigate('tinygroup')}><Linericon name="left-arrow-1" size={wp('4.5%')} color='#000000' /></TouchableOpacity>
                        <View style={{ flex: 6, justifyContent: 'center' }}><Text style={[styles.headerText, { fontSize: wp('5'),fontFamily:fontMed }]}>Calendar</Text></View>
                    </View>
                    <View style={{ width: wp('60%'), marginLeft: wp('1%') }}>
                        <Dropdown
                            itemTextStyle={{fontFamily:fontBold}}
                            inputContainerStyle={{ borderBottomColor: 'transparent' }}
                            fontFamily={fontBold}
                            dropdownPosition={0}
                            label=''
                            data={data}
                            value={data[0].value}
                            baseColor ={'#000'}
                        />
                    </View>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', marginTop: wp('6%') }}>
                            <View style={{
                                width: wp('10%'), height: wp('9%'),
                                marginLeft: wp('1%'),
                                alignSelf: 'center'
                            }}>
                                <Image source={require('./img/menu2.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode="cover" />
                            </View>
                            <TouchableOpacity style={styles.containerB}>
                                <View style={styles.containerBa}>
                                    <Text style={styles.touchText}>6AM - 12PM </Text>
                                    <Text style={styles.touchText}> X</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containerB}>
                                <View style={styles.containerBa}>
                                    <Text style={styles.touchText}>Calabasas  </Text>
                                    <Text style={styles.touchText}>  X</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
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
                             selectedDate={this.state.selectedDate}
                             iconContainer={{ flex: 0.1 }}
                            />
                        </View>
                        <View style={[styles.containerCD, { flexDirection: 'row', height: hp('13%'), }]}>
                            <View style={{ width: wp('20%'), height: wp('20%'), alignSelf: 'center' }}>
                                <Image source={require('./img/dropin3.png')} style={styles.containerCDb} resizeMode="cover" />
                            </View>
                            <View style={{ flexDirection: 'column', alignSelf: 'center', marginLeft: wp('1%') }}>
                                <Text style={[styles.textP, { marginBottom: wp('2%') }]}>9:00 AM - Topauga</Text>
                                <Text style={styles.textP}>Mommy + Me </Text>
                            </View>
                           
                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', backgroundColor: '#1AB31A', height: hp('16%'), width: wp('26'), borderRadius: wp('2%'), borderWidth: wp('0.5'), borderColor: '#1AB31A', height: hp('5%'), marginRight: wp('1%'), marginTop: hp('6%') }}>
                                <Text style={{ color: '#fff', alignSelf: 'center' }}>Reserve</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{ alignSelf: 'center' }}>
                            <Button
                                buttonStyle={[styles.buttonstyle, { backgroundColor: '#1AB31A' }]}
                                title='NEXT'
                                color='#fff'
                                titleStyle={styles.buttonText}
                                onPress={() => navigate('tinygroupB')}
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
})
