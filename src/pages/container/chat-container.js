import chat from '../chat';
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation';
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default ChatContainer = connect(mapStateToProps)(withNavigation(chat));