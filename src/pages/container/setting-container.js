import setting from '../setting';
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation';
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default SettingContainer = connect(mapStateToProps)(withNavigation(setting));