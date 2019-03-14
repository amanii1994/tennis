import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
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
export default class summerC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
        };
    }
    componentDidMount() {
        var that = this;
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        that.setState({
            date: date + '/' + month + '/' + year,
        });
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ backgroundColor: '#fff', width: '100%', height: '100%', flex: 1 }}>
                    <StatusBar backgroundColor="#282828" barStyle="light-content" />
                    <View style={styles.container}>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: wp('3%'), }} onPress={() => navigate('summerB')}><Linericon name="left-arrow-1" size={wp('5%')} color='#000000' /></TouchableOpacity>
                        <View style={{ flex: 6, justifyContent: 'center' }}><Text style={[styles.headerText, { fontSize: wp('5'),fontFamily:fontMed }]}>Confirmation</Text></View>
                    </View>
                    <View style={[{ marginLeft: wp('4%'), marginRight: wp('3%'), marginTop:wp('7%'),borderWidth:wp('0.4%'),borderColor:'#D5D5D5',padding:wp('5%') }]}>
                        <Text style={styles.textP}>Thank You for Reserving your spot for Tiny Tennis Camp 2019. Your fee is fully refundable. You will receive an email with location, times and pricing in May.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-around', marginTop:wp('3%') }}>
                        <View style={[styles.containerC, { padding: wp('2%') }]}>
                            <View style={{ width: wp('20%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Where  </Text>
                            </View>
                            <View style={{ width: wp('80%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { alignItems: 'flex-start' }]}> Woodland Hills</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop:wp('3%') }}>
                        <View style={[styles.containerC, { padding: wp('1%') }]}>
                            <View style={{ width: wp('20%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Time  </Text>
                            </View>
                            <View style={{ width: wp('80%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { alignItems: 'flex-start' }]}> 9AM - 3PM</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop:wp('3%') }}>
                        <View style={[styles.containerC, { padding: wp('1%') }]}>
                            <View style={{ width: wp('20%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Date  </Text>
                            </View>
                            <View style={{ width: wp('80%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { alignItems: 'flex-start' }]}> Summer 2019</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{ alignSelf: 'center' }}>
                        <Button
                            buttonStyle={[styles.buttonstyle, { backgroundColor: '#1AB31A' }]}
                            title='CHECKOUT'
                            color='#fff'
                            titleStyle={styles.buttonText}
                            onPress={()=> navigate('test1')}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
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
  
    textP:{
        fontSize: wp('4%'),
        fontFamily: fontReg,
        lineHeight:hp('4%')
    },
    containerC:
    {
        width: wp('95%'),
        height: hp('6%'),
        borderWidth: wp('0.2%'),
        flexDirection: 'row',
        borderColor: '#000000',
        // justifyContent: 'space-around',
        borderRadius: wp('3%'),
        margin: wp('2%')
    },
    textcontainerC:{
        fontSize: wp('4%'),
        color: '#000000',
        fontFamily: fontMed,
        alignSelf: 'center',
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
