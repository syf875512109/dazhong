
import React, { Component } from 'react'

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        component: null
      }
    }

    componentDidMount() {
      importComponent().then((mod) => {
        this.setState({
          component: mod.default,
        })
      })
    }

    render() {
      // if (!this.state.component) {
      //   return (
      //     <h1>Loading...</h1>
      //   )
      // } else {
      //   return <this.state.component {...this.props} />
      // }

      const C = this.state.component 

      return C ? <C {...this.props} /> : (<h1>Loading...</h1>)
    }
  }

  return AsyncComponent
}