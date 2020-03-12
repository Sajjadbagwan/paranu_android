/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, BackHandler, View, ActivityIndicator, Text , TextInput } from "react-native";
import { Provider } from "react-redux";
import { createAppContainer } from "react-navigation";

import SwitchNavigator from "./App/navigation/AppNavigator";

import store from "./App/store";
const MainNavigator = createAppContainer(SwitchNavigator);

export default class App extends Component {

  constructor(props) {
    super(props);
    // TextInput.defaultProps = { ...(TextInput.defaultProps || {}), allowFontScaling: false };
    // Text.defaultProps.allowFontScaling=false;
    if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
if (TextInput.defaultProps == null) TextInput.defaultProps = {};
TextInput.defaultProps.allowFontScaling = false;
    this.state = {
      isReady: true
    };
  }

  async componentWillMount() {
    this.setState({ isReady: true });
  }
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton() {
    return true;
  }

  render() {
      return this.state.isReady ? (
        <Provider store={store}>
          <View style={{ flex: 1 }}>
            <MainNavigator />
          </View>
        </Provider>
      ) : (
        <View
          style={{
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="large" color={color.primary} />
        </View>
      );
  }
}

