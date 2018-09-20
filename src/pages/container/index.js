import AppNavigator from '../../router';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { createNavigationReducer } from "react-navigation-redux-helpers";

export const navReducer = createNavigationReducer(AppNavigator)

const mapStateToProps = (state) => ({
  nav: state.nav
});

class App extends Component {
  render() {
      return (
          <AppNavigator
          />
      );
  }
}

export const Root = connect(mapStateToProps)(App);