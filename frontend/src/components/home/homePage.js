import React from 'react';
import {Header} from 'semantic-ui-react';
import './homePage.css';

var componentConfig = {
    iconFiletypes: ['.json', '.csv', '.yaml'],
    showFiletypeIcon: true,
    postUrl: '/uploadHandler'
};

export const HomePage = _ => {
    return (
        <div className='home-page'>
            <Header size='huge'>
                Welcome to the Classical Machine Learning Visualizer!
            </Header>
        </div>
    );
}