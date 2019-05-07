import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Image, ScrollView, AsyncStorage, TouchableHighlight, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
import Rest from './class/restapi';
import Constants from './constants';
export default class reward extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            points: 0,
            userData: {},
            textData: ''
        };
    }
    closeOrderScreen() {
        this.setState({ isModalVisible: false });
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
                    let res = Rest.get(Constants.API_URL + 'object=appointment&action=getMyClasses&user_id=' +dt.id);
                    res.then(res => {
                        if (res.status == 'success') {

                            var text;
                            if (parseInt(res.result[0].points) >= 10) {
                                text = '\n Congratulations ! You have got '+res.result[0].points+' points.Now you have chance to redeem rewards.\n \n Click on continue to redeem.';
                            } else if(parseInt(res.result[0].points) == 0) {
                                text = '\n Sorry! No rewards in your account !!';
                            }else{
                                text = '\n Congratulations ! You have got '+res.result[0].points+' points.To get rewards you need to get minimum 10 points.';  
                            }
                            this.setState({ points: res.result[0].points, textData: text });
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
    redeemGift(){
        this.setState({isModalVisible:false});
        this.props.navigation.navigate('rewardActivity',{'points':this.state.points});
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor: '#fff', width: wp('100%'), height: hp('100%') }}>
                <StatusBar backgroundColor="#282828" barStyle="light-content" />
                <View style={styles.container}>
                    <View style={{ width: wp('100%'), height: hp('23 %'), backgroundcolor: '' }}>
                        <Image source={require('./img/reward1.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="cover" />
                    </View>
                    <Linericon name="left-arrow-1" size={wp('7.5%')} color='#fff' style={{ position: 'absolute', top: 0, left: 0, margin: wp('3%') }} onPress={() => navigate('home')} />
                </View>
                <ScrollView >

                    <View style={{ marginTop: wp('3%') }}>
                        <View style={{ marginLeft: wp('4%'), }}>
                            <Text style={styles.headerText}>How it works</Text>
                        </View>
                        <View style={[styles.textContainer]}>
                            <Text style={styles.textP}>
                                Every Tiny Tennis purchase will earn your little one 1 reward point. Every 10 points earned they will receive a 15 minute tiny Drop In class or you can bundle the minutes and take a Tiny Private, Tiny Group or Mommy & Me class. All you need to do is sign up at checkout by entering your phone number.
                        </Text>
                        </View>
                    </View>
                    <View style={{ marginTop: wp('3%') }}>
                        <View style={{ marginLeft: wp('4%'), }}>
                            <Text style={styles.headerText}>Keeping track</Text>
                        </View>
                        <View style={[styles.textContainer]}>
                            <Text style={styles.textP}>
                                Whenever you make a purchase we will text you a link with your available points.
                                </Text>
                        </View>
                    </View>
                    <View style={{ marginTop: wp('3%') }}>
                        <View style={{ marginLeft: wp('4%'), }}>
                            <Text style={styles.headerText}>Redemption</Text>
                        </View>
                        <View style={[styles.textContainer]}>
                            <Text style={styles.textP}>
                                To redeem your rewards we will send you an alert notifying you that you have earned enough points to claim your reward. To claim rewards just enter your phone or redemption code at check out...it’s a Tiny process.
                                </Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center', margin: wp('4%'), marginBottom: wp('10%') }}>
                        <Button
                            buttonStyle={[styles.buttonstyle, {}]}
                            title='REDEEM'
                            titleStyle={styles.buttonText}
                            onPress={() => this.setState({ isModalVisible: true })}
                        />
                    </View>
                </ScrollView>
                <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState({ isModalVisible: false })}>
                    <View style={styles.modalContent}>
                        <View style={stylesTitle.container}>
                            <TouchableHighlight
                                style={stylesTitle.closeButton}
                                underlayColor="#FFFFFF"
                                onPress={() => this.closeOrderScreen()}
                            >
                                <Image
                                    style={stylesTitle.button}
                                    source={require('./images/btnClose.png')}
                                />
                            </TouchableHighlight>
                            <Text style={stylesTitle.title}>Information</Text>
                        </View>
                        <View style={styles.bodyContent}>
                            <Text style={styles.textP}>Dear {this.state.userData.user_name },</Text>
                            <Text style={styles.textP}>{this.state.textData}</Text>
                        </View>
                        {parseInt(this.state.points) >= 10?<View style={styles.buttonRow}>
                            <TouchableOpacity  
                                onPress={() => this.redeemGift()}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText1}>Continue</Text>
                            </TouchableOpacity>
                        </View>:null}
                        
                    </View>
                </Modal>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    buttonText1: {
        color: '#fff',
        fontFamily: fontSemiBold,
        fontSize: wp('4%'),
    },
    headerText: {
        fontSize: wp('5%'),
        color: '#000000',
        fontFamily: fontSemiBold,

    },
    buttonRow:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp('8%'),
        width: '100%',
    },
    button:{
        alignItems: 'center',
        backgroundColor: '#1AB31A',
        borderRadius: 32,
        justifyContent: 'center',
        minHeight: 50,
        width: '40%',
        flexDirection:'row',
    },
    bodyContent: {
        margin: wp('8%'),
    },
    modalContent: {
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 10,
        borderRadius: 10,
        flex: 0,
        flexShrink: 1,
        justifyContent: 'flex-start',
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
    textContainer: {
        marginLeft: wp('4%'), marginRight: wp('4%'),
        marginTop: wp('1%'),
        borderColor: '#D5D5D5',
        borderWidth: wp('0.4%'), padding: wp('4.5%')
    },
    textP: {
        fontSize: wp('4%'),
        fontFamily: fontReg,
        lineHeight: hp('3%')
    },
    buttonstyle: {
        padding: 1,
        width: wp('50%'),
        height: hp('6%'),
        borderWidth: wp('0.5'),
        borderColor: '#000000',
        backgroundColor: '#fff',
        borderRadius: 24,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#000000',
        fontFamily: fontSemiBold
    },
});
const stylesTitle = StyleSheet.create({
    closeButton: {
        zIndex: 1,
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',

    },
    title: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
        zIndex: 0,
        fontFamily: fontBold
    },
})
