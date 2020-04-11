import React from 'react';
import {Header} from 'semantic-ui-react';
import './homePage.css';


export const HomePage = _ => {
    return (
        <div className='home-page'>
            <Header size='huge'>
                Welcome to the Classical Machine Learning Visualizer!
            </Header>
            <p>
                DWM MINI PROJECT 
            </p>
        </div>
    );
}