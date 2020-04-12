import React from 'react';
import {Header} from 'semantic-ui-react';
import './homePage.css';
import Drag from './../Drag';

export const HomePage = _ => {
    return (
        <div className='home-page'>
            <Header size='huge'>
                Welcome to the Classical Machine Learning Visualizer!
            </Header>
            <br/>
            <Header size='huge'>               
                Upload the dataset (in csv, json or yaml) on which you would like to visualize the Machine Learning models.
            </Header>
            <br/>
            <Drag/>
        </div>
    );
}