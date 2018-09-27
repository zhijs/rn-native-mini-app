import loginIndex from '../login/login-index';
import { connect } from 'react-redux'
import actionType from '../../store/action/actionType'
import * as userAction from '../../store/action/user'
import user from '../../store/reducer/user'
import { withNavigation } from 'react-navigation';
const mapStateToProps = (state) => {
  return {
    user: state.user,
    page: state.page
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logined: (data) => {
      dispatch({
        type: actionType.LOGINED,
        data
      })
    },
    checkRegister: (isRegister) => {
      dispatch({
        type: actionType.CHECKREGISTER,
        isRegister
      })
    },
    sigin: (data) => {
      dispatch({
        type: actionType.REGISTER,
        data
      })
    },
    pageAdd: (page) => {
      dispatch({
        type: actionType.PAGE_NEXT,
        index: page
      })
    },
    pageBack: (page) => {
      dispatch({
        type: actionType.PAGE_PRE,
        index: page
      })
    }
  }
}
export default loginContain = connect(mapStateToProps, mapDispatchToProps)(withNavigation(loginIndex))