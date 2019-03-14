import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, ScrollView,TouchableOpacity, Platform, Image, Keyboard } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';
import StatusBar from './statusBar';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
// import { ScrollView } from 'react-native-gesture-handler';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
export default class termC extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            
                <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
                    <StatusBar backgroundColor="#282828" barStyle="light-content" />
                    <View style={styles.container}>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: wp('3%'), }} onPress={() => navigate('home')}><Linericon name="left-arrow-1" size={wp('5%')} color='#000000' /></TouchableOpacity>
                        <View style={{ flex: 6, justifyContent: 'center' }}><Text style={[styles.headerText, { alignSelf: 'center', fontSize: wp('5'),marginRight:wp('3%'),fontFamily: fontMed }]}>Terms & Conditions</Text></View>
                    </View>
                    <ScrollView >
                        <View style={[styles.textContainer]}>
                            <Text style={[styles.textP]}>
                                The [Tiny Tennis] app stores and processes personal data that you have provided to us,
                                in order to provide my Service. It’s your responsibility to keep your phone and access to the app secure.
                                We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device.
                                It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the [Tiny Tennis] app won’t work properly or at all.
                               </Text>
                        </View>
                        <View style={[styles.textContainer]}>
                            <Text style={styles.textP}>
                                You should be aware that there are certain things that Desislava Joyner will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi, or provided by your mobile network provider, but Desislava Joyner cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left.
                               </Text>
                        </View>
                        <View style={[styles.textContainer]}>
                            <Text style={styles.textP}>
                                If you’re using the app outside of an area with Wi-Fi, you should remember that your terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app.
                               </Text>
                        </View>
                        <View style={[styles.textContainer]}>
                            <Text style={styles.textP}>
                                Along the same lines, Desislava Joyner cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged – if it runs out of battery and you can’t turn it on to avail the Service, Desislava Joyner cannot accept responsibility.
                               </Text>
                        </View>
                        <View style={[styles.textContainer]}>
                            <Text style={styles.textP}>
                                With respect to Desislava Joyner ’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavour to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. Desislava Joyner accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app.
                               </Text>
                        </View>
                        <View style={[styles.textContainer]}>
                            <Text style={styles.textP}>
                                At some point, we may wish to update the app. The app is currently available on Android & iOS – the requirements for both systems(and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. Desislava Joyner does not promise that it will always update the app so that it is relevant to you and/or works with the Android & iOS version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.
                            </Text>
                        </View>
                        <View style={[styles.textContainer]}>
                            <Text style={styles.textP}>
                                At some point, we may wish to update the app. The app is currently available on Android & iOS – the requirements for both systems(and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. Desislava Joyner does not promise that it will always update the app so that it is relevant to you and/or works with the Android & iOS version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.
                            </Text>
                        </View>
                        <View style={{ marginTop: wp('3%'),marginLeft:wp('4%')}}>
                                <Text style={styles.headerText}>Changes to This Terms and Conditions</Text>
                        </View>
                        <View style={[styles.textContainer,{ marginTop: wp('1.5%') }]}>
                            <Text style={styles.textP}>
                            I may update our Terms and Conditions from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Terms and Conditions on this page. These changes are effective immediately after they are posted on this page.
                            </Text>
                        </View>
                        <View style={{ marginTop: wp('3%'),marginLeft:wp('4%') }}>
                                <Text style={styles.headerText}>Contact Us</Text>
                        </View>
                        <View style={[styles.textContainer,{ marginTop: wp('1.5%') }]}>
                            <Text style={styles.textP}>
                            I may update our Terms and Conditions from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Terms and Conditions on this page. These changes are effective immediately after they are posted on this page.
                            </Text>
                        </View>
                        <View style={{ marginLeft: wp('4%'),flexDirection:'row', marginBottom:wp('10%') }}>
                                <Text style={styles.textP}>Contact Us: </Text>
                                <Text style={[styles.headerText,{fontSize:wp('4%')}]}>Admin@tiny10s.com</Text>
                        </View>
                    </ScrollView>
                </View>
            
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
    },
    textContainer: {
        marginLeft: wp('4%'), marginRight: wp('4%'),
        marginTop: wp('3%'),
        borderColor: '#D5D5D5',
    },
    textP: {
        fontSize: wp('4%'),
        fontFamily: fontReg,
        
    },
})