import matchList from '../match-list';
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation';
import actionType from "../../store/action/actionType";
const mapStateToProps = (state) => {
  return {
    user: state.user,
    friend: state.friend
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setFriendAll: data => {
      dispatch({ type: actionType.SET_FRIEND_ALL, data });
    },
    addLikeMe: data => {
      dispatch({ type: actionType.SET_NEW_LINKE_ME, data });
    },
    addMatchFriend: data => {
      dispatch({ type: actionType.SET_MATCH_FRIEND, data });
    }
  };
};
export default (MatchList = connect(mapStateToProps, mapDispatchToProps)(withNavigation(matchList)));