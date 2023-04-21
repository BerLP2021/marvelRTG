import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charInfo.scss';

const CharInfo = ({randomCharId}) => {
   
    const [char, setChar] = useState([]);
    const [inProp, setInProp] = useState(false);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    const duration = 500;

    const onCharLoaded = (char) => {
        setChar(char);
        setInProp(true);
    }

    const updateChar = () => {
        if (!randomCharId) return;
        setInProp(false);
        clearError();
        getCharacter(randomCharId)
            .then(onCharLoaded);
    }

    useEffect(() => {
        updateChar();
    }, [randomCharId]);

    const skeleton = !randomCharId ? <Skeleton/> : null;
    const errorMsg = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = randomCharId && !loading && !error ? <View char={char}/> : null ;

    return (
        <>
            <div className="char__info">
                {errorMsg}
                {skeleton}
                {spinner}
                <CSSTransition in={inProp} timeout={duration} classNames="char" unmountOnExit>
                    {/* {content} */}
                    <View char={char}/> 
                </CSSTransition>
            </div>
        </>
    );
}

const View = ({char: {name, description, thumbnail, comics = [], homepage, wiki}}) => {
   
    return (
        <>
            <div>
                <div className="char__basics">
                    <img 
                        src={thumbnail} 
                        alt={name}
                        style={{objectFit: thumbnail && thumbnail.includes('image_not_available.jpg') ? 'fill' : ''}}
                        />
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : 'The comics with current character are absent'}
                    {
                        // eslint-disable-next-line
                        comics.map(({name, resourceURI}, i) => {
                            if(i < 10) {
                                const comicId = resourceURI.split('/').at(-1);
                                return (
                                    <li className="char__comics-item" key={i}>
                                        <Link to={`/comics/${comicId}`}>{name}</Link>
                                    </li>
                            )}
                        })
                    }
                </ul>
            </div>
        </>        
    )
}

export default CharInfo;