import React, { Component } from "react";

import "./style.css";

class Discount extends Component {
  render() {
    const data = this.props.data;
    return (
      <div className="discount">
        <a href="" className="discount__header">
          <span className="discount__title">超值特惠</span>
          <span className="discount__more">更多优惠</span>
          <span className="discount__arrow" />
        </a>
        <div className="discount__content">
          {data.map((item, index) => {
            return (
              <a
                key={item.id}
                // href={ item.url }
                className="discount__item"
              >
                <div className="dicount__itemPic">
                  <img width="100%" src={item.picture} alt="" />
                </div>
                <div className="discount__itemTitle">{item.shop}</div>

                <div className="discount__itemPriceWrapper">
                  <ins className="discount__itemCurrentPrice">
                    {item.currentPrice}
                  </ins>
                  <del className="discount__itemOldPrice">{item.oldPrice}</del>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Discount;
