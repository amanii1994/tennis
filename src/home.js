/*
Copyright 2019 Square Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal';
import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions, TouchableHighlight, Text, TouchableWithoutFeedback, Platform, Keyboard, Image, AsyncStorage } from 'react-native';
import StatusBar from './statusBar';
import { Button, Card, ListItem } from 'react-native-elements';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
//import AppIntroSlider from 'react-native-app-intro-slider';
import icoMoonConfig from '../selection.json';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { DrawerActions } from 'react-navigation';
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
import Constants from './constants';
const imgUrl = Constants.IMAGE_URL;
import Restapi from './class/restapi';
const apiUrl = Constants.API_URL;
export default class home extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            showorderImg: true,
            cardImg: 1,
            activities: {},
            timePassed: false
        };
        this._scrollOpt = this._scrollOpt.bind(this);
        this._loadData();
    }
    _scrollOpt(card, img) {
        this.setState({ cardImg: img });
        let p = this.state[card];
        this.listView.scrollTo({ y: p })
    }
    _setLayout(key, y) {
        let p = 'card' + key;
        this.setState({ [p]: y });
    }
    _loadData = () => {
        AsyncStorage.getItem("appData").then((info) => {
            if (info) {
                let dt = JSON.parse(info);
                console.log(dt);
                this.setState({ activities: dt.activities });
            } 
        });
    }
    componentWillMount() {
        OneSignal.init('10656e00-5c7b-4408-856e-a700f3f190e9');
        OneSignal.addEventListener('received', this.onReceived.bind(this));
        OneSignal.addEventListener('opened', this.onOpened.bind(this));
        OneSignal.addEventListener('ids', this.onIds.bind(this));
        OneSignal.configure();
        OneSignal.enableVibrate(true);
        OneSignal.enableSound(true);
        OneSignal.inFocusDisplaying(2);
    }
    onReceived(notification) {
        console.log("Notification received: ", notification);
    }
    onOpened(openResult) {
        //this.props.navigation.navigate('Message');
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }
    onIds(device) {
        console.log('Device info: ', device);
        AsyncStorage.getItem("authData").then((info) => {
            if (info) {
                let dt = JSON.parse(info);
                let resData = Restapi.post(Constants.API_URL + 'object=user&action=setPlayerId',{'user_id':dt.id,'player_id' : device.userId});
            }
        }).done();
    }
    renderCards() {
        let cards = [];
        if (this.state.activities) {
            for (let i = 0; i < this.state.activities.length; i++) {
                let val = this.state.activities[i];
                let key = i;
                cards.push(
                    <Card
                        key={key}
                        onLayout={(event) => this._setLayout(i, event.nativeEvent.layout.y)}
                        containerStyle={styles.cardBox}
                        imageStyle={{
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            overflow: 'hidden', // This does the magic
                        }}
                        image={{ uri: imgUrl + val.image }} >
                        <Text style={styles.headerText1}>{val.activity_name}</Text>
                        <Text style={styles.textP}>
                            {val.tagline}
                        </Text>
                        <Button
                            onPress={() => this.props.navigation.navigate(val.slug, {
                                itemId: i
                            })}
                            buttonStyle={[styles.buttonstyle,]}
                            title="Let's Play"
                            titleStyle={styles.buttonText}
                        />
                    </Card>
                );
            }
        }
        return cards;
    }
    componentDidMount() {
        this._isMounted = true;
       
    }
    componentWillUnmount() {
        this._isMounted = false;
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }
    
    render() {
        
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor: '#fff', width: '100%', height: '100%', paddingBottom: hp('3%') }} >
                <StatusBar backgroundColor="#282828" barStyle="light-content" />
                <View style={[styles.container, { marginBottom: wp('3%') }]}>
                    <Linericon name="Group-102" size={wp('7.5%')} color="black" style={{ flex: 1, justifyContent: 'flex-start', alignSelf: 'center', marginLeft: wp('3%'), }} onPress={() => this.props.navigation.toggleDrawer()} />
                    <View style={{ flex: 6, justifyContent: 'center' }}><Text style={styles.headerText}></Text></View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', height: hp('10%') }}>
                    <TouchableOpacity
                        style={{ alignItems: 'flex-start', paddingTop: 30, paddingLeft: 10, paddingRight: 10, marginLeft: wp('1%'), marginRight: wp('1%') }}
                        onPress={this.leftArrow}
                    >
                        {/* <Image source={require('./img/back1.png')} /> */}
                    </TouchableOpacity>
                    <ScrollView horizontal={true} style={{ alignSelf: 'center', height: hp('10%') }}  >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }} >
                            <TouchableOpacity onPress={() => this._scrollOpt('card0', 1)}>
                                <View style={styles.buttonBox}>
                                    <Image source={this.state.cardImg == 1 ? require('./img/location.png') : require('./img/3.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode="cover" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._scrollOpt('card1', 2)}>
                                <View style={styles.buttonBox}>
                                    <Image source={this.state.cardImg == 2 ? require('./img/g2.png') : require('./img/1.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode="cover" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._scrollOpt('card2', 3)}>
                                <View style={styles.buttonBox}>
                                    <Image source={this.state.cardImg == 3 ? require('./img/family.png') : require('./img/2.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode="cover" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._scrollOpt('card3', 4)}>
                                <View style={styles.buttonBox}>
                                    <Image source={this.state.cardImg == 4 ? require('./img/h2.png') : require('./img/5.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode="cover" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._scrollOpt('card4', 5)}>
                                <View style={styles.buttonBox}>
                                    <Image source={this.state.cardImg == 5 ? require('./img/birthday.png') : require('./img/4.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode="cover" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._scrollOpt('card5', 6)}>
                                <View style={styles.buttonBox}>
                                    <Image source={this.state.cardImg == 6 ? require('./img/Team.png') : require('./img/6.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode="cover" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._scrollOpt('card6', 7)}>
                                <View style={styles.buttonBox}>
                                    <Image source={this.state.cardImg == 7 ? require('./img/camp.png') : require('./img/7.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode="cover" />
                                </View>
                            </TouchableOpacity>
                            {/* <View><Image source={require('./img/back.png')} /></View> */}
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        style={{ alignItems: 'flex-end', paddingTop: 30, paddingLeft: 10, paddingRight: 10, marginLeft: wp('1%'), marginRight: wp('1%') }}
                        onPress={this.rightArrow}>
                        {/* <Image source={require('./img/back.png')} /> */}
                    </TouchableOpacity>
                </View>
                <ScrollView ref={ref => this.listView = ref} style={{ paddingBottom: hp('5%') }}>
                    <View style={{ flexDirection: 'row', marginLeft: wp('4%'), marginTop: wp('3%') }}>
                        <Text style={styles.headerText}>Tiny Tennis</Text>
                    </View>
                    <View style={[{ marginLeft: wp('4%'), marginRight: wp('3%') }]}>
                        <Text style={styles.textP}>An affordable age appropriate tennis experience, inducing fun, cool music, sports science and technology.</Text>
                    </View>
                    {this.renderCards()}
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: hp('2%'),
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    containerA:
    {
        ...Platform.select({
            ios: {
                width: wp('96%'), height: hp('52%'),
                alignSelf: 'center',
                flexDirection: 'column',
                overflow: 'hidden',
                marginTop: wp('3%'),
                borderRadius: wp('4%'),
                borderWidth: wp('0.5%'),
                borderColor: '#828282',
                shadowColor: '#828282',
                shadowOffset: {
                    width: 0,
                    height: 1
                },
            },
            android: {
                width: wp('96%'), height: hp('52%'),
                alignSelf: 'center',
                flexDirection: 'column',
                // overflow:'hidden',
                marginTop: wp('3%'),
                borderRadius: wp('2%'),
                borderWidth: wp('0.5%'),
                borderColor: '#828282',
                shadowColor: '#828282',
                shadowOffset: {
                    width: 0,
                    height: 1
                },
            }
        }),
    },
    headerText: {
        fontSize: wp('6%'),
        color: '#000000',
        fontFamily: fontSemiBold,
        alignSelf: 'center',
    },
    headerText1: {
        fontSize: wp('4%'),
        color: '#000000',
        fontFamily: fontBold,
    },
    textP: {
        color: '#000000',
        fontFamily: fontReg,
        fontSize: wp('3.5%'),
    },
    buttonstyle: {
        marginTop: hp('2%'),
        padding: 1,
        width: wp('40%'),
        height: hp('6%'),
        backgroundColor: '#fff',
        borderRadius: 24,
        borderWidth: wp('0.5'),
        borderColor: '#000000',
        alignSelf: 'center'
    },
    buttonText: {
        color: '#000000',
        fontFamily: fontSemiBold,
    },
    cardBox: {
        borderRadius: 10,
    },
    buttonBox: {
        width: wp('15%'),
        height: wp('15%'),
        marginLeft: wp('2%'),
        alignSelf: 'center',
    }
})