import linkeMeTitle from '../likeme-title';
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation';
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default linkeMeTitleContainer = connect(mapStateToProps)(withNavigation(linkeMeTitle));