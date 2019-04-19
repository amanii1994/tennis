
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,AsyncStorage} from 'react-native';
import { createStackNavigator, StackNavigator, createSwitchNavigator,createAppContainer } from 'react-navigation';
import Welcome from './src/welcome';
import Login from './src/login';
import Signupa from './src/signupa';
import Signupb from './src/signupb';
import Signupfb from './src/signupfb';
import Password from './src/password';
import Rpassword from './src/forgot';
import Home from './src/home';
import Dropin from './src/dropin';
import DropinA from './src/dropinA';
import Tinygroup from './src/tinygroup';
import TinygroupA from './src/tinygroupA';
import TinygroupB from './src/tinygroupB';
import MommymeA from './src/mommy&meA';
import MommymeB from './src/mommy&meB';
import MommymeC from './src/mommy&meC';
import HomeCourt from './src/homeCourt';
import HomeCourtA from './src/homeCourtA';
import HomeCourtB from './src/homeCourtB';
import Birthday from './src/birthday';
import BirthdayA from './src/birthdayA';
import BirthdayB from './src/birthdayB';
import TeamTennis from './src/teamTennis';
import SummerA from './src/summerA';
import SummerB from './src/summerB';
import SummerC from './src/summerC';
import StackNav from './src/stacknav';
import AuthLoadingScreen from './src/authLoading';
import TinyClass from './src/tinyClass';
import Reward from './src/reward';
import ReferFrnd from './src/referFrnd';
import Livestream from './src/livestream';
import Playlist from './src/playlist';
import PrivacyPolicy from './src/privacyPolicy';
import Termc from './src/term&conditions';
import Giftcard from './src/giftcard';
import Filter from './src/filter';
import HomeCourtD from './src/homeCourtD';
import Guestcheckout from './src/guestcheckout';
//import Check1 from './src/check1';
const AppStack = createStackNavigator({ 
  stack: { screen: StackNav, navigationOptions: { header: null } },
  home: { screen: Home, navigationOptions: { header: null } },
  dropin: { screen: Dropin, navigationOptions: { header: null } },
  dropinA: { screen: DropinA, navigationOptions: { header: null } },
  tinygroup: { screen: Tinygroup, navigationOptions: { header: null } },
  tinygroupA: { screen: TinygroupA, navigationOptions: { header: null } },
  tinygroupB: { screen: TinygroupB, navigationOptions: { header: null } },
  mommymeA: { screen: MommymeA, navigationOptions: { header: null } },
  mommymeB: { screen: MommymeB, navigationOptions: { header: null } },
  mommymeC: { screen: MommymeC, navigationOptions: { header: null } },
  homeCourt: { screen: HomeCourt, navigationOptions: { header: null } },
  homeCourtA: { screen: HomeCourtA, navigationOptions: { header: null } },
  homeCourtB: { screen: HomeCourtB, navigationOptions: { header: null } },
  homeCourtD: { screen: HomeCourtD, navigationOptions: { header: null } },
  birthday: { screen: Birthday, navigationOptions: { header: null } },
  birthdayA: { screen: BirthdayA, navigationOptions: { header: null } },
  birthdayB: { screen: BirthdayB, navigationOptions: { header: null } },
  teamTennis: { screen: TeamTennis, navigationOptions: { header: null } },
  summerA: { screen: SummerA, navigationOptions: { header: null } },
  summerB: { screen: SummerB, navigationOptions: { header: null } },
  summerC: { screen: SummerC, navigationOptions: { header: null } },
  tinyClass:{screen:TinyClass,navigationOptions: { header: null }},
  reward:{screen:Reward,navigationOptions: { header: null }},
  referFrnd:{screen:ReferFrnd,navigationOptions: { header: null }},
  livestream:{screen:Livestream,navigationOptions: { header: null }},
  playlist:{screen:Playlist,navigationOptions: { header: null }},
  privacyPolicy:{screen:PrivacyPolicy,navigationOptions: { header: null }},
  termc: {screen:Termc,navigationOptions: { header: null }},
  giftcard: {screen:Giftcard,navigationOptions: { header: null }},
  filter: {screen: Filter,navigationOptions: { header: null }},
  guestcheckout: {screen: Guestcheckout, navigationOptions: { header : null}}
  //check1: {screen: Check1,navigationOptions: { header: null }}
 },{
  initialRouteName: 'stack'
});
const AuthStack = createStackNavigator({ 
  welcome: { screen: Welcome, navigationOptions: { header: null } },
  login :{screen:Login,navigationOptions: {header: null }},
  signupa:{screen:Signupa, navigationOptions:{header:null}},
  signupb:{screen:Signupb, navigationOptions:{header:null}},
  signupfb: {screen: Signupfb,navigationOptions: { header: null }},
  password:{screen:Password, navigationOptions:{header:null}},
  forgot:{screen:Rpassword, navigationOptions:{header:null}}, 
},{
  initialRouteName: 'welcome'
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

const styles = StyleSheet.create({
 
});
// import {
//   createSwitchNavigator,
//   createAppContainer,
// } from 'react-navigation';
// import HomeScreen from './app/screens/HomeScreen';

// const RootStack = createSwitchNavigator({
//   Home: { screen: HomeScreen },
// }, {
//   initialRouteName: 'Home',
// });

// const App = createAppContainer(RootStack);

// export default App;

