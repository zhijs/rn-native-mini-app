import chat from '../chat';
import { connect } from 'react-redux'
import user from '../../store/reducer/user'
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default ChatContainer = connect(mapStateToProps)(chat)