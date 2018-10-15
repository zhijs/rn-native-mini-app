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
    addLikeMe: data => {
      dispatch({ type: actionType.SET_NEW_LINKE_ME, data });
    }
  };
};
export default (ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(match)));
