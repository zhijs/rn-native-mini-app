import privilege from '../privilege';
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation';
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default PrivilegeContainer = connect(mapStateToProps)(withNavigation(privilege));