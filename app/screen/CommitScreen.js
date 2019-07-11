import React from "react";
import { AsyncStorage, View, Text, Button, ScrollView } from 'react-native';
import {ListItem, Card, Icon} from 'react-native-elements'
import Repo from '../service/Repo';

export default class CommitScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Repository',
            headerTintColor: '#fff',
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

        this.state  = {
            loading: true,
            repo: '',
            owner: '',
            commits: []
        }
    }

    componentDidMount() {
        if (this.props.navigation.getParam('fullname')) {
            this.getCommit(this.props.navigation.getParam('fullname'));
        }
    }

    async getCommit(fullname) {
        let result = await Repo.getCommit(fullname);
        if (!result.message) {
            this.setState({ commits: result, loading: false });
        }
    }

    render() {
        return(
            <ScrollView>
                { this.state.loading ?
                    <Text>Loading</Text>:
                    <View>
                        { this.state.commits.length !== 0 ?
                            <View>
                                { this.state.commits.map((item, i) => (
                                    <Card key={i}>
                                        <ListItem
                                            leftAvatar={{ source: { uri: item.committer.avatar_url !== null ? item.committer.avatar_url : '' } }}
                                            title={item.committer.login}
                                            subtitle={
                                                <View>
                                                    <Text>{ item.commit.message }</Text>
                                                    <Text>{ item.commit.committer.date }</Text>
                                                </View>
                                            }
                                        />
                                    </Card>
                                ))}
                            </View>:
                            <Text>No Data</Text>
                        }
                    </View>
                }

            </ScrollView>
        );
    }
}
