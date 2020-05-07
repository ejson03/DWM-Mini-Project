import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LinRegAbout } from './component/linReg/About';
import { LinRegTrain } from './component/linReg/Train';
import { LinRegTest } from './component/linReg/Test';
import { LogRegAbout } from './component/logReg/About';
import { LogRegTrain } from './component/logReg/Train';
import { LogRegTest } from './component/logReg/Test';
import { SVMAbout } from './component/sVM/About';
import { SVMTrain } from './component/sVM/Train';
import { SVMTest } from './component/sVM/Test';
import { NBAbout } from './component/nB/About';
import { NBTrain } from './component/nB/Train';
import { NBTest } from './component/nB/Test';
import { KMeansAbout } from './component/kMeans/About';
import { KMeansTrain } from './component/kMeans/Train';
import {ViewCSV} from './component/viewCSV/ViewCSV';
import { NavBar } from './component/navBar/NavBar';
import HomePage from './component/home/HomePage';
import history from './component/history/History';
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
                            <Route path = "/view-dataset" exact
                            component = { ViewCSV }
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
                
                            <Route path = "/log-reg" exact 
                            component = { LogRegAbout }
                            />{" "}
                            <Route path = "/log-reg/train" exact 
                            component = { LogRegTrain }
                            />{" "}
                            <Route path = "/log-reg/test" exact 
                            component = { LogRegTest }
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
                        
                            <Route path = "/nb" exact
                            component = { NBAbout }
                            />{" "}
                            <Route path = "/nb/train" exact 
                            component = { NBTrain }
                            />{" "}
                            <Route path = "/nb/test" exact 
                            component = { NBTest }
                            />{" "}
                      
                            <Route path = "/k-means" exact
                            component = { KMeansAbout }
                            />{" "}
                            <Route path = "/k-means/train" exact 
                            component = { KMeansTrain }
                            />{" "}
                       
                        </Switch>{" "}
                    </div>{" "} 
                </React.Fragment>{" "} 
            </BrowserRouter>
        );
    }
};