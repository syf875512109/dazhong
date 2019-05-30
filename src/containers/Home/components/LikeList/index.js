import React, { Component } from 'react';

import LikeItem from '../LikeItem'

import './style.css'

import Loading from '../../../../components/Loading' 

import debounce from 'lodash/debounce'

class LikeList extends Component {

  constructor(props) {
    super(props) 

    this.myRef = React.createRef()

    this.myDebouncescroll = debounce(this.handleScroll, 1000)
  }

  handleScroll = () => {
    const scrollTop = (document.documentElement.scrollTop || 
      document.body.scrollTop)
    
    const screenHeight = (
      document.documentElement.clientHeight
    )
    
    if (this.myRef.current) {
      const likeListTop = this.myRef.current.offsetTop
  
      const likeListHeight = this.myRef.current.offsetHeight
      
      if (scrollTop >= likeListHeight + likeListTop - screenHeight) {
        this.props.fetchData()
      }
    }

  }

  componentDidUpdate() {

    if (this.props.pageCount >= 3) {
      document.removeEventListener('scroll', this.myDebouncescroll)
    }
  }

  componentDidMount() {

    if (this.props.pageCount < 3) {
      document.addEventListener('scroll', this.myDebouncescroll)
    }

    if (this.props.pageCount === 0) {
      this.props.fetchData()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.myDebouncescroll)
  }

  render() {
    const { data, pageCount } = this.props

    return (
      
      <div className="likeList" ref={ this.myRef }>
        <div className="likeList__header">猜你喜欢</div>
        <div className="likeList__list">
          {
            data.map((item, index) => {
              return (
                <LikeItem key={index} data={item} />
              )
            })
          }
        </div>
        {
          pageCount < 3 ? (
            <Loading />
          ) : (
            <a href="#" className="likeList__viewAll">查看更多</a>
          )
        }
      </div>
    );
  }
}

export default LikeList;
