import React, { Component } from 'react';
import { StyleSheet, Text, Platform, View, Image, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import StatusBar from './statusBar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
export default class password extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
                    <StatusBar backgroundColor="#282828" barStyle="light-content" />
                    <View style={styles.container}>
                        <Text style={[styles.headerS, { fontFamily: fontBold, color: 'black'}]}>Your Secret Code!!!</Text>
                        <Text style={[styles.headerS, { fontSize: wp('4%'),fontFamily: fontSemiBold, color: '#828282' }]}>
                            A tiny password
                        </Text>
                    </View>
                    <KeyboardAvoidingView style={styles.containerK} behavior="padding" enabled>
                        <View style={styles.containerKa}>
                            <View style={[styles.containerKb,{justifyContent:'flex-end'}]}>
                                <Linericon name='lock1' size={wp('6%')} color='#2F610D' />
                            </View>
                            <View style={{ width: wp('55%'),flexDirection:'row',borderBottomWidth: 1,color: '#000',marginLeft:wp('1%')}}>
                                <TextInput style={styles.containerKc}
                                    placeholder='Password'
                                />
                                 <View style={[styles.containerKb]}>
                                <Linericon name='eye' size={wp('3%')} color='#48981F' />
                            </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={{alignSelf:'center'}}>
                    <View style={{flexDirection:'column', width:wp('60')}}>
                        <View style={ styles. containerT}>
                            <Linericon name='check-mark-1' size={wp('4%')} color='#2F610D' />
                            <Text style={styles.textS}>At Least 8 characters</Text>
                        </View>
                        <View style={ styles. containerT}>
                            <Linericon name='check-mark-1' size={wp('4%')} color='#2F610D' />
                            <Text style={styles.textS}>Must Contains letters</Text>
                        </View>
                        <View style={ styles. containerT}>
                            <Linericon name='check-mark-1' size={wp('4%')} color='#2F610D' />
                            <Text style={styles.textS}>One number or special character</Text>
                        </View>
                    </View>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <Button
                            buttonStyle={[styles.buttonstyle, { backgroundColor: '#69C53A' }]}
                            title='CONTINUE'
                            titleStyle={styles.buttonText}
                             onPress={()=>navigate('home')}
                        />
                    </View>
                    <TouchableOpacity onPress={() => navigate('signupb')} style={{alignSelf:'center' ,marginTop:wp('2%')}}><Text style={{fontFamily:fontReg,}} >Back</Text></TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        margin: hp('7%'),
        flexDirection: 'column',
    },
    containerK: {
        ...Platform.select({
            ios: {
                marginBottom: hp('5%'),
            },
            android: {
                marginBottom: hp('4%'),
            }
        })
    },
    containerKa: {
        ...Platform.select({
            ios: {
                alignSelf: 'center',
                flexDirection: 'row',

            },
            android: {
                flexDirection: 'row',
                alignSelf: 'center',
                width: wp('65%'),
            }
        })
    },
    containerKb: {
        justifyContent: 'center',
    },
    containerKc: {
        ...Platform.select({
            ios: {
                flex: 1,
                color: '#000',
                marginLeft: wp('1.5%'),
                justifyContent: "center",
                alignItems: "stretch",
            },
            android: {
                padding: 0,
                justifyContent: "center",
                flex: 1,
                marginLeft: wp('1.5%'),
                alignItems: "stretch",
            }
        })
    },
    containerT:{
        flexDirection:'row', 
        marginBottom:wp('4%')
    },
    textS:{
        marginLeft:wp('1%'), 
        fontFamily: fontSemiBold,
    },
    headerS: {
        textAlign: 'center',
        fontSize: wp('9%'),
    },
    buttonText: {
        color: '#fff',
        fontFamily: fontSemiBold,
    },
    buttonstyle: {
        marginTop: hp('3%'),
        width: wp('50%'),
        height: hp('6%'),
        backgroundColor: '#fff',
        borderRadius: 24,
    },
})