import React from 'react';
import { MiniNavBar } from './NavBar';
import {PieChart} from '../visualization/pie.js';
import {BarChart} from '../visualization/bar.js';
import {LineChart} from '../visualization/line.js';
import {DoughnutChart} from '../visualization/doughnut.js';
import { Header } from 'semantic-ui-react';
import { BrowserRouter as Switch, Route, Link } from 'react-router-dom'; 

export const LogVisualize = _ => {
     return (

                <div>
                <MiniNavBar />
                <br /><br />
                <Header size='huge'>
                    Logistic Regression:
                </Header>
                <br /><br />
                <div class="row">
                     <div class="col-sm-1"> </div> 
                    <div class="col-sm-2">
                        <Link to={'/svm/visualize/PieChart'} className="nav-link btn btn-info">Piechart</Link> 
                    </div>
                    <div class="col-sm-2">
                        <Link to={'/svm/visualize/LineChart'} className="nav-link btn btn-info">LineChart</Link> 
                    </div>
                    <div class="col-sm-2">
                        <Link to={'/svm/visualize/BarChart'} className="nav-link btn btn-info">BarChart</Link> 
                    </div>
                    <div class="col-sm-2">
                        <Link to={'/svm/visualize/DoughnutChart'} className="nav-link btn btn-info">DoughnutChart</Link> 
                    </div>
                    <div class="col-sm-1"> </div> 
                </div>
                <div className="container">
                    <Switch>
                        <Route exact path='/svm/visualize/PieChart' component={PieChart} />
                        <Route exact path='/svm/visualize/LineChart' component={LineChart} />
                        <Route exact path='/svm/visualize/BarChart' component={BarChart} />
                        <Route exact path='/svm/visualize/DoughnutChart' component={DoughnutChart} />

                    </Switch>
               </div>
               </div>
     );
  }
  