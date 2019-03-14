import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView ,Platform, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
import { Button,Card } from 'react-native-elements';
import moment from 'moment';
import Calender from 'react-native-calendar';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { Dropdown } from 'react-native-material-dropdown';
import CalendarStrip from 'react-native-calendar-strip';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';

export default class mommymeB extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedDate: new Date(),
        };
      }
    render() {
        let data = [{
            value: 'text1',
        }, {
            value: 'text2',
        }, {
            value: 'text3',
        }];
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ backgroundColor: '#fff',  flex: 1 }}>
                    <StatusBar backgroundColor="#282828" barStyle="light-content" />
                    <View style={styles.container}>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: wp('3%'), }} onPress={() => navigate('mommymeA')}><Linericon name="left-arrow-1" size={wp('5%')} color='#000000' /></TouchableOpacity>
                        <View style={{ flex: 6, justifyContent: 'center' }}><Text style={[styles.headerText, { fontSize: wp('6') }]}>Find a class</Text></View>
                    </View>
                    <View style={{ width: wp('40%'),marginLeft:wp('1%') }}>
                        <Dropdown
                            dropdownPosition={0}
                            label='Select State'
                            data={data}
                        />
                    </View>
                    <ScrollView>
                    {/* <Card style={{width:wp}}> */}
                    <View style={{ flexDirection: 'row', marginTop: wp('6%') }}>
                        <View style={{ width: wp('10%'), height: wp('9%'), 
                        marginLeft: wp('1%'),
                         alignSelf: 'center' }}>
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
                    {/* </Card> */}
                    <View style={{  paddingTop: 20, backgroundColor: '#fff',}}>
                        <CalendarStrip
                            calendarAnimation={{type: 'sequence', duration: 30}}
                            daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
                            style={{height: 100, paddingTop: 20, paddingBottom: 10}}
                            calendarHeaderStyle={{color: 'white'}}
                            calendarColor={'#7743CE'}
                            dateNumberStyle={{color: 'white'}}
                            dateNameStyle={{color: 'white'}}
                            highlightDateNumberStyle={{color: 'yellow'}}
                            highlightDateNameStyle={{color: 'yellow'}}
                            disabledDateNameStyle={{color: 'grey'}}
                            disabledDateNumberStyle={{color: 'grey'}}
                            onWeekChanged={(value) => this.setState({selectedDate:value})}
                            selectedDate={this.state.selectedDate}
                            iconContainer={{flex: 0.1}}
                        />
                        {/* <CalendarStrip
                            selectedDate={this.state.selectedDate}
                            onPressDate={(date) => {
                                this.setState({ selectedDate: date });
                            }}
                            onPressGoToday={(today) => {
                                this.setState({ selectedDate: today });
                            }}
                            onSwipeDown={() => {
                                alert('onSwipeDown');
                            }}
                            onSwipeLeft={() => {
                                alert('onSwipeDown');
                            }}
                            onSwipe={(direction, state) => alert('testt')}
                            markedDate={['2018-05-04', '2018-05-15', '2018-06-04', '2018-05-01',]}
                        /> */}
                    </View>
                  
                    <View style={[styles.containerCD, { flexDirection: 'row', height: hp('13%'), }]}>
                        <View style={{ width: wp('20%'), height: wp('20%'), alignSelf: 'center' }}>
                            <Image source={require('./img/dropin1.png')} style={styles.containerCDb} resizeMode="cover" />
                        </View>
                        <View style={{ flexDirection: 'column', alignSelf: 'center', marginLeft: wp('1%') }}>
                            <Text style={[styles.textP, { marginBottom: wp('2%') }]}>9:00 AM - Topauga</Text>
                            <Text style={styles.textP}>Mommy + Me </Text>
                        </View>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff', height: hp('16%'), width: wp('26'), borderRadius: wp('2%'), borderWidth: wp('0.5'), borderColor: '#000000', height: hp('5%'), marginRight: wp('1%'), marginTop: hp('6%') }}>
                            <Text style={{ color: '#000000', alignSelf: 'center' }}>Reservedsjhdj</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <Button
                            buttonStyle={[styles.buttonstyle, { backgroundColor: '#69C53A' }]}
                            title='NEXT'
                            color='#fff'
                            titleStyle={styles.buttonText}
                            onPress={() => navigate('mommymeC')}
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
        fontFamily: fontReg
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
