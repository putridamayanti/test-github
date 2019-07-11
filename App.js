import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button } from 'react-native';
import firebase from 'firebase';
import githubtoken from './githubtoken';
import {AuthSession} from "expo";
import RootStack from "./app/navigation/RootComponent";

const GithubStorageKey = '@Expo:GithubToken'; //lolz whatever you want.

// Get this at: https://console.firebase.google.com/
const firebaseConfig = {
  apiKey: 'AIzaSyBOoWTgaqAdKAJ4SmqAIfk0KzwjXP9hwyo',
  authDomain: 'test-github-84565.firebaseapp.com',
  databaseURL: 'https://test-github-84565.firebaseio.com',
  projectId: 'test-github-84565',
  storageBucket: 'test-github-84565.appspot.com',
  messagingSenderId: '561401707502',
};

function initializeFirebase() {
  // Prevent reinitializing the app in snack.
  if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  }
}

async function signInAsync(token) {
  try {
    if (!token) {
      const token = await githubtoken();
      console.log('Successfully get token : ', token);

      if (token) {
        await AsyncStorage.setItem(GithubStorageKey, token, '');
        return signInAsync(token);
      } else {
        return;
      }
    }
    const credential = firebase.auth.GithubAuthProvider.credential(token);
    console.log(credential);
    AuthSession.dismiss();
    return firebase.auth().signInWithCredential(credential);
  } catch ({ message }) {
    alert(message);
  }
}

async function signOutAsync() {
  try {
    await AsyncStorage.removeItem(GithubStorageKey, '');
    await firebase.auth().signOut();
  } catch ({ message }) {
    alert('Error: ' + message);
  }
}

async function attemptToRestoreAuthAsync() {
  let token = await AsyncStorage.getItem(GithubStorageKey, '');
  if (token) {
    console.log('Sign in with token', token);
    return signInAsync(token);
  }
}

export default class App extends React.Component {

  state = { isSignedIn: false };

  async componentDidMount() {
    this.setupFirebaseAsync();
    var token = await AsyncStorage.getItem(GithubStorageKey, '');
    console.log(token);
  }

  setupFirebaseAsync() {
    initializeFirebase();

    firebase.auth().onAuthStateChanged(async auth => {
      console.log(auth);
      const isSignedIn = !!auth;
      this.setState({ isSignedIn });
      if (!isSignedIn) {
        attemptToRestoreAuthAsync();
      }
    });
  }

  render() {
    // return (
    //     <View style={styles.container}>
    //       <Text>Open up App.js to start working on your app!</Text>
    //       <Button title="Sign In" onPress={() => signInAsync()}/>
    //       <Text>{ this.state.isSignedIn }</Text>
    //     </View>
    // );
    return(
        <RootStack/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
