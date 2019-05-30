import React, { Component } from 'react';
import "./style.css"

class LoginForm extends Component {

  render() {
    const { username, password, onUsername, onClick, onPassword } = this.props 

    return (
      <div className="loginForm">
        <div className="loginForm__inputContainer">
          <div className="loginForm__row">
            <label className="loginForm__mobileLabel">86</label>
            <input className="loginForm__input"
              name="username"
              value={username}
              onChange={ onUsername }
            ></input>
          </div>
          <div className="loginForm__row">
            <label className="loginForm__passwordLabel">密码</label>
            <input className="loginForm__input"
              name="password"
              type="password"
              value={password}
              onChange={ onPassword }
            ></input>
          </div>
        </div>
        <div className="loginForm__btnContainer">
          <button className="loginForm__btn"
            onClick={ onClick }
          >
            登录
          </button>
        </div>
      </div>
    );
  }
}

export default LoginForm;