import React, { Component } from 'react';

import ErrorToast from '../../components/ErrorToast' 

import { bindActionCreators } from 'redux' 

import { connect } from 'react-redux' 

import { actions as appActions, getError } from '../../redux/modules/app'

import Home from '../Home' 

import './style.css'


import { get } from '../../utils/request' 

class App extends Component {

  // constructor(props) {
  //   super(props) 
  //   this.state = {
  //     status: 'loading',
  //     todos: '',
  //   }
  // }
  // componentDidMount() {
  //   const apiUrl = '../../../mock/data.json'

  //   get(apiUrl).then(data => {
  //     console.log(data)

  //     this.setState({
  //       status: 'success',
  //       todos: data
  //     })
  //   }).catch(error => {
  //     this.setState({
  //       status: 'failure',
  //     })
  //   })

  // }

  render() {

    // const { error, appActions: {clearError} } = this.props

    // return (
    //   <div className="App">
    //   {
    //     error && <ErrorToast msg={ error } clearError={ clearError } />
    //   }
    //   </div>
    // );
    
    return (
      <div className="App">
        <Home />
      </div>
    );

    // if (this.state.status == 'loading') {
    //   return (
    //     <div>Getting datas</div>
    //   )
    // } else if(this.state.status == 'success') {
    //   return (
    //     <div>
    //       <ul>
    //         {
    //           this.state.todos.map((item, index) => {
    //             return (
    //               <li key={index}>
    //                 <span>{item.name} : {item.content}</span>
    //               </li>
    //             )
    //           })
    //         }
    //       </ul>
    //     </div>
    //   )
    // } else {
    //   return (
    //     <div>get failed</div>
    //   )
    // }
  }
}

const mapstateToProps = (state, props) => {
  return {
    // error: getError(state)
  }
}

const mapdispatchToProps = (dispatch) => {
  return {
    // appActions: bindActionCreators(appActions, dispatch)
  }
}

export default connect(mapstateToProps, mapdispatchToProps)(App)