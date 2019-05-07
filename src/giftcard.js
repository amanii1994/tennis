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
export default class giftCard extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor: '#fff', width: wp('100%'), height: hp('100%') }}>
                <StatusBar backgroundColor="#282828" barStyle="light-content" />
                <View style={styles.container}>
                    <View style={{ width: wp('100%'), height: hp('23 %'), backgroundcolor: '' }}>
                        <Image source={require('./img/giftcard.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="cover" />
                    </View>
                    <Linericon name="left-arrow-1" size={wp('7.5%')} color='#fff' style={{ position: 'absolute', top: 0, left: 0, margin: wp('3%') }} onPress={() => navigate('home')} />
                </View>
                <ScrollView >

                    <View style={{ marginLeft: wp('4%'), marginTop: wp('3%') }}>
                        <Text style={styles.headerText}>Tiny e-Gift</Text>
                    </View>
                    <View style={[{ marginLeft: wp('4%'), marginRight: wp('4%'), marginTop: wp('2%'), borderColor: '#D5D5D5', borderWidth: wp('0.4%'), padding: wp('4.5%') }]}>
                        <Text style={styles.textP}>
                        An eGift is a digital Tiny Tennis Card sent via email that your recipient can redeem and enjoy on-site or online. Just choose an eGift design, add a personal message and the amount you'd like to give, enter an email address, then hit send...A Tiny gesture!
                        </Text>
                    </View>
                    <View style={{ alignSelf: 'center', margin: wp('6%') }}>
                        <Button
                            buttonStyle={[styles.buttonstyle, {}]}
                            title='Buy'
                            titleStyle={styles.buttonText}
                            //onPress={() => navigate('homeCourtB')}
                        />
                    </View>
                    <View style={{ alignSelf: 'center',marginBottom:wp('10%'), }}>
                        <Image source={require('./img/giftcard1.png')} />
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
    },
    buttonText: {
        color: '#000000',
        fontFamily: fontSemiBold
    },
})
