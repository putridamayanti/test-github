import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from '../screen/LoginScreen';
import RepoScreen from '../screen/RepoScreen';
import CommitScreen from "../screen/CommitScreen";

const RootStack = createStackNavigator(
    {
        Login: LoginScreen,
        Repo: RepoScreen,
        Commit: CommitScreen
    },
    {
        initialRouteName: 'Login',
    }
);
console.disableYellowBox = true;

export default createAppContainer(RootStack);

