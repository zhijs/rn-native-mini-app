import AppNavigator from '../..router';
import { connect } from 'react-redux';
import { addNavigationHelpers } from "react-navigation";

export function navReducer(state, action) {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

const mapStateToProps = (state) => ({
  nav: state.nav
});

class App extends Component {
  render() {
      return (
          <AppNavigator
              navigation={addNavigationHelpers({
                  dispatch: this.props.dispatch,
                  state: this.props.nav
              })}
          />
      );
  }
}

export const Root = connect(mapStateToProps)(App);