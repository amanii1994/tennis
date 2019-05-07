import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Platform, Image, Keyboard,AsyncStorage } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
import Rest from './class/restapi';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
import Constants from './constants';
export default class tinyClass extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state={
            userData: {},
            appointments:[],
            points:'000',
        };
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            AsyncStorage.getItem("authData").then((info) => {
                if (info) {
                    let dt = JSON.parse(info);
                    this.setState({ userData: dt });
                    let res = Rest.get(Constants.API_URL+'object=appointment&action=getMyClasses&user_id='+dt.id);
                    res.then(res => {
                        if (res.status == 'success') {
                            console.log(res.status);
                            this.setState({appointments:res.result,points:res.result[0].points});
                            console.log(this.state.appointments);
                        } 
                    }).then(this.setState({ loading: false }))
                    .catch(err => {
                            this.setState({ loading: false });
                            if (err == 'TypeError: Network request failed') {
                                Alert.alert('Something went wrong', 'Kindly check if the device is connected to stable cellular data plan or WiFi.');
                            }
                    });
                }
            });
            
        }
    }
    componentWillReceiveProps(){
        AsyncStorage.getItem("authData").then((info) => {
            if (info) {
                let dt = JSON.parse(info);
                this.setState({ userData: dt });
                let res = Rest.get(Constants.API_URL+'object=appointment&action=getMyClasses&user_id='+dt.id);
                res.then(res => {
                    if (res.status == 'success') {
                        console.log(res.status);
                        this.setState({appointments:res.result,points:res.result[0].points});
                        console.log(this.state.appointments);
                    } 
                }).then(this.setState({ loading: false }))
                .catch(err => {
                        this.setState({ loading: false });
                        if (err == 'TypeError: Network request failed') {
                            Alert.alert('Something went wrong', 'Kindly check if the device is connected to stable cellular data plan or WiFi.');
                        }
                });
            }
        });
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
                <StatusBar backgroundColor="#282828" barStyle="light-content" />
                <View style={styles.container}>
                    <TouchableOpacity style={{ alignSelf: 'center', marginLeft: wp('3%'), }} onPress={() => this.props.navigation.goBack(null)}><Linericon name="left-arrow-1" size={wp('7.5%')} color='#000000' /></TouchableOpacity>
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
                                    <Text style={[styles.containerAT, { color: '#000000', }]}> {this.state.userData.fname}</Text>
                                </View>
                            </View>
                            <View style={styles.containerBb}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.containerAT, { color: '#606060' }]}>Last:</Text>
                                    <Text style={[styles.containerAT, { color: '#000000' }]}> {this.state.userData.lname}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerA}>
                        <Text style={[styles.containerAT, { fontSize: wp('3%') }]}>PHONE</Text>
                    </View>
                    <View style={styles.containerBb}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.containerAT, { color: '#000000' }]}>{this.state.userData.mobile}</Text>

                        </View>
                    </View>
                    <View>
                        <View style={styles.containerA}>
                            <Text style={[styles.containerAT, { fontSize: wp('3%') }]}>EMAIL</Text>
                        </View>
                        <View style={styles.continueB}>
                            <View style={[styles.containerBa,]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.containerAT, { color: '#606060', marginLeft: 0 }]}>{this.state.userData.email}</Text>
                                    {/* <Text style={[styles.containerAT, { color: '#000000', }]}> Jason</Text> */}
                                </View>
                            </View>
                            <View style={styles.containerBb}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: wp('5%') }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.containerAT, { color: '#606060' }]}>Classes</Text>
                                        {/* <Text style={[styles.containerAT, { color: '#000000' }]}> History</Text> */}
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.containerAT, { color: '#606060' }]}>Points: </Text>
                                        <Text style={[styles.containerAT, { color: '#000000' }]}>{this.state.points}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {this.state.appointments ? this.state.appointments.map((data) => {
                        return(
                            <View key={data.id}>
                                <View style={[styles.containerA,]}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: wp('5%') }}>
                                        <Text style={[styles.containerAT, { fontSize: wp('3%') }]}>{data.activity_name}</Text>
                                        <Text style={[styles.containerAT, { fontSize: wp('3%') }]}>{data.address}</Text>
                                    </View>
                                </View>
                                <View style={styles.containerBb}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: wp('5%') }}>
                                        <Text style={[styles.containerAT, { color: '#606060' }]}>{data.app_date == '0000-00-00'?data.created:data.app_date}</Text>
                                        <Text style={[styles.containerAT, { color: '#000000' }]}>{data.time_detail}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }):''}
                    
                    {/* <View style={[styles.containerA,]}>
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
                    </View> */}
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