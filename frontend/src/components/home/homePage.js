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
                This is a React application that uses D3.js to visualize several 
                classical machine learning algorithms. 
                All visualizations are computed through a Flask backend server. 
                Each page has a "Background" section (on the bottom) if you wish to learn 
                more about the algorithm itself.
            </p>
        </div>
    );
}