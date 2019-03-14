import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView ,Platform, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
import { Button,Card } from 'react-native-elements';
import Calender from 'react-native-calendar';
import { Dropdown } from 'react-native-material-dropdown';

const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';

export default class mommymeB extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
        };
    }
    componentDidMount() {
        var that = this;
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        that.setState({
            date: date + '/' + month + '/' + year,
        });
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
                        <View style={{ alignSelf: 'center', marginLeft: wp('3%'), }}><Linericon name="left-arrow-1" size={wp('5%')} color='#000000' /></View>
                        <View style={{ flex: 6, justifyContent: 'center' }}><Text style={[styles.headerText, { fontSize: wp('6') }]}>Find a class</Text></View>
                    </View>
                    <View style={{ width: wp('40%') }}>
                        <Dropdown
                            label='Select State'
                            data={data}
                        />
                    </View>
                    {/* <View style={styles.container}>
                        <View style={{ alignSelf: 'center', marginLeft: wp('3%'), }}><Text style={[styles.headerText, { fontSize: wp('5') }]}>Southern California</Text></View>
                        <View style={{ flex: 6, justifyContent: 'center', marginLeft: wp('1%') }}><Linericon name="Path-293" size={wp('3%')} color='#000000' /></View>
                    </View> */}
                    <ScrollView>
                       {/* <Card containerStyle={{width:wp('100%'> */}
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
                    <View style={{ margin: wp('1%'), flexDirection: 'column', marginTop: wp('3%') }}>
                        <Calender showControls />
                    </View>
                    <View style={{}}>
                        <Text style={{ alignSelf: 'center' }}>{this.state.date}</Text>
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
                            <Text style={{ color: '#000000', alignSelf: 'center' }}>Reserve</Text>
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
