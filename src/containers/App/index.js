import React, { Component } from 'react';

// import ErrorToast from '../../components/ErrorToast' 

// import { bindActionCreators } from 'redux'

import { connect } from 'react-redux' 

// import { actions as appActions, getError } from '../../redux/modules/app'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

// import Home from '../Home' 

// import ProductDetail from '../ProductDetail' 

// import Search from '../Search' 

// import SearchResult from '../SearchResult'

// import Login from '../Login'

import PrivateRoute from '../PrivateRoute' 

// import User from '../User' 

// import Purchase from '../purchase';

import AsyncComponent from '../../utils/asyncComponent' 

import './style.css'

const Home = AsyncComponent(() => import('../Home'))

const ProductDetail = AsyncComponent(() => import('../ProductDetail'))

const Search = AsyncComponent(() => import('../Search'))

const SearchResult = AsyncComponent(() => import('../SearchResult'))

const Login = AsyncComponent(() => import('../Login'))

const User = AsyncComponent(() => import('../User'))

const Purchase = AsyncComponent(() => import('../Purchase'))

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
        <BrowserRouter>
          <Switch>
            <Route path="/detail/:id" component={ ProductDetail } />
            <Route path="/search" component={ Search } />
            <Route path="/search_result" component={ SearchResult} />
            <Route path="/login" component={ Login } />
            <PrivateRoute path="/user" component={ User } />
            <PrivateRoute path="/purchase/:id" component= { Purchase } />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
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