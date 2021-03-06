import chat from '../chat';
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation';
import actionType from "../../store/action/actionType";
const mapStateToProps = (state) => {
  return {
    user: state.user,
    friend: state.friend,
    message: state.message
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setFriendAll: data => {
      dispatch({ type: actionType.SET_FRIEND_ALL, data });
    },
    addChatFriend: data => {
      dispatch({ type: actionType.SET_CHAT_FRIEND, data });
    },
    addMsg: data => {
      dispatch({ type: actionType.SET_MSG_ALL, data });
    }
  };
};

export default ChatContainer = connect(mapStateToProps)(withNavigation(chat));