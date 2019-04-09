import React, { Component } from 'react';
import { AppRegistry, Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer,DrawerItems } from 'react-navigation';
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
class stack extends Component{
    
}
const drawernav = createDrawerNavigator({
    home: { screen: Home, },
    dropin: { screen: Dropin,  },
    tinygroup: { screen: Tinygroup, },
    mommymeA: { screen: MommymeA,  },
    homeCourt: { screen: HomeCourt, },
    birthday: { screen: Birthday,  },
    teamTennis: { screen: TeamTennis, },
    summerA: { screen: SummerA, },
    tinyClass:{screen:TinyClass},
    referFrnd:{screen:ReferFrnd},
    livestream:{screen:Livestream},
    // playlist:{screen:Playlist},
    Music:{screen:Music},
    privacypolicy:{screen:PrivacyPolicy},
    termC:{screen:Termc},
    giftcard:{screen: Giftcard},
}, {
        contentComponent: SideMenu,
        drawerWidth: Dimensions.get('window').width,
        drawerBackgroundColor: "transparent ",
    });
const MyApp = createAppContainer(drawernav);
export default MyApp;