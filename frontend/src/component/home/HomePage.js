import React from 'react';
import './HomePage.css';

class HomePage extends React.Component {
    
    render() {
        return (
            <div className = 'home-page'>
                <img className="imgCenter" src="bg.png" alt="Background" width="62%" height="62%" />    
            </div>
        );
    }
}

export default HomePage;