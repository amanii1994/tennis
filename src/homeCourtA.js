import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Image, TouchableOpacity,Alert,AsyncStorage, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
import Rest from './class/restapi';
import { Button } from 'react-native-elements';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
export default class homeCourtA extends Component {
    constructor(props) {
        super(props);
        this.state= {
            userData : {},
            saveData : {}
        }
       
    }
    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            AsyncStorage.getItem("authData").then((info) => {
                if (info) {
                    let dt = JSON.parse(info);
                    console.log(dt);
                    this.setState({ userData: dt });
                    console.log(this.state.userData)
                }
            });
            let activity_data = this.props.navigation.getParam('itemData');
            this.setState({saveData:activity_data});
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    goNext(){
        let p = Rest.saveAppoint(this.state.saveData);  
        p.then((data)=>{
           Alert.alert(data.msg);
           this.props.navigation.navigate('homeCourtB');
        }).then(this.setState({loading: false}));
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ backgroundColor: '#fff', width: '100%', height: '100%', flex: 1 }}>
                    <StatusBar backgroundColor="#282828" barStyle="light-content" />
                    <View style={styles.container}>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: wp('3%'), }} onPress={() => navigate('homeCourt')}><Linericon name="left-arrow-1" size={wp('5%')} color='#000000' /></TouchableOpacity>
                        <View style={{ flex: 6, justifyContent: 'center' }}><Text style={[styles.headerText, { fontSize: wp('5'), fontFamily: fontMed }]}>Tiny Form</Text></View>
                    </View>
                    <View style={[{ marginLeft: wp('4%'), marginRight: wp('3%'), marginTop: wp('2%') }]}>
                        <Text style={[styles.textP, { lineHeight: hp('3%') }]}>Please fill out this Tiny form. We will call you within 24 hours to schedule your lesson via your home.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-around', marginTop: wp('6%') }}>
                        <View style={[styles.containerC, { padding: wp('2%') }]}>
                            <View style={{ width: wp('20%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Name  </Text>
                            </View>
                            <View style={{ width: wp('80%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { alignItems: 'flex-start' }]}> {this.state.userData.user_name}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-around', marginTop: wp('3%') }}>
                        <View style={[styles.containerC, { padding: wp('2%') }]}>
                            <View style={{ width: wp('20%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Phone  </Text>
                            </View>
                            <View style={{ width: wp('80%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { alignItems: 'flex-start' }]}>  {this.state.userData.mobile}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: wp('3%') }}>
                        <View style={[styles.containerC, { padding: wp('1%') }]}>
                            <View style={{ width: wp('20%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Email  </Text>
                            </View>
                            <View style={{ width: wp('80%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { alignItems: 'flex-start' }]}> {this.state.userData.email}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: wp('3%') }}>
                        <View style={[styles.containerC, { padding: wp('1%') }]}>
                            <View style={{ width: wp('20%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { marginLeft: wp('2%') }]}> Zip  </Text>
                            </View>
                            <View style={{ width: wp('80%'), justifyContent: 'space-around' }}>
                                <Text style={[styles.textcontainerC, { alignItems: 'flex-start' }]}> {this.state.userData.pin_code!='undefined'?this.state.userData.pin_code:''}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <Button
                            buttonStyle={[styles.buttonstyle, { backgroundColor: '#1AB31A' }]}
                            title='SUBMIT'
                            color='#fff'
                            titleStyle={styles.buttonText}
                            onPress={() => this.goNext()}
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

    textP: {
        fontSize: wp('4%'),
        fontFamily: fontReg
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
    textcontainerC: {
        fontSize: wp('4%'),
        color: '#000000',
        fontFamily: fontMed,
        //alignSelf: 'center',
        marginLeft: wp('3%')
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
