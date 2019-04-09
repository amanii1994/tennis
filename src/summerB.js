import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Image, Alert,TouchableOpacity, AsyncStorage,Keyboard, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
import { Dropdown } from 'react-native-material-dropdown';
import Rest from './class/restapi';
import CalendarStrip from 'react-native-calendar-strip';
import { Button } from 'react-native-elements';
import moment from 'moment';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
export default class summerB extends Component {
        _isMounted = false;
        constructor(props) {
            super(props);
            this.state = {
                selectedDate: new Date(),
                location: [],
                selectedLoc: '',
                selectedLabel:'',
                userData:{}
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
                        this.setState({ location: p, selectedLoc: p[0].value, selectedLabel: p[0].label });
                    }
                });
                Rest.getCurrentUser('authData').then((uData)=>{
                    if(uData!=null)
                    this.setState({ userData: uData});
                });
            }
        }
        componentWillUnmount() {
            this._isMounted = false;
        }
        goNext(){
            let activity_id = this.props.navigation.getParam('activity_id');
            let quantity = this.props.navigation.getParam('quantity');
            let price = this.props.navigation.getParam('price');
            let product_id = this.props.navigation.getParam('product_id');
                Rest.getCurrentUser('authData').then((uData)=>{
                    if(uData!=null)
                    this.itemdata = {
                         'user_id' : uData.id,
                         'activity_id' : activity_id,
                         'quantity' : quantity,
                         'product_id' : product_id,
                         'price' : price,
                         'app_date' : moment(this.state.selectedDate).format('YYYY-MM-DD'),
                         'location_id' : this.state.selectedLoc,
                         'loc_name' : this.state.selectedLabel,
                     };
                     this.props.navigation.navigate('summerC',{itemData:this.itemdata});
                }) 
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
                <View style={{ backgroundColor: '#fff', width: '100%', height: '100%', flex: 1 }}>
                    <StatusBar backgroundColor="#282828" barStyle="light-content" />
                    <View style={styles.container}>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: wp('3%'), }} onPress={() => navigate('summerA')}><Linericon name="left-arrow-1" size={wp('5%')} color='#000000' /></TouchableOpacity>
                        <View style={{ flex: 6, justifyContent: 'center' }}><Text style={[styles.headerText, { fontSize: wp('5'),fontFamily:fontMed }]}>Save a SPOT!</Text></View>
                    </View>
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
                        <View style={{ width: wp('90%'), marginLeft: wp('1%') ,alignSelf:'center'}}>
                            <Dropdown
                                itemTextStyle={{fontFamily:fontBold,}}
                                inputContainerStyle={{ borderBottomColor: 'transparent', }}
                                fontFamily={fontBold}
                                dropdownPosition={0}
                                data={this.state.location}
                                value={this.state.selectedLoc}
                                baseColor ={'#000'}
                                onChangeText={(value,index) => { this.setState({ selectedLoc: value , selectedLabel:this.state.location[index].label}) }}
                                />
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
                                <Text style={[styles.textcontainerC, { alignItems: 'flex-start' }]}> {this.state.userData.mobile}</Text>
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
                            title='NEXT'
                            color='#fff'
                            titleStyle={styles.buttonText}
                            onPress={()=> this.goNext()}
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
        fontFamily: fontMed
    },
    containerC:
    {
        width: wp('95%'),
        height: hp('6%'),
        borderWidth: wp('0.3%'),
        flexDirection: 'row',
        borderColor: '#000000',
        // justifyContent: 'space-around',
        borderRadius: wp('3%'),
        margin: wp('2%')
    },
    textcontainerC:{
        fontSize: wp('4%'),
        color: '#000000',
        fontFamily: fontReg,
        //alignSelf: 'center',
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
