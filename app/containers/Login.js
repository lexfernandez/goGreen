import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import LoginForm from '../components/login-form'



const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (username,password) => {
      dispatch(login(username,password))
    }
  }
}

export default Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
