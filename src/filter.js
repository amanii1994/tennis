import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Image, ScrollView, TouchableHighlight, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
import { Button } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onClick: false, id: 1,
            isVisible: false,
            chosenTime: '',
        };
    }
    showPicker = () => {
        this.setState({ isVisible: true });
    }
    hidePicker = () => {
        this.setState({ isVisible: false });
    }
    handlePicked = (chosenTime) => {
        this.setState({
            isVisible: false,
            chosenTime: moment(chosenTime).format('HH:mm')
        })
    };
    _backFn() {
        this.props.navigation.goBack();
    }
    getVal(val) {
        // console.warn(val);
    }
    render() {
        
        var _style = {
            padding: 1,
            marginTop: hp('2%'),
            width: wp('30%'),
            height: hp('3.5%'),
            backgroundColor: '#fff',
            borderRadius: 24,
            borderWidth: 0.5,
            borderColor: '#000000',
        }
        var _text = {
            color: '#000000',
            fontFamily: fontSemiBold,
            fontSize: wp('3.5%')
        }
        return (
            <View style={{ backgroundColor: '#fff', width: wp('100%'), height: hp('100%') }}>
                <StatusBar backgroundColor="#282828" barStyle="light-content" />
                <View style={styles.container}>
                    <View style={{ flex: 6, justifyContent: 'center' }}><Text style={[styles.headerText, { fontSize: wp('5'), fontFamily: fontMed, alignSelf: 'center', }]}>Filter classes</Text></View>
                </View>
                <ScrollView>

                    <View style={[styles.buttonContainer, { marginTop: wp('6%'), marginBottom: wp('6%') }]}><Text style={[styles.headerText, { fontSize: wp('5'), fontFamily: fontSemiBold }]}>Nearby Locations</Text></View>
                    <ScrollView style={{ marginLeft: wp('3.5%'), height: hp('22%'), margin: wp('1%') }}>
                        <Button
                            buttonStyle={_style}
                            title='Melham Park'
                            color='#fff'
                            titleStyle={_text}
                        />
                        <Button
                            buttonStyle={_style}
                            title='Melham Park'
                            color='#fff'
                            titleStyle={_text}
                        />
                        <Button
                            buttonStyle={[styles.buttonstyle, {}]}
                            title='Linder'
                            color='#fff'
                            titleStyle={styles.buttonText}
                        />
                        <Button
                            buttonStyle={[styles.buttonstyle, { width: wp('35%'), }]}
                            title='South Lebanon'
                            color='#fff'
                            titleStyle={styles.buttonText}
                        />
                        <Button
                            buttonStyle={[styles.buttonstyle, { width: wp('35%'), }]}
                            title='South Lebanon'
                            color='#fff'
                            titleStyle={styles.buttonText}
                        />
                    </ScrollView>
                    <View style={{ flexDirection: 'column', margin: wp('3%'), marginTop: wp('12%') }}>
                        <Text style={[styles.headerText, { fontSize: wp('5'), fontFamily: fontSemiBold }]}>Time:</Text>
                        <Text style={styles.textP}> See Classes Between </Text>
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', margin: 2 }}>
                            <View style={{ flex: 2 }}>
                                <Button
                                    buttonStyle={[styles.buttonstyle, { width: wp('35%'), }]}
                                    title='Start Time'
                                    color='#fff'
                                    onPress={this.showPicker}
                                    titleStyle={styles.buttonText}
                                />
                                <Text style={[styles.textP]}>{this.state.chosenTime}</Text>
                                <DateTimePicker
                                    isVisible={this.state.isVisible}
                                    onConfirm={this.handlePicked}
                                    onCancel={this.hidePicker}
                                    mode={'time'}
                                    datePickerModeAndroid={'spinner'}
                                    is24Hour={false}
                                />
                            </View>
                            <View style={{ flex: 2 }}>
                                <Button
                                    buttonStyle={[styles.buttonstyle, { width: wp('35%'), }]}
                                    title='End Time'
                                    color='#fff'
                                    onPress={this.showPicker}
                                    titleStyle={styles.buttonText}
                                />
                                <Text style={[styles.textP]}>{this.state.chosenTime}</Text>
                                <DateTimePicker
                                    isVisible={this.state.isVisible}
                                    onConfirm={this.handlePicked}
                                    onCancel={this.hidePicker}
                                    mode={'time'}
                                    datePickerModeAndroid={'spinner'}
                                    is24Hour={false}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <Button
                            buttonStyle={[styles.buttonstyle, {
                                backgroundColor: '#1AB31A',
                                height: hp('6%'),
                                borderWidth: 0,
                            }]}
                            title='SUBMIT'
                            color='#fff'
                            titleStyle={[{ fontFamily: fontSemiBold, color: '#fff', }]}
                            onPress={() => this._backFn()}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    buttonstyle: {
        padding: 1,
        marginTop: hp('2%'),
        width: wp('30%'),
        height: hp('3.5%'),
        backgroundColor: '#fff',
        borderRadius: 24,
        borderWidth: 0.5,
        borderColor: '#000000',
    },
    container: {
        marginTop: hp('1%'),
        flexDirection: 'row',
    },
    headerText: {
        fontSize: wp('5%'),
        color: '#000000',
        fontFamily: fontReg,
    },
    textP: {
        fontSize: wp('4%'),
        fontFamily: fontReg,
        alignSelf: 'center',
        color: '#000000',
        lineHeight: hp('4%')
    },
    buttonContainer: {
        flex: 6,
        marginLeft: wp('3%'),
        marginTop: wp('8%'),
        marginBottom: wp('3%')
    },
    buttonText: {
        color: '#000000',
        fontFamily: fontSemiBold,
        fontSize: wp('3.5%')
    },
})
