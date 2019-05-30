import React, { Component } from "react";
import "./style.css";

class ShopInfo extends Component {
  render() {
    // debugger;
    // const { shop: relatedShop } = this.props.data;

    const { shop: name, star, address, phone } = this.props.data

    return (
      <div className="shopInfo">
        <div className="shopInfo__header">
          使用商户（{ this.props.total }）
          <span className="shopInfo__arrow" />
        </div>
        <div className="shopInfo__middle">
          <div className="shopInfo__middleLeft">
            <div className="shopInfo__shopName">{ name }</div>
            <div className="shopInfo__starsWrapper">
              <span className="shopInfo__stars">
                <i
                  className="shopInfo__stars--red"
                  style={{ width: `${2 * star}%` }}
                />
              </span>
              <span className="shopInfo__distance">>100km</span>
            </div>
          </div>
          <a className="shopInfo__middleRight" href={`tel://${phone}`}>
            <i className="shopInfo__phoneIcon" />
          </a>
        </div>
        <div className="shopInfo__bottom">
          <i className="shopInfo__locationIcon" />
          {address}
        </div>
      </div>
    );
  }
}

export default ShopInfo;
