import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
export default class activites extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor: '#fff', width: '100%', height: '100%', flex: 1 }}>
                <StatusBar backgroundColor="#282828" barStyle="light-content" />
                <View style={styles.container}>
                    <View style={{ alignSelf: 'center', marginLeft: wp('3%'), }}><Linericon name="Group-102" size={wp('6%')} color='#000000' /></View>
                    <View style={{ flex: 6, justifyContent: 'center' }}><Text style={styles.headerText}>Activity</Text></View>
                </View>
                <TouchableOpacity style={styles.containerB}>
                    <View style={styles.containerBa}>
                        <Linericon name="Group-129" size={wp('10%')} color="#2F610D" />
                        <Text style={styles.touchText}>DROP IN</Text>
                    </View>
                    <View style={styles.containerBb}><Linericon name="back" size={wp('10%')} color="#2F610D" style={{ alignSelf: 'center' }} /></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerB}>
                    <View style={styles.containerBa}>
                        <Linericon name="Group-129" size={wp('10%')} color="#2F610D" />
                        <Text style={styles.touchText}>MOMMY AND ME</Text>
                    </View>
                    <View style={styles.containerBb}><Linericon name="back" size={wp('10%')} color="#2F610D" style={{ alignSelf: 'center' }} /></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerB}>
                    <View style={styles.containerBa}>
                        <Linericon name="Group-129" size={wp('10%')} color="#2F610D" />
                        <Text style={styles.touchText}>GROUP</Text>
                    </View>
                    <View style={styles.containerBb}><Linericon name="back" size={wp('10%')} color="#2F610D" style={{ alignSelf: 'center' }} /></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerB}>
                    <View style={styles.containerBa}>
                        <Linericon name="Group-129" size={wp('10%')} color="#2F610D" />
                        <Text style={styles.touchText}>HOUSE CALL</Text>
                    </View>
                    <View style={styles.containerBb}><Linericon name="back" size={wp('10%')} color="#2F610D" style={{ alignSelf: 'center' }} /></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerB}>
                    <View style={styles.containerBa}>
                        <Linericon name="Group-129" size={wp('10%')} color="#2F610D" />
                        <Text style={styles.touchText}>TEAM TENNIS</Text>
                    </View>
                    <View style={styles.containerBb}><Linericon name="back" size={wp('10%')} color="#2F610D" style={{ alignSelf: 'center' }} /></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerB}>
                    <View style={styles.containerBa}>
                        <Linericon name="Group-129" size={wp('10%')} color="#2F610D" />
                        <Text style={styles.touchText}>SUMMER CAMP</Text>
                    </View>
                    <View style={styles.containerBb}><Linericon name="back" size={wp('10%')} color="#2F610D" style={{ alignSelf: 'center' }} /></View>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: hp('7%'),
        flexDirection: 'row',
    },
    headerText: {
        fontSize: wp('12%'),
        color: '#000000',
        fontFamily: fontBold,
        alignSelf: 'center',
    },
    containerB: {
        width: wp('90%'),
        alignSelf: 'center',
        height: wp('16%'),
        borderRadius: wp('10%'),
        borderWidth: wp('0.5%'),
        marginTop: wp('6%'),
        borderColor: '#2F610D',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerBa: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginLeft: wp('5%')
    },
    containerBb: {
        alignSelf: 'center',
        marginRight: wp('5%')
    },
    touchText: {
        color: "#2F610D",
        fontSize: wp('6%'),
        marginLeft: wp('3%'),
        fontFamily:fontSemiBold
    }
})
