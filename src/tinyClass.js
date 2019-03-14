import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Platform, Image, Keyboard } from 'react-native';
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
export default class tinyClass extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
                <StatusBar backgroundColor="#282828" barStyle="light-content" />
                <View style={styles.container}>
                    <TouchableOpacity style={{ alignSelf: 'center', marginLeft: wp('3%'), }} onPress={() => navigate('home')}><Linericon name="left-arrow-1" size={wp('5%')} color='#000000' /></TouchableOpacity>
                </View>
                <ScrollView>
                    <View>
                        <View style={styles.containerA}>
                            <Text style={[styles.containerAT, { fontSize: wp('3%') }]}>NAME</Text>
                        </View>
                        <View style={styles.continueB}>
                            <View style={[styles.containerBa,]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.containerAT, { color: '#606060', marginLeft: 0 }]}>First:</Text>
                                    <Text style={[styles.containerAT, { color: '#000000', }]}> Jason</Text>
                                </View>
                            </View>
                            <View style={styles.containerBb}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.containerAT, { color: '#606060' }]}>Last:</Text>
                                    <Text style={[styles.containerAT, { color: '#000000' }]}> Statham</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerA}>
                        <Text style={[styles.containerAT, { fontSize: wp('3%') }]}>PHONE</Text>
                    </View>
                    <View style={styles.containerBb}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.containerAT, { color: '#000000' }]}>+63 473 34 343 99</Text>

                        </View>
                    </View>
                    <View>
                        <View style={styles.containerA}>
                            <Text style={[styles.containerAT, { fontSize: wp('3%') }]}>EMAIL</Text>
                        </View>
                        <View style={styles.continueB}>
                            <View style={[styles.containerBa,]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.containerAT, { color: '#606060', marginLeft: 0 }]}>Jason@gmail.com</Text>
                                    <Text style={[styles.containerAT, { color: '#000000', }]}> Jason</Text>
                                </View>
                            </View>
                            <View style={styles.containerBb}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: wp('5%') }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.containerAT, { color: '#606060' }]}>Class:</Text>
                                        <Text style={[styles.containerAT, { color: '#000000' }]}> History</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.containerAT, { color: '#606060' }]}>Points: </Text>
                                        <Text style={[styles.containerAT, { color: '#000000' }]}> 000</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.containerA,]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: wp('5%') }}>
                            <Text style={[styles.containerAT, { fontSize: wp('3%') }]}>TINY DROPIN</Text>
                            <Text style={[styles.containerAT, { fontSize: wp('3%') }]}>TOPAYA</Text>
                        </View>
                    </View>
                    <View style={styles.containerBb}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: wp('5%') }}>
                            <Text style={[styles.containerAT, { color: '#606060' }]}>01 / 04 /2019</Text>
                            <Text style={[styles.containerAT, { color: '#000000' }]}>15 MIN</Text>
                        </View>
                    </View>
                    <View style={[styles.containerA,]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: wp('5%') }}>
                            <Text style={[styles.containerAT, { fontSize: wp('3%') }]}>MOMMY & ME</Text>
                            <Text style={[styles.containerAT, { fontSize: wp('3%') }]}>TOPAYA</Text>
                        </View>
                    </View>
                    <View style={[styles.containerBb, { marginBottom: wp('10%') }]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: wp('5%') }}>
                            <Text style={[styles.containerAT, { color: '#606060' }]}>05 / 04 /2019</Text>
                            <Text style={[styles.containerAT, { color: '#000000' }]}>45 MIN</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: hp('2%'),
        flexDirection: 'row',
        marginBottom: hp('2%')
    },
    containerA: {
        width: wp('100%'), height: hp('5%'),
        backgroundColor: '#F9F9F9', justifyContent: 'center',
        borderWidth: wp('0.3'), borderColor: '#EBEBEB'
    },
    containerAT: {
        marginLeft: wp('5%'), color: '#8E8E8E',
        fontFamily: fontReg, fontSize: wp('4%')
    },
    containerB: {
        flexDirection: 'column', width: wp('100%'),
        height: hp('16%'),
    },
    containerBa: {
        width: wp('90%'), backgroundColor: '#fff',
        alignSelf: 'center', height: hp('8%'), justifyContent: 'center',
        borderBottomWidth: wp('0.3'), borderColor: '#D1D1D1'
    },
    containerBb: {
        backgroundColor: '#fff', height: hp('8%'),
        justifyContent: 'center'
    },
})