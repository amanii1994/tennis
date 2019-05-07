import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions, NavigationEvents } from 'react-navigation';
import { ScrollView, TouchableOpacity, AsyncStorage, Text, StyleSheet,Linking, View, Image, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import restapi from './class/restapi';
import config from './config';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';
import email from 'react-native-email';
const fontReg = (Platform.OS === 'ios') ? 'Montserrat-Regular' : 'Montserrat-Regular';
const fontMed = (Platform.OS === 'ios') ? 'Montserrat-Medium' : 'Montserrat-Medium';
const fontSemiBold = (Platform.OS === 'ios') ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold';
const fontBold = (Platform.OS === 'ios') ? 'Montserrat-Bold' : 'Montserrat-Bold';
class SideMenu extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      error: '',
      showMenu: true
    }
  }
  customFacebookLogout = () => {
    var current_access_token = '';
    AccessToken.getCurrentAccessToken().then((data) => {
      current_access_token = data.accessToken.toString();
    }).then(() => {
      let logout =
        new GraphRequest(
          "me/permissions/",
          {
            accessToken: current_access_token,
            httpMethod: 'DELETE'
          },
          (error, result) => {
            if (error) {
              console.log('Error fetching data: ' + error.toString());
            } else {
              LoginManager.logOut();
            }
          });
      new GraphRequestManager().addRequest(logout).start();
    })
      .catch(error => {
        console.log(error)
      });
  }
  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null, error: null });
    } catch (error) {
      this.setState({
        error,
      });
    }
  };
  async _getCurrentUser() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo, error: null });
    } catch (error) {
      const errorMessage =
        error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
      this.setState({
        error: new Error(errorMessage),
      });
    }
  }
  async componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this._configureGoogleSignIn();
      await this._getCurrentUser();
    }
    AsyncStorage.getItem("userType").then((info) => {
      if (info) {
        if (info != 'guest') {
          this.setState({ showMenu: true });
        } else {
          this.setState({ showMenu: false });
        }
      }
    });
  }
  _configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: (Platform.OS === 'ios') ? config.webClientIdIos : config.webClientId,
      offlineAccess: false,
    });
  }
  _logout() {
    AsyncStorage.getItem("userType").then((info) => {
      if (info) {
        if (info != 'guest') {
          AsyncStorage.getItem("authData").then((info) => {
            if (info) {
              let dt = JSON.parse(info);
              console.log(dt);
              if (dt.type == 'google') {
                this._signOut();
              } else if (dt.type == 'facebook') {
                this.customFacebookLogout();
              }
              AsyncStorage.clear();
              this.props.navigation.navigate('Auth');
            }
          });
        } else {
          AsyncStorage.clear();
          this.props.navigation.navigate('Auth');
        }
      }
    }).done();

  }
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }
  handleEmail = () => {
    const to = ['admin@tiny10s.com'] // string or array of email addresses
    email(to, {
        // Optional additional arguments
       // cc: ['admin@tiny10s.com', 'doooo@daaa.com'], // string or array of email addresses
        //bcc: 'mee@mee.com', // string or array of email addresses
        subject: 'Show how to use',
        body: 'Some body right here'
    }).catch(console.error)
}
  showmenuIn() {
    const { navigate } = this.props.navigation;
    if (this.state.showMenu) {
      return (
        <View style={{ flexDirection: 'column', margin: wp('5%') }}>
          <TouchableOpacity style={styles.containerA} onPress={() => this.props.navigation.dispatch(
            NavigationActions.navigate({
            routeName: 'tinyClass',
          }),
        )}><View style={[styles.imgContainer, { width: wp(4.5), height: wp('6.3') }]}><Image source={require('./img/tinyClass.png')} style={styles.imgStyle} resizeMode="cover" /></View><Text style={styles.textStyle}>MY TINY CLASSES</Text></TouchableOpacity><TouchableOpacity style={styles.containerA} onPress={() => navigate('reward')}><View style={styles.imgContainer}><Image source={require('./img/medal.png')} style={styles.imgStyle} resizeMode="cover" /></View><Text style={styles.textStyle}>REWARDS</Text></TouchableOpacity><TouchableOpacity style={styles.containerA} onPress={() => navigate('referFrnd')}><View style={[styles.imgContainer, { width: wp(4.5), height: wp('5') }]}><Image source={require('./img/reward.png')} style={styles.imgStyle} resizeMode="cover" /></View><Text style={styles.textStyle}>REFER A FRIEND</Text></TouchableOpacity><TouchableOpacity style={styles.containerA} onPress={() => navigate('livestream')}><View style={[styles.imgContainer, { height: wp('5') }]}><Image source={require('./img/live.png')} style={styles.imgStyle} resizeMode="cover" /></View><Text style={styles.textStyle}>LIVE STREAM</Text></TouchableOpacity><TouchableOpacity style={styles.containerA} onPress={() => navigate('Music')}><View style={styles.imgContainer}><Image source={require('./img/tinytennis.png')} style={styles.imgStyle} resizeMode="cover" /></View><Text style={styles.textStyle}>TINY MUSIC</Text></TouchableOpacity><TouchableOpacity style={styles.containerA} onPress={() => navigate('giftcard')}><View style={[styles.imgContainer, { height: wp('4%') }]}><Image source={require('./img/gift-card2.png')} style={styles.imgStyle} resizeMode="cover" /></View><Text style={styles.textStyle}>GIFT CARD</Text></TouchableOpacity>
        <TouchableOpacity style={styles.containerA} onPress={this.handleEmail}><View style={styles.imgContainer}><Image source={require('./img/phone-book.png')} style={styles.imgStyle} resizeMode="cover" /></View><Text style={styles.textStyle}>CONTACT</Text></TouchableOpacity><TouchableOpacity style={styles.containerA} onPress={() => navigate('privacypolicy')}><View style={[styles.imgContainer, { height: wp('5.5') }]}><Image source={require('./img/house.png')} style={styles.imgStyle} resizeMode="cover" /></View><Text style={styles.textStyle}>PRIVACY POLICY</Text></TouchableOpacity><TouchableOpacity style={styles.containerA} onPress={() => navigate('termC')}><View style={styles.imgContainer}><Image source={require('./img/term.png')} style={styles.imgStyle} resizeMode="cover" /></View><Text style={styles.textStyle}>TERM & CONDITIONS</Text></TouchableOpacity></View>
      );
    } else {
      return null;
    }
  }
  componentWillUnmount() {
    console.log('hjhsjhd');
    this._isMounted = false;
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flexDirection: 'row', flex: 1, }}>
        <View style={[styles.container, { flex: 2 }]}>
          <Text style={styles.headerText}>MENU</Text>
          {this.showmenuIn()}
          <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: wp('8%') }}>
            <TouchableOpacity style={[styles.containerA, { marginLeft: wp('8%') }]} onPress={() => this._logout()}>
              <View style={[styles.imgContainer, { width: wp('4.5%'), height: wp('3.5') }]}>
                <Image source={require('./img/logout.png')} style={styles.imgStyle} resizeMode="cover" />
              </View>
              <Text style={styles.textStyle}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.closeDrawer()}>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#1AB31A'
  },
  headerText: {
    alignSelf: 'center', marginTop: wp('3%'),
    fontSize: wp('6%'),
    color: '#fff',
    fontFamily: fontSemiBold,
  },
  containerA: {
    flexDirection: 'row',
    margin: wp('3%')
  },
  imgContainer: {
    width: wp('4.8%'), height: wp('6.2%'),
    marginRight: wp('2%'),
    alignSelf: 'center',
  },
  imgStyle: {
    flex: 1, height: undefined,
    width: undefined
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: fontSemiBold,
    fontSize: wp('4%')
  }
})