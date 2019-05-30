
import React, { Component } from 'react'

import ProductOverview from './components/ProductOverview'

import ShopInfo from './components/ShopInfo' 

import Detail from './components/Detail' 

import Remark from './components/Remark' 

import Header from '../../components/Header' 

import BuyButton from './components/BuyButton' 

import { actions as detailActions, getProduct, getRelatedShop } from '../../redux/modules/detail'

import { connect } from 'react-redux' 

import { bindActionCreators } from 'redux'
class ProductDetail extends Component {

  handleBack = () => {
    this.props.history.goBack()
  }

  componentDidMount() {
    const { product } = this.props 

    if (!product) {
      const productId = this.props.match.params.id 

      this.props.detailActions.loadProductDetail(productId)

    } else if (!this.props.relatedShop) {
      this.props.detailActions.loadShopById(product.nearestShop)
    }
  }

  componentDidUpdate(prepProps) {
    if (!prepProps.product && this.props.product) {
      this.props.detailActions.loadShopById(this.props.product.nearestShop)
    }
  }

  render() {
    const { product, relatedShop } = this.props

    return (
      <div>
        <Header title="团购详情" onBack={ this.handleBack }/>
        { product && <ProductOverview data={ product }/>}
        { relatedShop && <ShopInfo data={ relatedShop } total={ product.shopIds.length }/> }
        { product && <Detail data={ product }/>}
        { product && <Remark data={ product }/>}
        { product && <BuyButton productId={product.id}/>}
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  const productId = props.match.params.id 

  return {
    product: getProduct(state, productId),
    relatedShop: getRelatedShop(state, productId),
  }
}

const mapDispatchToprops = (dispatch, props) => {
  return {
    detailActions: bindActionCreators(detailActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(ProductDetail)
