import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LinRegress } from './components/lin-regress/linRegress';
import { SVM } from './components/svm/svm';
import { KMeans } from './components/kmeans/kmeans';
import { LDA } from './components/lda/lda';
import { NavBar } from './components/navbar/navbar';
import { HomePage } from './components/home/homePage';
import history from './components/history/history';
import './App.css';


export default class App extends Component {
    render() {
        return ( <BrowserRouter history={history} >
            <React.Fragment >
            <NavBar/>
            <div className = "main-content" >
            <Switch>
            <Route path = "/linear-regression"
            component = { LinRegress }/>{" "} 
            <Route path = "/svm"
            component = { SVM }
            />{" "} 
            <Route path = "/k-means"
            component = { KMeans }
            />{" "} 
            <Route path = "/lda"
            component = { LDA }
            />{" "}
             <Route path = "/"
            component = { HomePage }
            />{" "}
             </Switch>{" "}
              </div>{" "} 
              </React.Fragment>{" "} 
              </BrowserRouter>
        );
    }
};