import React, { Component } from 'react';

import { bindActionCreators } from 'redux'

import { connect } from 'react-redux' 

import { getUsername } from '../../redux/modules/login' 


import { 
  actions as purchaseActions,
  getProduct,
  getQuantity,
  getTipState,
  getTotalPrice,
} from '../../redux/modules/purchase'

import Header from '../../components/Header' 

import PurchaseForm from './components/PurchaseForm'

import Tip from '../../components/Tip' 

import { actions as detailActions } from '../../redux/modules/detail'

class Purchase extends Component {
  render() {
    const { product, phone, quantity, showTip, totalPrice } = this.props
    return (
      <div>
        <Header title='下单'
          onBack={this.handleBack}
        />
        { product ? <PurchaseForm 
            product={ product }
            phone={ phone }
            quantity={ quantity }
            onSubmit={ this.handleSumbmit }
            onSetQuantity={ this.handleSetQuantity }
            totalPrice={totalPrice}
          /> : 'loading...'
        }
        { showTip && <Tip message="购买成功!" 
          onClose={ this.handleCloseTip }
        />
        }
      </div>
    );
  }

  handleSumbmit = () => {
    const productId = this.props.match.params.id

    this.props.purchaseActions.submitOrder(productId)
  }

  handleSetQuantity = (quantity) => {
    this.props.purchaseActions.setOrderQuantity(parseInt(quantity))
  }

  handleBack = () => {
    this.props.history.goBack()
  }

  handleCloseTip = () => {
    console.log('close tip')
    this.props.purchaseActions.closeTip()
  }

  componentDidMount() {
    const { product } = this.props

    console.log('props', this.props)
    if (!product) {
      const productId = this.props.match.params.id 
      setTimeout(() => {
        this.props.detailActions.loadProductDetail(productId)
      }, 1000)
    }
  }

  componentWillUnmount() {
    this.props.purchaseActions.setOrderQuantity(1)
  }
}

const mapStateToProps = (state, props) => {

  const productId = props.match.params.id
  return {
    product: getProduct(state, productId),
    quantity: getQuantity(state),
    showTip: getTipState(state),
    phone: getUsername(state),
    totalPrice: getTotalPrice(state, productId),
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    purchaseActions: bindActionCreators(purchaseActions, dispatch),
    detailActions: bindActionCreators(detailActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchase)
