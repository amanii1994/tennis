import React, { Component } from 'react';
import { AppRegistry, Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer,DrawerItems,createStackNavigator } from 'react-navigation';
import SideMenu from './sidemenu'
import Home from './home';
import Dropin from './dropin';
import Tinygroup from './tinygroup';
import MommymeA from './mommy&meA';
import HomeCourt from './homeCourt';
import Birthday from './birthday';
import TeamTennis from './teamTennis';
import SummerA from './summerA';
import TinyClass from './tinyClass';
import ReferFrnd from './referFrnd';
import Livestream from './livestream';
// import Playlist from './playlist';
import Music from './music';
import PrivacyPolicy from './privacyPolicy';
import Termc from './term&conditions';
import Giftcard from './giftcard';
import dropinRewardA from './dropinRewardA';
import rewardActivity from './rewardActivity';
import Reward from './reward';

const HomeNavigator = createStackNavigator({
    home: { screen: Home,navigationOptions: { header: null } },
    dropin: { screen: Dropin, navigationOptions: { header: null } },
    tinygroup: { screen: Tinygroup,navigationOptions: { header: null } },
    mommymeA: { screen: MommymeA, navigationOptions: { header: null } },
    homeCourt: { screen: HomeCourt,navigationOptions: { header: null } },
    birthday: { screen: Birthday, navigationOptions: { header: null } },
    teamTennis: { screen: TeamTennis,navigationOptions: { header: null } },
    summerA: { screen: SummerA,navigationOptions: { header: null } },
    tinyClass:{screen:TinyClass, navigationOptions: { header: null }},
    referFrnd:{screen:ReferFrnd, navigationOptions: { header: null }},
    livestream:{screen:Livestream, navigationOptions: { header: null }},
    reward:{screen:Reward,navigationOptions: { header: null }},
    // playlist:{screen:Playlist},
    Music:{screen:Music,navigationOptions: { header: null }},
    privacypolicy:{screen:PrivacyPolicy,navigationOptions: { header: null }},
    termC:{screen:Termc,navigationOptions: { header: null }},
    giftcard:{screen: Giftcard,navigationOptions: { header: null }},
    dropinRewardA:{screen: dropinRewardA,navigationOptions: { header: null }},
    rewardActivity:{screen: rewardActivity,navigationOptions: { header: null }},
}, {});

const HomeNavigationDrawer = createDrawerNavigator({
    HomePage: {
        screen: HomeNavigator,
    },
}, {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width,
    drawerBackgroundColor: "transparent ",
});
const MyApp = createAppContainer(HomeNavigationDrawer);
export default MyApp;
