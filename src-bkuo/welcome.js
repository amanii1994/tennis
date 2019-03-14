import React, { Component } from 'react';
import { StyleSheet, View, Platform ,Text, Image, TouchableOpacity } from 'react-native';
import StatusBar from './statusBar';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
export default class welcome extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{ backgroundColor: '#008ED6', width: '100%', height: '100%',flex:1 }}>
                <StatusBar backgroundColor="#282828" barStyle="light-content" />
                <View style={styles.container}>
                    <Text style={[styles.headerText] }>Tennis for the little one’s</Text>
                </View>
                <View>
                    <Text style={styles.textStyle}>
                        An age appropriate tennis experience
                        using technology, sports science and
                        extreme fun at an affordable price.
                    </Text>
                </View>
                <View style={styles.logo}>
                    <Image source={require('./img/logo.png')}/>
                </View>
                <View style={{flex:1, justifyContent:"flex-end", marginBottom:wp('15%')}}>
                <TouchableOpacity  
                // onPress={() => navigate('login')} 
                // onPress={()=>navigate('activity')}
                // onPress={()=>navigate('dropin')}
                onPress={()=>navigate('home')}
                >
                <View  style={styles.bottomContainer}>
                    <View style={{alignSelf:'center',marginLeft:wp('8%')}}>
                    <Image source={require('./img/smile.png')} />
                    </View>
                    <View style={{flexDirection:'column', alignSelf:'center', marginLeft:wp('6%')}}>
                        <Text style={{fontFamily:fontBold,fontSize: wp('5%'),}}>Have a nice play!!!</Text>
                        <Text style={{fontFamily:'HardSports'}}>Sign in or create an account</Text>
                    </View>
                    </View>
                </TouchableOpacity> 
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    logo1:{
        margin:hp('2%'),
    },
    container: {
        marginTop: hp('8%'),
        marginBottom: hp('2%'),
    },
    headerText: {
        marginLeft:wp('12%'),
        marginRight:wp('12%'),
        fontSize: wp('9%'),
        color: '#fff',
        fontWeight:'600',
        textAlign: 'center',
        fontFamily:fontSemiBold
    },
    textStyle: {
        marginLeft:wp('9%'),
        marginRight:wp('9%'),
        fontSize: wp('4.5%'),
        color: '#fff',
        lineHeight:hp('4%'),
        textAlign: 'center',
        fontFamily:fontReg
    },
    logo:{
        marginTop:hp('6%'),
        alignSelf: 'center',
    },
    bottomContainer:{
        width:wp('95%'),
        height:wp('22%'),
        backgroundColor:'#fff',
        alignSelf: 'center',
        borderRadius:wp('2%'),
        flexDirection:'row',
    }
});
