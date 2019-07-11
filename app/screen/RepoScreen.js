import React from "react";
import { AsyncStorage, BackHandler, ScrollView, View, Text, TextInput, Alert } from 'react-native';
import { ListItem, Button, Icon, Input } from 'react-native-elements'
import Repo from '../service/Repo';
import HeaderComponent from "../navigation/HeaderComponent";

export default class RepoScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Repository',
            headerTintColor: '#fff',
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#538eed'
            },
            headerRight: (
                <Button
                    icon={
                        <Icon
                            name="keyboard-tab"
                            color="white"
                        />
                    }
                    onPress={async () => {
                        await AsyncStorage.setItem('token', '', '');
                        navigation.navigate('Login');
                    }}
                    type="clear"
                />
            )
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            query: 'facebook/react-native',
            repos: []
        };

        this.search  = this.search.bind(this);
    }

    componentDidMount() {
        this.search();
        // this.props.navigation.setParams({ logout: this.logout() });
        // console.log(this.state);
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // }
    //
    // handleBackButton() {
    //     // ToastAndroid.show('Back button is pressed');
    //     return true;
    // }

    async search() {
        this.loading    = true;
        let result = await Repo.getRepo(this.state.query);
        this.setState({ repos: result.items, loading: false });
    }

    async logout() {
        await AsyncStorage.setItem('token', '', '');
        this.props.navigation.navigate('Login');
    }

    renderList() {
        if (this.state.repos.length !== 0) {
            return (
                <ScrollView>
                    {
                        this.state.repos.map((item, i) => (
                            <ListItem
                                key={i}
                                leftAvatar={{ source: { uri: item.owner.avatar_url !== null ? item.owner.avatar_url : ''  } }}
                                title={item.name}
                                subtitle={item.owner.login}
                                onPress={() => this.props.navigation.navigate('Commit', {
                                    fullname: item.full_name
                                })}
                            />
                        ))
                    }
                </ScrollView>
            );
        }
    }

    render() {
        return(
            <View style={{ padding: 20 }}>
                <Input
                    style={{ marginTop: 30 }}
                    placeholder='Search Repo'
                    leftIcon={
                        <Icon
                            name='search'
                            color='black'
                        />
                    }
                    onChangeText={(text) => this.setState({query : text})}
                    value={this.state.query}
                />
                <Button
                    style={{ marginTop: 30 }}
                    color="#d6af51"
                    onPress={this.search}
                    title="Search"
                />
                { this.state.loading ?
                    <Text style={{ marginTop: 30, textAlign: 'center' }}>Loading</Text> :
                    this.renderList()
                }
            </View>
        );
    }
}
