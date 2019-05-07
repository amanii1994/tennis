import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, Platform, Image, Keyboard, AsyncStorage,Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBar from './statusBar';
import { Button } from 'react-native-elements';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../selection.json';
const Linericon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
import Constants from './constants';
const imgUrl = Constants.IMAGE_URL;
export default class dropin extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            activity: {},
            products: [],
            product_id:0,
            activity_id:'',
            price: '',
            quantity:1,
            time_detail:'',
        };
    }
    setActive(key,price,time) {
        this.setState({
            product_id: key,
            price: price,
            time_detail: time
        });
    }
    goNext(){
        if(this.state.quantity && this.state.price){
            this.props.navigation.navigate('dropinA', {
                activity_id: this.state.activity_id,
                activity_name: this.state.activity.activity_name,
                product_id: this.state.product_id,
                price: this.state.price,
                quantity: this.state.quantity,
                time_detail: this.state.time_detail,
                total_price: this.state.quantity * this.state.price,
            })
        }else{
            Alert.alert('Please select Price and duration!');
        }
    }
    incrementItem = () => {
        this.setState({ quantity: this.state.quantity + 1 });
    }
    decreaseItem = () => {
        if (this.state.quantity > 1) {
            this.setState({ quantity: this.state.quantity - 1 });
        }
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            AsyncStorage.getItem("appData").then((info) => {
                if (info) {
                    let dt = JSON.parse(info);
                    let itemId = this.props.navigation.getParam('itemId');
                    this.setState({ activity: dt.activities[itemId], activity_id:dt.activities[itemId].id,products: dt.activities[itemId].products  });
                }
            });
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
                    <StatusBar backgroundColor="#282828" barStyle="light-content" />
                    <View style={styles.container}>
                        {/* <Image source={require('./img/dropin.png')} />
                     */}
                        <View style={{ width: wp('100%'), height: hp('23 %'), backgroundcolor: '' }}>
                            <Image source={{ uri: imgUrl + this.state.activity.image }} style={{ flex: 1, height: undefined, width: undefined, }} resizeMode="cover" />
                        </View>
                        <Linericon name="left-arrow-1" size={wp('7.5%')} color='#000000' style={{ position: 'absolute', top: 0, left: 0, margin: wp('3%') }} onPress={() => navigate('home')} />
                    </View>
                    <View style={{ flexDirection: 'row', margin: wp('4%') }}>
                        <Text style={styles.headerText}>{this.state.activity.activity_name}</Text>
                        <View style={styles.containerB}>
                            <Text style={[styles.headerText, { fontFamily: fontSemiBold, color: '#fff', alignSelf: 'center', padding: wp('1%') }]}>Ages 4-8</Text>
                        </View>
                    </View>
                    <View style={[{ marginLeft: wp('4%'), marginRight: wp('3%') }]}>
                        <Text style={styles.textP}>{this.state.activity.description}</Text>
                    </View>
                    <View style={{ margin: wp('4%') }}>
                        <Text style={styles.headerText}>Let's Play</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {this.state.products ? this.state.products.map((data) => {
                            return (
                                <TouchableOpacity style={[styles.containerC, { backgroundColor: this.state.product_id == data.id ? '#1AB31A' : 'transparent', borderColor: this.state.product_id == data.id ? '#1AB31A' : '#000' }]} key={data.id} onPress={() => this.setActive(data.id,data.price,data.time_detail)}>
                                    <Text style={[styles.textP, { color: this.state.product_id == data.id ? '#fff' : '#000' }]}>{data.time_detail}</Text>
                                    <Text style={[styles.textP1, { color: this.state.product_id == data.id ? '#fff' : '#000' }]}>$ {data.price}</Text>
                                </TouchableOpacity>
                            )
                        }) : ''}
                    </View>
                    <View style={styles.containerD}>
                        <Text style={[styles.headerText, { justifyContent: 'flex-start', flex: 1 }]}>Quantity</Text>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <TouchableOpacity style={styles.containerDa} onPress={this.decreaseItem} >
                                    <Text style={{ alignSelf: 'center', fontSize: wp('5%') }}>-</Text>
                                </TouchableOpacity>
                                <Text style={[styles.textP]}>{this.state.quantity}</Text>
                                <TouchableOpacity style={styles.containerDa} onPress={this.incrementItem} >
                                    <Text style={{ alignSelf: 'center', fontSize: wp('5%') }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <Button
                            buttonStyle={[styles.buttonstyle, { backgroundColor: '#1AB31A' }]}
                            title='NEXT'
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
        position: 'relative'
    },
    containerB: {
        marginLeft: wp('2%'),
        width: wp('30%'),
        backgroundColor: '#1AB31A',
        borderRadius: wp('10%')
    },
    headerText: {
        fontSize: wp('4%'),
        fontFamily: fontBold,
        color: 'black',
    },
    containerC:
    {
        width: wp('45%'),
        height: hp('6%'),
        borderWidth: wp('0.5%'),
        flexDirection: 'row',
        borderColor: '#000000',
        justifyContent: 'space-around',
        borderRadius: wp('3%'),
        margin: wp('2%')
    },
    textP: {
        color: '#000000',
        fontFamily: fontReg,
        fontSize: wp('3.5%'),
        alignSelf: 'center'
    },
    textP1: {
        color: '#000000',
        fontFamily: fontBold,
        fontSize: wp('3.5%'),
        alignSelf: 'center'
    },
    containerD: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: wp('4%')
    },
    containerDa: {
        width: wp('8%'),
        height: wp('8%'),
        borderRadius: wp('4%'),
        borderWidth: wp('0.2%'),
        marginLeft: wp('2%'),
        marginRight: wp('2%'),
    },
    buttonstyle: {
        padding: 1,
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