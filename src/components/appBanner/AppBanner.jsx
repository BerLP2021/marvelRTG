import React from 'react';

import './appBanner.scss';
import avengers_logo from '../../resources/Avengers_logo.png';
import avengers from '../../resources/Avengers.png';


const AppBanner = () => {
    return (
        <>
            <div className="app__banner">
                <img src={avengers} alt="Avengers"/>
                <div className="app__banner-text">
                    New comics every week!<br/>
                    Stay tuned!
                </div>
                <img src={avengers_logo} alt="Avengers logo"/>
            </div>   
        </>
    );
}

export default AppBanner;