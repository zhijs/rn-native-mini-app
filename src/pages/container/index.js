/**
 * 这里统一注入store
 */
import configureStore from '../../store/index'
import React, {Component} from 'react';
import { Navigation } from 'react-native-navigation';
import LoginContainer from './login-container' 
import ChatContainer from './chat-container' 

export default (store, Provider) => {
  Navigation.registerComponent('xl_client.Login', () => LoginContainer, store, Provider);
	Navigation.registerComponent('xl_client.Chat', () => ChatContainer, store, Provider);
}
// export const LoginIndex = class LoginIndex extends Component {
//   render() {
//     return ( 
//       <Provider store={store}>
//         <LoginContainer />
//       </Provider>
//     )
//   }
// }

// export const Chat = class Chat extends Component {
//   render() {
//     return ( 
//       <Provider store={store}>
//        <ChatContainer />
//       </Provider>
//     )
//   }
// }