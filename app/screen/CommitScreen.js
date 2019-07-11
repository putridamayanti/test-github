import React from "react";
import { AsyncStorage, BackHandler, View, Text, Button, ScrollView } from 'react-native';
import { ListItem, Card } from 'react-native-elements'
import Repo from '../service/Repo';
import HeaderComponent from "../navigation/HeaderComponent";

export default class CommitScreen extends React.Component {
    static navigationOptions = {
        title: 'Commits',
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#538eed'
        },
        headerRight: (
            <HeaderComponent/>
        )
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
        console.log(this.props.navigation.getParam('fullname'));
    }

    async getCommit(fullname) {
        let result = await Repo.getCommit(fullname);
        console.log(result);
        if (!result.message) {
            this.setState({ commits: result, loading: false });
            console.log(this.state.loading);
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
                                            leftAvatar={{ source: { uri: item.committer.avatar_url !== null ? item.owner.avatar_url : '' } }}
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
