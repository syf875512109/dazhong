import React, { Component } from 'react';

import UserHeader from './components/UserHeader' 

import UserMain from './components/UserMain'

import { actions as userActions, getCurrentTab, getOrders } from '../../redux/modules/user' 

import { actions as loginActions } from '../../redux/modules/login'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux' 

class User extends Component {

  render() {
    const { currentTab, orders } = this.props
    return (
      <div>
        <UserHeader
          onBack={ this.handleBack }
          onLogout={ this.handleLogout }
        />
        <UserMain data={orders} />
      </div>
    );
  }

  componentDidMount() {
    this.props.userActions.loadOrders()
  }

  handleBack = () => {
    this.props.history.push('/')
  }

  handleLogout = () => {
    this.props.loginActions.logout()
  }

  handleSetCurrentTab = (index) => {
    this.props.userActions.setCurrentTab(index)
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentTab: getCurrentTab(state),
    orders: getOrders(state)
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
