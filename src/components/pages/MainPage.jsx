import React, { useState } from 'react';

import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { SearchForm } from '../searchForm/SearchForm';

import '../../style/style.scss';

const MainPage = () => {
    const [randomCharId, setRandomCharId] = useState(null);
  
    const getRandomChar = (randomCharId) => {
      setRandomCharId(randomCharId);
    }

    return (
        <div >
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList getRandomChar={getRandomChar}/>
                </ErrorBoundary>
                <div className='sticky-block'>
                    <ErrorBoundary>
                        <CharInfo randomCharId={randomCharId}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <SearchForm />
                    </ErrorBoundary>
                </div>
                
            </div>
        </div>
    )
}

export default MainPage