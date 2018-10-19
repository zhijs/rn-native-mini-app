import linkeMe from '../likeme';
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation';
const mapStateToProps = (state) => {
  return {
    user: state.user,
    friend: state.friend
  }
}

export default linkeMeContainer = connect(mapStateToProps)(withNavigation(linkeMe));