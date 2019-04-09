import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Image, Alert,AsyncStorage,TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
import { Button, Card } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import Rest from './class/restapi';
import Loader from './loader';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';

export default class dropinA extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
            location:[],
            selectedLoc: '',
            loading:false
        };
    }
    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            AsyncStorage.getItem("appData").then((info) => {
                if (info) {
                    let dt = JSON.parse(info);
                    let p = [];
                    dt.location.map((data) => {
                        p.push({label:data.address,value:data.id});
                    })
                    this.setState({ location: p,selectedLoc: p[0].value});
                }
            });
        }
    }
    checkout(){
        this.setState({loading:true});
        let activity_id = this.props.navigation.getParam('activity_id');
        let quantity = this.props.navigation.getParam('quantity');
        let product_id = this.props.navigation.getParam('product_id');
        let price = this.props.navigation.getParam('price');
        // Rest.getCurrentUser('authData').then((uData)=>{
        //     if(uData!=null)
        //     this.data = {
        //          'user_id' : uData.id,
        //          'activity_id' : activity_id,
        //          'quantity' : quantity,
        //          'product_id' : product_id,
        //          'price' : price,
        //          'app_date' : moment(this.state.selectedDate).format('YYYY-MM-DD'),
        //          'location_id' : this.state.selectedLoc,
        //      };
        //      let p = Rest.saveAppoint(this.data);  
        //      p.then((data)=>{
        //         Alert.alert(data.msg);
        //         this.props.navigation.navigate('home');
        //      }).then(this.setState({loading: false}));
        // }) 
        this.props.navigation.navigate('check1');
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    _updateWeek(val){
        if(this.state.selectedDate > val){
            this.setState({selectedDate:moment(this.state.selectedDate).add(-7, 'days')});
        }else{
            this.setState({selectedDate:moment(this.state.selectedDate).add(7, 'days')});
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ backgroundColor: '#fff', flex: 1 }}>
                    <StatusBar backgroundColor="#282828" barStyle="light-content" />
                    <Loader
                        loading={this.state.loading} />
                    <View style={styles.container}>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: wp('3%'), }} onPress={() => navigate('dropin')}><Linericon name="left-arrow-1" size={wp('4.5%')} color='#000000' /></TouchableOpacity>
                        <View style={{ flex: 6, justifyContent: 'center' }}><Text style={[styles.headerText, { fontSize: wp('5'),fontFamily:fontMed }]}>Calendar</Text></View>
                    </View>
                    <View style={{ width: wp('60%'), marginLeft: wp('1%') }}>
                        <Dropdown
                            itemTextStyle={{fontFamily:fontBold}}
                            inputContainerStyle={{ borderBottomColor: 'transparent' }}
                            fontFamily={fontBold}
                            dropdownPosition={0}
                            label=''
                            data={this.state.location}
                            value={this.state.selectedLoc}
                            baseColor ={'#000'}
                            onChangeText={(value)=>{ this.setState({selectedLoc:value})}}
                        />
                    </View>
                    <ScrollView>
                        <View style={{ paddingTop: 20, backgroundColor: '#fff', }}>
                            <CalendarStrip
                             calendarAnimation={{ type: 'sequence', duration: 30 }}
                             daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: '#CBCBCB' }}
                             style={{ height:100, backgroundColor: '#F7F7F7' }}
                             calendarHeaderStyle={{ color: 'black' }}
                             dateNumberStyle={{ color: 'black' }}
                             dateNameStyle={{ color: 'black' }}
                             highlightDateNumberStyle={{ color: 'green' }}
                             highlightDateNameStyle={{ color: 'green' }}
                             disabledDateNameStyle={{ color: 'grey' }}
                             disabledDateNumberStyle={{ color: 'grey' }}
                             onWeekChanged = { (value)=>this._updateWeek(value)}
                             updateWeek={false}
                             selectedDate={this.state.selectedDate}
                             iconContainer={{ flex: 0.1 }}
                            />
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <Button
                                buttonStyle={[styles.buttonstyle, { backgroundColor: '#1AB31A' }]}
                                title='CHECKOUT'
                                color='#fff'
                                titleStyle={styles.buttonText}
                                onPress={()=> this.checkout()}
                            />
                        </View>

                    </ScrollView>
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
        backgroundColor: '#000000',
        flexDirection: 'row',
        marginLeft: wp('2%')
    },
    containerBa: {
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row',
        marginLeft: wp('4%'),
        marginRight: wp('4%'),
        justifyContent: 'space-around',
    },
    containerBb: {
        alignSelf: 'center',
        marginRight: wp('5%')
    },
    touchText: {
        color: "#fff",
        fontSize: wp('4%'),
        alignSelf: 'center',
        fontFamily: fontSemiBold
    },
    textP: {
        fontSize: wp('4%'),
        fontFamily: fontReg
    },
    containerCD:
    {
        flexDirection: 'column',
        height: hp('18%'),
        width: wp('98%'), borderRadius: wp('2%'),
        marginTop: wp('5%'),
        marginBottom: wp('5%'),
        borderRadius: wp('2%'),
        borderWidth: wp('0.5%'),
        borderColor: '#828282',
        shadowColor: '#828282',
        shadowOpacity: .5,
        shadowRadius: wp('2%'),
        alignSelf: 'center',
        shadowOffset: {
            width: 0,
            height: 1
        },
    },
    containerCDa: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: wp('2%')
    },

    containerCDb:
    {
        flex: 1, height: undefined,
        width: undefined,
        borderRadius: wp('9%'), margin: wp('1%')
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
