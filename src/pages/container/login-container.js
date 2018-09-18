import loginIndex from '../login/login-index';
import { connect } from 'react-redux'
import actionType from '../../store/action/actionType'
import * as userAction from '../../store/action/user'
import * as pageAction from '../../store/action/log'
import user from '../../store/reducer/user'
const mapStateToProps = (state) => {
  console.log('mapStateToProps')
  console.log(state)
  return {
    user: state.user,
    page: state.page
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (data) => {
      dispatch(userAction.login(data))
    },
    checkRegister: (number) => {
      dispatch(userAction.checkRegister(number))
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
export default loginContain = connect(mapStateToProps, mapDispatchToProps)(loginIndex)