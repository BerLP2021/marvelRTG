import React, { useState, useEffect, useRef } from 'react';

import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { Transition, TransitionGroup } from 'react-transition-group';

function CharItem({id, name, thumbnail, i, myRef, handleCardClick, style}) {
    
    return (
        <li 
            className="char__item" 
            ref={el => {myRef.current[i] = el}}
            tabIndex={0}
            key={id} 
            id={id}
            onClick={(e) => handleCardClick(e, id)}
            // onFocus={() => hightlightCard(myRef[i])}
            onKeyDown={(e) => handleCardClick(e, id)}
            // onFocus={(e) => console.dir(e.target)}
            style={{...style}}
            >
            <img src={thumbnail} 
                alt={name}
                style={{objectFit: thumbnail.includes('image_not_available.jpg') ? 'fill' : ''}}
                />
            <div className="char__name">{name}</div>
        </li>    
    )
}

const CharList = ({getRandomChar}) => {

    const [characters, setCharacters] = useState([]);
    const limit = 9;
    const [offset, setOffset] = useState(210);
    const [showBtn, setShowBtn] = useState(false);

    const {loading, blockBtn, error, getAllCharacters, clearError} = useMarvelService();
    const loadCharacters = (offset, limit) => {
        clearError();
        getAllCharacters(offset, limit)
        .then(onCharLoaded)
    }
    
    const onCharLoaded = (newCharacters) => {
        setCharacters(characters => [...characters, ...newCharacters]);
        setOffset(offset => offset + limit);
        setShowBtn(newCharacters.length > 8 ? true : false);
    }

    const myRef = useRef([]);

    useEffect(() => {
        loadCharacters(offset, limit);
        // eslint-disable-next-line
    }, []);

    const hightlightCard = (el) => {
        myRef.current.forEach(item => item.classList.remove('char__item_selected'));
        el.classList.add('char__item_selected');
        el.focus();
    }

    const handleCardClick = (e, id) => {
        if(e.type === 'click') {
            getRandomChar(id);
            hightlightCard(e.currentTarget);
        
        } else if ( e.keyCode === 13 ) {
           e.preventDefault();
           hightlightCard(e.currentTarget);
           getRandomChar(id);
        }
    }
    const viewItems = (characters) => {
        // if(characters.length === 0 ) return;
       
        const charList = characters.map(({id, name, thumbnail}, i) => {
            const defaultStyle = {
                transition: `opacity 300ms ${i%9 * 0.25}s ease-in-out, transform 300ms ease-in-out`,
                opacity: 0,
            };
            const transitionStyles = {
                entering: { opacity: 0 },
                entered:  { opacity: 1 },
                exiting:  { opacity: 0 },
                exited:  { opacity: 0 },
            };
            return (
                <Transition
                    key={id}
                    timeout={300}
                >
                    {state => (<CharItem id={id} 
                            name={name}
                            thumbnail={thumbnail}
                            i={i}
                            myRef={myRef}
                            style={{...defaultStyle, ...transitionStyles[state]}}
                            handleCardClick={handleCardClick}
                        />)
                    }
                    {/* <li 
                        className="char__item" 
                        ref={el => {myRef.current[i] = el}}
                        tabIndex={0}
                        key={id} 
                        id={id}
                        onClick={(e) => handleCardClick(e, id)}
                        // onFocus={() => hightlightCard(myRef[i])}
                        onKeyDown={(e) => handleCardClick(e, id)}
                        // onFocus={(e) => console.dir(e.target)}         
                        >
                        <img src={thumbnail} 
                            alt={name}
                            style={{objectFit: thumbnail.includes('image_not_available.jpg') ? 'fill' : ''}}
                            />
                        <div className="char__name">{name}</div>
                    </li> */}
                </Transition>
            )
        });

        return <ul className="char__grid">
                <TransitionGroup component={null}>
                    {charList}
                </TransitionGroup>
            </ul>
    }

    const items = viewItems(characters);
    const errorMsg = error ? <ErrorMessage/> : null;
    const spinner = loading && !showBtn ? <Spinner/> : null;

    return (
        <>
            <div className="char__list">
                    {spinner}
                    {items}
                    {errorMsg}
                <button 
                    className="button button__main button__long"
                    onClick={() => loadCharacters(offset, limit)}
                    disabled={blockBtn}
                    style={{display: showBtn ? '' : 'none'}}
                    >
                    <div className="inner">load more</div>
                </button>
            </div>
        </>
    );
}

export default CharList;