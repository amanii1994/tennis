import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Image, ScrollView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
import { Button } from 'react-native-elements';
import SpotifyPlayer from 'react-spotify-player';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
export default class playlist extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor: '#fff', width: wp('100%'), height: hp('100%') }}>
                <StatusBar backgroundColor="#282828" barStyle="light-content" />
                <View style={styles.container}>
                    <View style={{ width: wp('100%'), height: hp('16%'), backgroundColor: '#fff' }}>
                        <Image source={require('./img/playlist.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="cover" />
                    </View>
                    <Linericon name="left-arrow-1" size={wp('7.5%')} color='#fff' style={{ position: 'absolute', top: 0, left: 0, margin: wp('3%') }} onPress={() => navigate('home')} />
                </View>
                <ScrollView>
                    <View style={[styles.textContainer,{marginTop:wp('3%')}]}>
                        <Text style={styles.textP}>
                            In Every Tiny Tennis Sesh the party never stops as we are bump-in the latest tunes from “Kids Bops”, Disney and Nickelodeon...Studies show that activity is best served with funky tunes.
                        </Text>
                    </View>
                    <View style={[styles.imgContainerA, { padding: wp('1%') }]}>
                        <Image source={require('./img/imgp.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="cover" />
                    </View>
                    <View style={[styles.textContainer,{marginTop:0}]}>
                        <Text style={styles.textP}>
                            Curated and inspired by our instructors, Tiny Tennis exclusive playlists on Spotify Music will help your little ones sweat it out, create positive energy, and recharge - combining pulse-pounding beats with original recordings from instructors that deliver a jolt of confidence and motivation. Your little one will definitely find their fun fix here.
                            </Text>
                    </View>
                    <View style={{width:wp('92%'),marginBottom: wp('10%'),alignSelf:'center', marginTop:wp('3%')}}>
                    <View style={{ flexDirection: 'row', justifyContent:"space-between"}}>
                        <View style={styles.imgContainer}>
                            <Image source={require('./img/imgp1.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="cover" />
                        </View>
                        <View style={styles.imgContainer}>
                            <Image source={require('./img/imgp2.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="cover" />
                        </View>
                        <View style={styles.imgContainer}>
                            <Image source={require('./img/imgp3.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="cover" />
                        </View>
                        <SpotifyPlayer
  uri="spotify:album:1TIUsv8qmYLpBEhvmBmyBk"
  size={'100%'}
  view={'list'}
  theme={'black'}
/>
                    </View>
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
    imgContainer: {
        width: wp('28.5%'),
        height: wp('34%'),
        // alignSelf: 'center',
        // padding: wp('3%'),
       
    },
    imgContainerA: {
        width: wp('30%'),
        height: wp('34%'),
        alignSelf: 'center',
        padding: wp('3%'),
       
    },
    imgContainerA: {
        width: wp('32%'),
        height: wp('32%'),
        alignSelf: 'center',
        margin: wp('3%')
    },
    textContainer: {
        marginLeft: wp('4%'),
        marginRight:wp('4%'),
        marginTop: wp('2%'),
        borderColor: '#D5D5D5',
        borderWidth: wp('0.4%'), padding: wp('4.5%')
    },
    textP: {
        fontSize: wp('4%'),
        fontFamily: fontReg,
        lineHeight: hp('3%')
    },
    buttonstyle: {
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
