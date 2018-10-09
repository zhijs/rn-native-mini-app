import upload from '../upload';
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation';
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default UploadContainer = connect(mapStateToProps)(withNavigation(upload));