import loginIndex from '../login/login-index';
import { connect } from 'react-redux'
import actionType from '../../store/action/actionType'
import * as userAction from '../../store/action/user'
import user from '../../store/reducer/user'
const mapStateToProps = (state) => {
  console.log('mapStateToProps')
  console.log(state)
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (data) => {
      dispatch(userAction.login(data))
    },
    checkRegister: (number) => {
      dispatch(userAction.checkRegister(number))
    }
  }
}
export default loginContain = connect(mapStateToProps, mapDispatchToProps)(loginIndex)