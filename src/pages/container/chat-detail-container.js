import chatDetail from '../chat-detail';
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
    logined: (data) => {
      dispatch({
        type: actionType.LOGINED,
        data
      })
    },
    addChatFriend: data => {
      dispatch({ type: actionType.SET_CHAT_FRIEND, data });
    },
    setMessageAll: data => {
      dispatch({ type: actionType.SET_MSG_ALL, data });
    },
    addFriendMsg:data => {
      dispatch({ type: actionType.ADD_NEW_MSG, data });
    },
  };
};

export default chatDetailContainer = connect(mapStateToProps, mapDispatchToProps)(withNavigation(chatDetail));