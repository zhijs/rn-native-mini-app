import match from '../match';
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation';
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setFriend: (data) => {
      dispatch({
        type: actionType.SET_NEW_FRIEND,
        data
      })
    },
    addLikeMe: (user) => {
      dispatch({
        type: actionType.SET_NEW_LINKE_ME,
        isRegister
      })
    }
  }
}
export default ChatContainer = connect(mapStateToProps, mapDispatchToProps)(withNavigation(match));