import matchList from '../match-list';
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation';
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default MatchList = connect(mapStateToProps)(withNavigation(matchList));