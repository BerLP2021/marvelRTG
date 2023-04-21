import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Transition, TransitionGroup } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const ComicsItem = ({id, title, thumbnail, price, style}) => {
    return (
        <li className="comics__item" 
            style={{...style}}
            >
            <Link to={`/comics/${id}`}>
                <img src={thumbnail} 
                    alt={title} 
                    className="comics__item-img"
                    style={{objectFit: thumbnail.includes('image_not_available.jpg') ? 'fill' : ''}}/>
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price"
                    style={{color: price ? '' : '#9F0013'}}
                >{price ? price + '$' : 'out of stock'}</div>
            </Link>
        </li>
    )
}

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const limit = 8;
    const [offset, setOffset] = useState(0);
    const [showBtn, setShowBtn] = useState(false);

    const {error, loading, blockBtn, clearError, getAllComics} = useMarvelService();

    const onUpdateComics = (offset, limit, initialLoad = false) => {
        clearError();
        // initialLoad ? setShowBtn(false) : setShowBtn(true);
        getAllComics(offset, limit)
            .then(onComicsLoaded)
    }
    const onComicsLoaded = (newComics) => {
        setComics(comics => [...comics, ...newComics]);
        setOffset(offset => offset + limit);
        setShowBtn(newComics.length > 7 ? true : false);
    }
    
    useEffect(() => {
        onUpdateComics(offset, limit, true);
        // eslint-disable-next-line
    }, []);

    const viewItems = (arr) => {
        return (
            arr.map(({id, title, thumbnail, price}, i) => {
                const defaultStyle = {
                    transition: `opacity 300ms ease-in-out ${i%8 * 0.18}s, transform 300ms ease-in-out`,
                    opacity: 0,
                };
                const transitionStyles = {
                    entering: { opacity: 0 },
                    entered: { opacity: 1},
                    exiting: { opacity: 0 },
                    exited: { opacity: 0 },
                };
                return (
                    <Transition key={i} timeout={600}>
                        {state => (
                            <ComicsItem
                                id={id} 
                                title={title} 
                                thumbnail={thumbnail} 
                                price={price}
                                style={{...defaultStyle,
                                        ...transitionStyles[state]}}
                            />)
                        }
                    </Transition>
                )
            })
        )
    }
    
    const items = viewItems(comics);
    const errorMsg = error ? <ErrorMessage/> : null;
    const spinner = loading && !showBtn ? <Spinner/> : null;
    
    return (
        <>
            <div className="comics__list">
                {spinner}
                {errorMsg}
                <ul className="comics__grid">
                    <TransitionGroup component={null}>
                        {items}
                    </TransitionGroup>
                </ul>
                <button className="button button__main button__long"
                    onClick={() => onUpdateComics(offset, limit)}
                    disabled={blockBtn}
                    style={{display: showBtn ? '' : 'none'}}
                    >
                    <div className="inner">load more</div>
                </button>
            </div>   
        </>
    );
}

export default ComicsList;