import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LinRegAbout } from './components/lin-reg/about';
import { LinRegTrain } from './components/lin-reg/train';
import { LinRegTest } from './components/lin-reg/test';
import { LinRegResult } from './components/lin-reg/result';
import { LogRegAbout } from './components/log-reg/about';
import { LogRegTrain } from './components/log-reg/train';
import { LogRegTest } from './components/log-reg/test';
import { LogRegResult } from './components/log-reg/result';
import { SVMAbout } from './components/svm/about';
import { SVMTrain } from './components/svm/train';
import { SVMTest } from './components/svm/test';
import { SVMResult } from './components/svm/result';
import { NBAbout } from './components/nb/about';
import { NBTrain } from './components/nb/train';
import { NBTest } from './components/nb/test';
import { NBResult } from './components/nb/result';
import { KMeansAbout } from './components/k-means/about';
import { KMeansTrain } from './components/k-means/train';
import { KMeansTest } from './components/k-means/test';
import { KMeansResult } from './components/k-means/result';
import { NavBar } from './components/NavBar/NavBar';
import HomePage from './components/home/homePage';
import history from './components/history/history';
import './App.css';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter history={history} >
                <React.Fragment >
                    <NavBar/>
                    <div className = "main-content" >
                        <Switch>
                            <Route path = "/" exact
                            component = { HomePage }
                            />{" "}
                            <Route path = "/lin-reg" exact 
                            component = { LinRegAbout }
                            />{" "}
                            <Route path = "/lin-reg/train" exact 
                            component = { LinRegTrain }
                            />{" "}
                            <Route path = "/lin-reg/test" exact 
                            component = { LinRegTest }
                            />{" "}
                            <Route path = "/lin-reg/result" exact
                            component = { LinRegResult }
                            />{" "}
                            <Route path = "/log-reg" exact 
                            component = { LogRegAbout }
                            />{" "}
                            <Route path = "/log-reg/train" exact 
                            component = { LogRegTrain }
                            />{" "}
                            <Route path = "/log-reg/test" exact 
                            component = { LogRegTest }
                            />{" "}
                            <Route path = "/log-reg/result" exact
                            component = { LogRegResult }
                            />{" "}
                            <Route path = "/svm" exact
                            component = { SVMAbout }
                            />{" "}
                            <Route path = "/svm/train" exact 
                            component = { SVMTrain }
                            />{" "}
                            <Route path = "/svm/test" exact 
                            component = { SVMTest }
                            />{" "}
                            <Route path = "/svm/result" exact
                            component = { SVMResult }
                            />{" "}
                            <Route path = "/nb" exact
                            component = { NBAbout }
                            />{" "}
                            <Route path = "/nb/train" exact 
                            component = { NBTrain }
                            />{" "}
                            <Route path = "/nb/test" exact 
                            component = { NBTest }
                            />{" "}
                            <Route path = "/nb/result" exact
                            component = { NBResult }
                            />{" "}
                            <Route path = "/k-means" exact
                            component = { KMeansAbout }
                            />{" "}
                            <Route path = "/k-means/train" exact 
                            component = { KMeansTrain }
                            />{" "}
                            <Route path = "/k-means/test" exact 
                            component = { KMeansTest }
                            />{" "}
                            <Route path = "/k-means/result" exact
                            component = { KMeansResult }
                            />{" "}
                        </Switch>{" "}
                    </div>{" "} 
                </React.Fragment>{" "} 
            </BrowserRouter>
        );
    }
};