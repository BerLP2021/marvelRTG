import React, { useState, useEffect} from 'react';
import { CSSTransition } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/mjolnir.png';

const RandomChar = () => {
    
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();
    const [inProp, setInProp] = useState(false);
    
    const updateRandomChar = () => {
        clearError();
        setInProp(false);

        const rand = Math.floor(1011000 + Math.random() * (1011400 - 1011000 + 1));
        getCharacter(rand)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setInProp(true);
    }
    
    useEffect(() => {
        updateRandomChar();
        // const interval = setInterval(updateRandomChar, 5000);
        // return () => clearInterval(interval);
         // eslint-disable-next-line
    }, []);
    
    const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(error || loading || !char) ? <View char={char}/> : null;

    return (
        <>
            <div className="randomchar">
                <div>
                {errorMessage}
                {loading ? <Spinner/> : <CSSTransition 
                        classNames='randomchar__block' 
                        in={inProp} 
                        timeout={500}
                        unmountOnExit
                        >
                            <View char={char}/>
                    </CSSTransition>
                    }
                
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main"
                        onClick={updateRandomChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        </>
    );
}
const View = ({char}) => {
    let {name, description, thumbnail, homepage, wiki} = char;
    
    if(description && description.length > 120) {
        description = description.slice(0, 120) + '...';
    }
    if(name && name.length > 18) {
        name = name.slice(0, 18) + '...';
    }
    return (
        <div className='randomchar__block'>
            <img src={thumbnail} 
                alt="Random character" 
                className="randomchar__img"
                style={{objectFit: thumbnail.includes('image_not_available.jpg') ? 'fill' : ''}}
                />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>    
    )
}

export default RandomChar;