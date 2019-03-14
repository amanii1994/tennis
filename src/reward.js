import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Image, ScrollView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
import { Button } from 'react-native-elements';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
export default class reward extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor: '#fff', width: wp('100%'), height: hp('100%') }}>
                        <StatusBar backgroundColor="#282828" barStyle="light-content" />
                        <View style={styles.container}>
                            <View style={{ width: wp('100%'), height: hp('23 %'), backgroundcolor: '' }}>
                                <Image source={require('./img/reward1.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="cover" />
                            </View>
                            <Linericon name="left-arrow-1" size={wp('6%')} color='#fff' style={{ position: 'absolute', top: 0, left: 0, margin: wp('3%') }} onPress={() => navigate('home')} />
                        </View>
                <ScrollView >
                    
                        <View style={{ marginTop: wp('3%') }}>
                            <View style={{ marginLeft: wp('4%'), }}>
                                <Text style={styles.headerText}>How it works</Text>
                            </View>
                            <View style={[styles.textContainer]}>
                                <Text style={styles.textP}>
                                    Every Tiny Tennis purchase will earn your little one 1 reward point. Every 10 points earned they will receive a 15 minute tiny Drop In class or you can bundle the minutes and take a Tiny Private, Tiny Group or Mommy & Me class. All you need to do is sign up at checkout by entering your phone number.
                        </Text>
                            </View>
                        </View>
                        <View style={{ marginTop: wp('3%') }}>
                            <View style={{ marginLeft: wp('4%'), }}>
                                <Text style={styles.headerText}>Keeping track</Text>
                            </View>
                            <View style={[styles.textContainer]}>
                                <Text style={styles.textP}>
                                    Whenever you make a purchase we will text you a link with your available points.
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginTop: wp('3%') }}>
                            <View style={{ marginLeft: wp('4%'), }}>
                                <Text style={styles.headerText}>Redemption</Text>
                            </View>
                            <View style={[styles.textContainer]}>
                                <Text style={styles.textP}>
                                To redeem your rewards we will send you an alert notifying you that you have earned enough points to claim your reward. To claim rewards just enter your phone or redemption code at check out...it’s a Tiny process.
                                </Text>
                            </View>
                        </View>
                        <View style={{ alignSelf: 'center', margin: wp('4%'),marginBottom:wp('10%') }}>
                            <Button
                                buttonStyle={[styles.buttonstyle, {}]}
                                title='REDEEM'
                                titleStyle={styles.buttonText}
                                //onPress={() => navigate('homeCourtB')}
                            />
                        </View>
                        </ScrollView>
                    </View>
               
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    headerText: {
        fontSize: wp('5%'),
        color: '#000000',
        fontFamily: fontSemiBold,

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
    textContainer: {
        marginLeft: wp('4%'), marginRight: wp('4%'),
        marginTop: wp('1%'),
        borderColor: '#D5D5D5',
        borderWidth: wp('0.4%'), padding: wp('4.5%')
    },
    textP: {
        fontSize: wp('4%'),
        fontFamily: fontReg,
        lineHeight: hp('3%')
    },
    buttonstyle: {
        padding:1,
        width: wp('50%'),
        height: hp('6%'),
        borderWidth: wp('0.5'),
        borderColor: '#000000',
        backgroundColor: '#fff',
        borderRadius: 24,
        justifyContent:'center'
    },
    buttonText: {
        color: '#000000',
        fontFamily: fontSemiBold
    },
})
