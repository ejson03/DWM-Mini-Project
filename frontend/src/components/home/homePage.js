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
            <Drag/>
        </div>
    );
}