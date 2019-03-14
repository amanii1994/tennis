import React, { Component } from 'react';
import {View, StyleSheet } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Welcome from './welcome';
const drawernav = DrawerNavigator({
    wlcome:{
        screen: Welcome,
    },
    contentComponent:SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,
});
export default drawernav;