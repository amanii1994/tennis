import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, WebView, AsyncStorage,Image, ScrollView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
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
export default class playVideo extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            showorderImg: true,
            cardImg: 1,
            video_link: '',
            timePassed: false
        };
        this._loadData();
    }
    _loadData = () => {
        AsyncStorage.getItem("appData").then((info) => {
            if (info) {
                let dt = JSON.parse(info);
                console.log(dt);
                if(dt.video){
                    this.setState({ video_link: dt.video[0].video_link });
                }else{
                    this.setState({ video_link: ''});
                }
                
            } 
        });
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor: '#fff', width: wp('100%'), height: hp('100%') }}>
                <StatusBar backgroundColor="#282828" barStyle="light-content" />
                <View style={styles.container}>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: wp('3%'), }} onPress={() => navigate('livestream')}><Linericon name="left-arrow-1" size={wp('7.5%')} color='#000000' /></TouchableOpacity>
                        <View style={{ flex: 6, justifyContent: 'center' }}>
                            <Text style={[styles.headerText, { fontSize: wp('5'), fontFamily: fontMed }]}>Livestream</Text></View>
                </View>
                {this.state.video_link?<WebView
                            originWhitelist={['*']}
                            useWebKit={true}
                            source={{uri: this.state.video_link}}
                        //style={{marginTop: 20}}
                    />:<Text>No video active</Text>}
               
            </View>
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