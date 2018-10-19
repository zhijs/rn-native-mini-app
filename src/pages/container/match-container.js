import match from "../match";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import actionType from "../../store/action/actionType";
const mapStateToProps = state => {
  return {
    user: state.user,
    friend: state.friend
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
    }
  };
};
export default (ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(match)));
