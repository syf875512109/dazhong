import React, { Component } from 'react';

import LoginHeader from './component/LoginHeader'

import LoginForm from './component/LoginForm' 

import { actions as loginActions, getPassword, getUsername, isLogin } from '../../redux/modules/login'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux';

import { Redirect, Link } from 'react-router-dom'
class Login extends Component {

  handleOnclick = () => {
    this.props.loginActions.login()
  }

  handleOnUsername = (e) => {
    this.props.loginActions.setUsername(e.target.value)
  }

  handleOnPassword = (e) => {
    this.props.loginActions.setPassword(e.target.value)
  }

  render() {
    const { username, password, login, isFetching, location: {state} } = this.props

    if (login) {
      if (state && state.from) {
        return <Redirect to={state.from} />
      }
      return <Redirect to="/user" />
    }

    return (
      <div>
        <LoginHeader />
        {
          isFetching === 'failure' ? 
          <div>
            <div>用户名或密码错误</div>
            <Link to='/login' onClick={this.props.loginActions.clearStatus}>重新输入</Link>
          </div>
          :
          <LoginForm
            username={username} 
            password={password}
            onClick={ this.handleOnclick }
            onUsername={ this.handleOnUsername }
            onPassword={ this.handleOnPassword }
          />
        }
        
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {

  return {
    username: getUsername(state),
    password: getPassword(state),
    login: isLogin(state),
    isFetching: state.login.isFetching
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
