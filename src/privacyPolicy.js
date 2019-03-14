import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Platform, Image, Keyboard } from 'react-native';
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
export default class privacyPolicy extends Component {
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
                    <View style={{ flex: 6, justifyContent: 'center' }}><Text style={[styles.headerText, { alignSelf: 'center', fontSize: wp('5'),marginRight:wp('3%'),fontFamily: fontMed }]}>Privacy Policy</Text></View>
                </View>
                <ScrollView >
                    <View style={[styles.textContainer]}>
                        <Text style={styles.textP}>
                            Desislava Joyner built the [Tiny Tennis] app as a Free app. This SERVICE is provided by Desislava Joyner at no cost and is intended for use as is. This page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service. your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the [Tiny Tennis] app won’t work properly or at all.
                        </Text>
                    </View>
                    <View style={[styles.textContainer]}>
                        <Text style={styles.textP}>
                            If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy.
                        </Text>
                    </View>
                    <View style={[styles.textContainer]}>
                        <Text style={styles.textP}>
                            The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at [Tiny Tennis] unless otherwise defined in this Privacy Policy. Information Collection and Use
                            For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information. The information that I request will be retained on your device and is not collected by me in any way.
                        </Text>
                    </View>
                    <View style={[styles.textContainer]}>
                        <Text style={styles.textP}>
                            The app does use third party services that may collect information used to identify you.
                            Link to privacy policy of third party service providers used by the app
                        </Text>
                    </View>
                    <View style={[styles.textContainer, { marginLeft: wp('6%'), flexDirection: 'row' }]}>
                        <View style={styles.imgContainer}>
                            <Image source={require('./img/check-mark.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="cover" />
                        </View>
                        <Text style={[styles.textP,]}>
                            Google Play Services
                        </Text>
                    </View>
                    <View style={{ marginTop: wp('3%'), marginLeft: wp('4%') }}>
                        <Text style={styles.headerText}>Log Data</Text>
                    </View>
                    <View style={[styles.textContainer, { marginTop: wp('1.5%') }]}>
                        <Text style={styles.textP}>
                            I want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics.
                            </Text>
                    </View>
                    <View style={{ marginTop: wp('3%'), marginLeft: wp('4%') }}>
                        <Text style={styles.headerText}>Cookies</Text>
                    </View>
                    <View style={[styles.textContainer, { marginTop: wp('1.5%') }]}>
                        <Text style={styles.textP}>
                            Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.
                            This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.
                            </Text>
                    </View>
                    <View style={{ marginTop: wp('3%'), marginLeft: wp('4%') }}>
                        <Text style={styles.headerText}>Service Providers</Text>
                    </View>
                    <View style={[styles.textContainer, { marginTop: wp('1.5%') }]}>
                        <Text style={styles.textP}>
                            I may employ third-party companies and individuals due to the following reasons:
                             </Text>
                    </View>
                    <View style={{ marginLeft: wp('6%'), flexDirection: 'column' }}>
                        <View style={[styles.textContainer, { flexDirection: 'row' }]}>
                            <View style={styles.imgContainer}>
                                <Image source={require('./img/check-mark.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="cover" />
                            </View>
                            <Text style={[styles.textP,]}>
                                To facilitate our Service;
                        </Text>
                        </View>
                        <View style={[styles.textContainer, { flexDirection: 'row' }]}>
                            <View style={styles.imgContainer}>
                                <Image source={require('./img/check-mark.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="cover" />
                            </View>
                            <Text style={[styles.textP,]}>
                                To provide the Service on our behalf;
                        </Text>
                        </View>
                        <View style={[styles.textContainer, { flexDirection: 'row' }]}>
                            <View style={styles.imgContainer}>
                                <Image source={require('./img/check-mark.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="cover" />
                            </View>
                            <Text style={[styles.textP,]}>
                                To perform Service-related services; or
                        </Text>
                        </View>
                        <View style={[styles.textContainer, { flexDirection: 'row' }]}>
                            <View style={styles.imgContainer}>
                                <Image source={require('./img/check-mark.png')} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="cover" />
                            </View>
                            <Text style={[styles.textP,]}>
                                To assist us in analyzing how our Service is used.
                        </Text>
                        </View>
                    </View>
                    <View style={[styles.textContainer]}>
                        <Text style={styles.textP}>
                        I want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
                        </Text>
                    </View>
                    <View style={{ marginTop: wp('3%'), marginLeft: wp('4%') }}>
                        <Text style={styles.headerText}>Security</Text>
                    </View>
                    <View style={[styles.textContainer, { marginTop: wp('1.5%') }]}>
                        <Text style={styles.textP}>
                        I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.
                      </Text>
                    </View>
                    <View style={{ marginTop: wp('3%'), marginLeft: wp('4%') }}>
                        <Text style={styles.headerText}>Links to Other Sites</Text>
                    </View>
                    <View style={[styles.textContainer, { marginTop: wp('1.5%') }]}>
                        <Text style={styles.textP}>
                        This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or
                      </Text>
                    </View>
                    <View style={{ marginTop: wp('3%'), marginLeft: wp('4%') }}>
                        <Text style={styles.headerText}>Children’s Privacy</Text>
                    </View>
                    <View style={[styles.textContainer, { marginTop: wp('1.5%') }]}>
                        <Text style={styles.textP}>
                        These Services do not address anyone under the age of 13. I do not knowingly collect personally identifiable information from children under 13. In the case I discover that a child under 13 has provided me with personal information, I immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me so that I will be able to do necessary actions.
                     </Text>
                    </View>
                    <View style={{ marginTop: wp('3%'), marginLeft: wp('4%') }}>
                        <Text style={styles.headerText}>Changes to This Privacy Policy</Text>
                    </View>
                    <View style={[styles.textContainer, { marginTop: wp('1.5%') }]}>
                        <Text style={styles.textP}>
                        I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.
                     </Text>
                    </View>
                    <View style={{ marginTop: wp('3%'), marginLeft: wp('4%') }}>
                        <Text style={styles.headerText}>Security</Text>
                    </View>
                    <View style={[styles.textContainer, { marginTop: wp('1.5%') }]}>
                        <Text style={styles.textP}>
                        If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me.
                     </Text>
                    </View>
                    <Text style={[styles.headerText,{marginLeft:wp('4%'),fontSize: wp('4%'),marginBottom:wp('10%')}]}>Admin@tiny10s.com</Text>
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
        marginLeft: wp('4%'), marginRight: wp('3%'),
        marginTop: wp('3%'),
        borderColor: '#D5D5D5',
    },
    imgContainer: {
        width: wp('3.5%'), height: wp('3.5%'), marginRight: wp('1%')
    },
    textP: {
        fontSize: wp('4%'),
        fontFamily: fontReg,
    },
})