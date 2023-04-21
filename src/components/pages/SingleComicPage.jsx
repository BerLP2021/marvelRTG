import React, { useState, useEffect } from 'react';

import './singleComicPage.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { useParams, useNavigate} from 'react-router-dom';
import AppBanner from '../appBanner/AppBanner';

const SingleComicPage = (props) => {
    const [comic, setComic] = useState([]);

    const {error, loading, getComic} = useMarvelService();
    const {comicId} = useParams();
    const navigate = useNavigate();

    const onComicLoaded = (newComic) => {
        setComic(comic => newComic);
    }

    const updateComic = (id) => {
        if(!id) return;
        getComic(id).then(onComicLoaded);
    }

    useEffect(() => {
        updateComic(comicId);
    }, 
    // eslint-disable-next-line
    [comicId]);

    const handleBackBtn = (e) => {
        if( e.keyCode === 13 || e.keyCode === 32 ) {
            navigate(-1);
        }
    }

    const back = () => (
        <div 
            tabIndex='0' 
            onClick={() => navigate(-1)} 
            onKeyDown={(e) => handleBackBtn(e)}
            className="single-comic__back">
            Back to all
        </div>
    );
    const viewItem = (comic) => {
        const {title, description, language, thumbnail, pageCount, price} = comic;
        return (
            <>
                <img src={thumbnail} alt={title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount ? pageCount : 'n/a'} pages</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price"
                        style={{color: price ? '' : '#9F0013'}}>
                            {price ? price + '$' : 'out of stock'}
                    </div>
                </div>
                {back()}
            </>
        )
    }

    const errorMsg = error ? <ErrorMessage>{back()}</ErrorMessage> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading) ? viewItem(comic) : null
    
    return (
        <>
            <AppBanner/>
                {spinner}
                {errorMsg}
            <div className="single-comic">
                {content}
                {/* <Link to='/comics' className="single-comic__back">Back to all</Link> */}
            </div>   
        </>
    );
}

export default SingleComicPage;