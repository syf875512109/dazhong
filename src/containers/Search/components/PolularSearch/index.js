import React, { Component } from 'react';
import "./style.css"

class PopularSearch extends Component {

  handleClick = (item) => {
    this.props.onClickItem(item)
  }

  render() {
    const { data } = this.props 
    return (
      <div className="popularSearch">
        {
          data.map((item) => {
            return (
              <span key={item.id}
                className="popularSearch__item"
                onClick={ this.handleClick.bind(null, item) }
              >{item.keyword}
              </span>
            )
          })
        }
      </div>
    );
  }
}

export default PopularSearch;