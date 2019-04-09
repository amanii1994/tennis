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
export default class Music extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor: '#fff', width: wp('100%'), height: hp('100%') }}>
                <StatusBar backgroundColor="#282828" barStyle="light-content" />
                <Linericon name="left-arrow-1" size={wp('5%')} color='#000000' style={{ marginLeft: wp('3%'), marginTop: hp('1%'), }}
                onPress={() => navigate('home')}
                />
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{ width: wp('90%'), height: wp('32%') }}>
                            <Image source={require('./img/music.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="contain" />
                        </View>
                    </View>
                    <View style={[styles.textContainer, { marginTop: wp('3%') }]}>
                        <Text style={styles.textP}>
                            In Every Tiny Tennis Sesh the party never stops as we are bump-in the latest tunes from “Kids Bops”, Disney and Nickelodeon...Studies show that activity is best served with funky tunes.
                        </Text>
                    </View>
                    <View style={styles.container}>
                        <View style={{ width: wp('75%'), height: wp('32%') }}>
                            <Image source={require('./img/music2.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="contain" />
                        </View>
                    </View>
                    <View style={{ width: wp('82%'), marginBottom: wp('10%'), alignSelf: 'center' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={styles.imgContainer}>
                                    <Image source={require('./img/rockmusic.png')} style={styles.img} resizeMode="contain" />
                                </View>
                                <View style={styles.imgContainer}>
                                    <Image source={require('./img/fishmusic.png')} style={styles.img} resizeMode="contain" />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={styles.imgContainer}>
                                    <Image source={require('./img/trollsmusic.png')} style={styles.img} resizeMode="contain" />
                                </View>
                                <View style={styles.imgContainer}>
                                    <Image source={require('./img/Kidmusic.png')} style={styles.img} resizeMode="contain" />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        alignSelf: 'center'
    },
    imgContainer: {
        width: wp('40.5%'),
        height: wp('40%'),
        margin: wp('1%'),
        borderRadius: wp('3.5%'),
        // shadowColor: "black",
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
    },
    img: {
        flex: 1, height: undefined,
        margin: wp('1%'),
        width: undefined, borderRadius: wp('3.5%'),
    },
    textContainer: {
        marginLeft: wp('4%'),
        marginRight: wp('4%'),
        marginTop: wp('2%'),
        padding: wp('4.5%')
    },
    textP: {
        fontSize: wp('4%'),
        fontFamily: fontReg,
        lineHeight: hp('3%')
    },
})