import React from 'react';
import { Header } from 'semantic-ui-react';
import './HomePage.css';

class HomePage extends React.Component {
    
    render() {
        return (
            <div className = 'home-page'>
                <Header size = 'huge'>
                    ABC!
                </Header>
                <Header size = 'huge'>
                    XYZ
                </Header>
            </div>
        );
    }
}

export default HomePage;