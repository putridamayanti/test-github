import React from 'react';
import {Button, Header, Icon} from 'react-native-elements';
import {AsyncStorage} from "react-native";

export default class HeaderComponent extends React.Component {

    async logout() {
        await AsyncStorage.setItem('token', '', '');
        this.props.navigation.navigate('Login');
    }


    render() {
        return(
            <Button
                title="Logout"
                onPress={() => this.logout()}
                type="clear"
            />
        );
    }
}
