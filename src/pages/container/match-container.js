import match from "../match";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import actionType from "../../store/action/actionType";
const mapStateToProps = state => {
  return {
    user: state.user,
    friend: state.friend,
    message: state.message
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setFriendAll: data => {
      dispatch({ type: actionType.SET_FRIEND_ALL, data });
    },
    addNewFriend: data => {
      dispatch({ type: actionType.SET_NEW_FRIEND, data });
    },
    addMatchFriend: data => {
      dispatch({ type: actionType.SET_MATCH_FRIEND, data });
    },
    deleteNewFriend: data => {
      dispatch({ type: actionType.DELETE_NEW_FRIEND, data });
    },
    setMessageAll: data => {
      dispatch({ type: actionType.SET_MSG_ALL, data });
    },
    addFriendMsg:data => {
      dispatch({ type: actionType.ADD_NEW_MSG, data });
    },
  };
};
export default (MatchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(match)));
