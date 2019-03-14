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
export default class livestream extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor: '#fff', width: wp('100%'), height: hp('100%') }}>
                <StatusBar backgroundColor="#282828" barStyle="light-content" />
                <View style={styles.container}>
                    <View style={{ width: wp('100%'), height: hp('23 %'), backgroundcolor: '' }}>
                        <Image source={require('./img/live2.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="cover" />
                    </View>
                    <Linericon name="left-arrow-1" size={wp('6%')} color='#fff' style={{ position: 'absolute', top: 0, left: 0, margin: wp('3%') }} onPress={() => navigate('home')} />
                </View>
                <ScrollView >

                    <View style={{ marginLeft: wp('4%'), marginTop: wp('3%') }}>
                        <Text style={styles.headerText}>Live Stream</Text>
                    </View>
                    <View style={[{ marginLeft: wp('4%'), marginRight: wp('4%'), marginTop: wp('2%'), borderColor: '#D5D5D5', borderWidth: wp('0.4%'), padding: wp('4.5%') }]}>
                        <Text style={styles.textP}>
                            In every Tiny Tennis session we use Playsite technology.
                            We live Stream all classes so we can analyze the child’s performance as well
                            as give you a better insight into their progression.
                            It also works as a great social media post, we are sure you will get a lot of likes.
                            After every session you will receive a link to the live feed where you can put in the day,
                            time and location your little participated in Tiny Tennis.
                        </Text>
                    </View>
                    <View style={{ alignSelf: 'center', margin: wp('4%') }}>
                        <Button
                            buttonStyle={[styles.buttonstyle, {}]}
                            title='LIVE STREAM'
                            titleStyle={styles.buttonText}
                            onPress={() => navigate('homeCourtB')}
                        />
                    </View>
                    <View style={{ alignSelf: 'center',marginBottom:wp('10%') }}>
                        <Image source={require('./img/live3.png')} />
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
