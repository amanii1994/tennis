import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Platform, Image, Keyboard } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBar from './statusBar';
import { Button } from 'react-native-elements';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
export default class dropin extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
                    <StatusBar backgroundColor="#282828" barStyle="light-content" />
                    <View style={styles.container}>
                        {/* <Image source={require('./img/dropin.png')} />
                     */}
                        <View style={{ width: wp('100%'), height: hp('23 %'), backgroundcolor: '' }}>
                            <Image source={require('./img/dropin1.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="cover" />
                        </View>
                        <Linericon name="Group-102" size={wp('6%')} color='#000000' style={{ position: 'absolute', top: 0, left: 0, margin: wp('3%') }} onPress={() => navigate('home')} />
                    </View>
                    <View style={{ flexDirection: 'row', margin: wp('4%') }}>
                        <Text style={styles.headerText}>Tiny Drop In</Text>
                        <View style={styles.containerB}>
                            <Text style={[styles.headerText, { fontFamily: fontSemiBold, color: '#fff', alignSelf: 'center',padding:wp('1%') }]}>Ages 4-8</Text>
                        </View>
                    </View>
                    <View style={[{ marginLeft: wp('4%'), marginRight: wp('3%') }]}>
                        <Text style={styles.textP}>Fun and fitness based tennis clinic. The goal is to peak your little ones interest for the game by giving you the flexibility to choose the amount of time your child plays. TT will provide all equipment, teaching aids and instruction.</Text>
                    </View>
                    <View style={{ margin: wp('4%') }}>
                        <Text style={styles.headerText}>Let's Play</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.containerC}>
                            <Text style={[styles.textP, { alignSelf: 'center', fontSize: wp('3.5%') }]}>15 min</Text>
                            <Text style={styles.textP1}>$ 8</Text>
                        </View>
                        <View style={styles.containerC}>
                            <Text style={[styles.textP, { alignSelf: 'center', fontSize: wp('3.5%') }]}>30 min</Text>
                            <Text style={styles.textP1}>$ 15</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.containerC}>
                            <Text style={[styles.textP, { alignSelf: 'center', fontSize: wp('3.5%') }]}>45 min</Text>
                            <Text style={styles.textP1}>$ 21</Text>
                        </View>
                        <View style={styles.containerC}>
                            <Text style={[styles.textP, { alignSelf: 'center', fontSize: wp('3.5%') }]}>1 Hour</Text>
                            <Text style={styles.textP1}>$ 25</Text>
                        </View>
                    </View>
                    <View style={styles.containerD}>
                        <Text style={[styles.headerText, { justifyContent: 'flex-start', flex: 1 }]}>Quantity</Text>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View style={styles.containerDa}>
                                    <Text style={{ alignSelf: 'center', fontSize: wp('5%') }}>-</Text>
                                </View>
                                <Text style={{ alignSelf: 'center',fontFamily:fontBold }}>1</Text>
                                <View style={styles.containerDa}>
                                    <Text style={{ alignSelf: 'center', fontSize: wp('5%') }}>+</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <Button
                            buttonStyle={[styles.buttonstyle, { backgroundColor: '#1AB31A' }]}
                            title='CHECKOUT'
                            color='#fff'
                            titleStyle={styles.buttonText}
                        // onPress={()=> navigate('test1')}
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
        backgroundColor: '#1AB31A',
        borderRadius: wp('10%')
    },
    headerText: {
        fontSize: wp('4%'),
        fontFamily: fontBold,
        color: 'black',
    },
    containerC:
    {
        width: wp('45%'),
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
    textP1: {
        color: '#000000',
        fontFamily: fontBold,
        fontSize: wp('3.5%'),
        alignSelf: 'center'
    },
    containerD: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: wp('4%')
    },
    containerDa: {
        width: wp('8%'),
        height: wp('8%'),
        borderRadius: wp('4%'),
        borderWidth: wp('0.2%'),
        marginLeft: wp('2%'),
        marginRight: wp('2%'),
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