import React from 'react';
import {View, AsyncStorage, Button, BackHandler} from 'react-native';
import OAuth from '../service/OAuth';

export default class LoginScreen extends React.Component {

    static navigationOptions = {
        header: null
    };

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
          <View style={{ padding: 20, paddingTop: 100 }}>
              <Button title="Sign In Github" color="#d6af51" onPress={() => this.login()}/>
          </View>
        );
    }
}
