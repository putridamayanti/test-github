import React from 'react';
import {StyleSheet, Text, View, AsyncStorage, Button, BackHandler} from 'react-native';
import OAuth from '../service/OAuth';

export default class LoginScreen extends React.Component {

    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            this.props.navigation.navigate('Repo');
        }

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        // ToastAndroid.show('Back button is pressed');
        return true;
    }

    async login() {
        var token = await OAuth();
        console.log(token);
        if (token.access_token) {
            this.props.navigation.navigate('Repo');
        }
    }

    render() {
        return(
          <View style={{ padding: 20, display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
              <Button title="Sign In Github" color="#d6af51" onPress={() => this.login()}/>
          </View>
        );
    }
}
