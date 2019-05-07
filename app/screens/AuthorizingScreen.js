/*
Copyright 2018 Square Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { authorizeAsync, AuthorizeErrorNoNetwork, UsageError } from 'react-native-square-reader-sdk';
import ProgressView from '../components/ProgressView';
import Rest from '../../src/class/restapi';
import Constants from '../../src/constants';

export default class AuthorizingScreen extends Component {
  
  componentDidMount() {
    const { navigation } = this.props;
    let res = Rest.get(Constants.AUTH_SERVER_URL);
    res.then(res => {
      if (res.status == 'success') {
         authCode = res.code;
         expires = res.expires;
         this.authorize(navigation,authCode);
      } else {
        Alert.alert(res.msg);
        navigation.goBack();
      }
    }).then(this.setState({ loading: false }))
      .catch(err => {
        this.setState({ loading: false });
        if (err == 'TypeError: Network request failed') {
          Alert.alert('Something went wrong', 'Kindly check if the device is connected to stable cellular data plan or WiFi.');   
        }
    });
  }

  async authorize(navigation,authCode) {
    try {
      console.log(authCode)
      await authorizeAsync(authCode);
      this.props.navigation.navigate('Checkout');
    } catch (ex) {
      console.log(ex);
      let errorMessage = ex.message;
      switch (ex.code) {
        case AuthorizeErrorNoNetwork:
          // Remind connecting to network and retry
          Alert.alert(
            'Network error',
            ex.message,
            [
              { text: 'Retry', onPress: () => this.authorize(navigation,authCode) },
              { text: 'Cancel', onPress: () => navigation.navigate('Splash'), style: 'cancel' },
            ],
          );
          break;
        case UsageError:
          if (__DEV__) {
            errorMessage += `\n\nDebug Message: ${ex.debugMessage}`;
            console.log(`${ex.code}:${ex.debugCode}:${ex.debugMessage}`);
          }
          Alert.alert('Error', errorMessage);
          navigation.navigate('Splash');
          break;
        default:
          Alert.alert('Error', errorMessage);
          navigation.navigate('Splash');
          break;
      }
    }
  }

  render() {
    return (
      <ProgressView />
    );
  }
}

AuthorizingScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
