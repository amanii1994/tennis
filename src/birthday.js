import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, Platform, Image, Keyboard } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';
import StatusBar from './statusBar';
import CalendarStrip from 'react-native-calendar-strip';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
import moment from 'moment';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
export default class birthday extends Component {
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
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
                    <StatusBar backgroundColor="#282828" barStyle="light-content" />
                    <View style={styles.container}>
                        <View style={{ width: wp('100%'), height: hp('23 %'), backgroundcolor: '' }}>
                            <Image source={require('./img/dropin6.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="cover" />
                        </View>
                        <Linericon name="Group-102" size={wp('6%')} color='#000000' style={{ position: 'absolute', top: 0, left: 0, margin: wp('3%') }} onPress={() => navigate('home')} />
                    </View>
                    <View style={{ margin: wp('4%') }}>
                        <Text style={styles.headerText}>Birthday / Events</Text>
                    </View>
                    <View style={{ marginLeft: wp('4%'), marginRight: wp('3%') }}>
                        <Text style={styles.textP}>Tennis parties are very expensive and limited, but a Tiny Tennis party is double AA... Awesome and Affordable. It’s like Tennis and Mario Brothers merged. We supply the court, racquets, balls and instructor. It’s “Awesome”</Text>
                    </View>
                    <View style={{  marginLeft: wp('4%'), marginTop: wp('2%') }}>
                        <Text style={styles.headerText}>Date of Event</Text>
                    </View>
                    <View style={{ paddingTop: hp('2%'),backgroundColor: '#fff', }}>
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

                    <View style={{ alignSelf: 'center',flexDirection:'row',flex:1 }}>
                        <Button
                            buttonStyle={[styles.buttonstyle, { backgroundColor: '#69C53A' }]}
                            title='NEXT'
                            color='#fff'
                            titleStyle={styles.buttonText}
                            onPress={() => navigate('birthdayA')}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({

    container: {
        position: 'relative'
    },
    containerB: {
        marginLeft: wp('2%'),
        width: wp('30%'),
        height: hp('4%'),
        justifyContent: 'center',
        backgroundColor: '#2F610D',
        borderRadius: wp('10%')
    },
    headerText: {
        fontSize: wp('5%'),
        fontFamily: fontBold,
        color: 'black',
    },
    containerC:
    {
        width: wp('95%'),
        height: hp('6%'),
        borderWidth: wp('0.5%'),
        flexDirection: 'row',
        borderColor: '#000000',
        justifyContent: 'space-around',
        borderRadius: wp('3%'),
        margin: wp('2%')
    },
    textP: {
        color: '#000000',
        fontFamily: fontReg,
        fontSize: wp('3.5%'),
        alignSelf: 'center'
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