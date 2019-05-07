import React from 'react';
import { FormattedProvider } from 'react-native-globalize';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import ChooseAuthorizeScreen from '../app/screens/ChooseAuthorizeScreen';
import ManualAuthorizeScreen from '../app/screens/ManualAuthorizeScreen';
import CheckoutScreen from '../app/screens/CheckoutScreen';
import SettingScreen from '../app/screens/SettingScreen';
import SplashScreen from '../app/screens/SplashScreen';
import PermissionScreenIOS from '../app/screens/PermissionScreenIOS';
import QRAuthorizationScreen from '../app/screens/QRAuthorizationScreen';
import AuthorizingScreen from '../app/screens/AuthorizingScreen';
import DeauthorizingScreen from '../app/screens/DeauthorizingScreen';

const AuthStack = createStackNavigator({
  Authorize: {
    screen: AuthorizingScreen,
  },
  // QRAuthorize: QRAuthorizationScreen,
  // ManualAuthorize: ManualAuthorizeScreen,
  Authorizing: AuthorizingScreen,
}, {
  headerMode: 'none',
});

const PaymentStack = createStackNavigator({
  Checkout: CheckoutScreen,
  Setting: SettingScreen,
  Deauthorizing: DeauthorizingScreen,
}, {
  headerMode: 'none',
});

const RootStack = createSwitchNavigator({
  Splash: SplashScreen,
  PermissionSettings: PermissionScreenIOS,
  AuthRead: AuthStack,
  Checkout: PaymentStack,
}, {
  initialRouteName: 'Splash',
});

const App = () => (
  <FormattedProvider locale="en">
    <RootStack />
  </FormattedProvider>
);
export default createAppContainer(RootStack);


