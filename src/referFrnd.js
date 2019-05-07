import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity,Platform, Image, Keyboard } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
export default class referFrnd extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            
                <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
                    <StatusBar backgroundColor="#282828" barStyle="light-content" />
                    <View style={styles.container}>
                        <TouchableOpacity style={{ 
                             alignSelf: 'center', 
                            marginLeft: wp('3%'), 
                            }} onPress={() => navigate('home')}>
                            <Linericon name="left-arrow-1" size={wp('7.5%')} color='#000000' />
                        </TouchableOpacity>
                        <View style={{ flex: 6, justifyContent: 'center' }}><Text style={[styles.headerText, { fontSize: wp('5'),marginRight:wp('3%'),fontFamily:fontMed }]}>Refer a Friend</Text></View>
                    </View>
                    <View style={{backgroundColor:'#EEEEEE', marginTop:wp('5%')}}>
                        <View style={{flexDirection:'column', margin:wp('12%')}}>
                            <Text style={[styles.textP,{fontFamily:fontBold}]}>Now, time to get new little one's on the courts!</Text>
                            <Text style={[styles.textP, {margin:wp('4%')}]}>http://wwww.Leoramipsam/r/A.bs...</Text>
                            <View style={{alignSelf:'center'}}>
                            <Button
                                buttonStyle={[styles.buttonstyle, { backgroundColor: '#078707' }]}
                                title='Share link'
                                color='#fff'
                                titleStyle={styles.buttonText}
                                // onPress={() => navigate('mommymeC')}
                            />
                            </View>
                        </View>
                    </View>
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
    buttonstyle: {
        padding:1,
        width: wp('50%'),
        height: hp('6%'),
        backgroundColor: '#fff',
        borderRadius: 6,
    },
    buttonText: {
        color: '#fff',
        fontFamily: fontBold,
    },
    textP: {
        fontSize: wp('4%'),
        fontFamily: fontReg,
        textAlign: 'center',
    },
})