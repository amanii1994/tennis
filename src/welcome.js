import React, { Component } from 'react';
import { StyleSheet, View, Platform, Text, Image, TouchableOpacity } from 'react-native';
import StatusBar from './statusBar';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontRegNew = (Platform.OS === 'ios') ? 'HardSports' : 'Hard Sports';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
export default class welcome extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor:'#0054ff',width: '100%', height: '100%', flex: 1 }}>
                <StatusBar backgroundColor="#282828" barStyle="light-content" />
                <View style={styles.container}>
                <View style={{alignSelf:'center', flexDirection:'column'}}>
                    <Image source={require('./img/head1.png')} />
                </View>
                    
                </View>
                <View>
                    <Text style={[styles.textStyle]}>
                        An age appropriate tennis 
                        experience using technology, 
                        sports science, and extreme fun at an 
                        affordable price.
                    </Text>
                </View>
                <View style={styles.logo}>
                    <Image source={require('./img/Tlogo.png')} />
                </View>
                <View style={{flex:1, justifyContent:"flex-end", marginBottom:wp('11%')}}>
                    <TouchableOpacity   onPress={()=>navigate('login')} >
                        <View  style={styles.bottomContainer}>
                        <View style={{ width: wp('13%'), height: wp('8%'), paddingLeft:wp('5%')}}>
                                <Image source={require('./img/cool.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="cover" />
                            </View>
                            <View style={{flexDirection:'column', alignSelf:'center'}}>
                            <View style={{ width: wp('70%'), height: hp('4%'), }}>
                                    <Image source={require('./img/head2.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="cover" />
                                    </View>
                                    <Text style={{  alignSelf: 'center', fontSize: wp('4%'), color: '#000000',lineHeight: hp('4%'), fontWeight: 'bold',}}>Sign In or Create an Account</Text>
                            </View>
                        </View>
                    </TouchableOpacity> 
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    logo1: {
        margin: hp('2%'),
    },
    container: {
        marginTop: hp('8%'),
        marginBottom: hp('2%'),
    },
    headerText: {
       alignSelf:'center',
        fontSize: wp('9%'),
        color: '#000000',
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: fontRegNew
    },
    textStyle: {
        marginLeft: wp('9%'),
        marginRight: wp('9%'),
        fontSize: wp('4.5%'),
        color: '#000000',
        lineHeight: hp('4%'),
        textAlign: 'center',
       // fontFamily: fontReg
    },
    logo: {
        marginTop: hp('6%'),
        alignSelf: 'center',
    },
    bottomText: {
        fontSize: wp('8.5%'),
        color: '#000000',
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: fontRegNew
    },
    bottomContainer:{
        width:wp('92%'),
        backgroundColor:'#fff',
        alignSelf: 'center',
        borderRadius:wp('2%'),
        flexDirection:'row',
        padding:wp('2%')

    }
});
