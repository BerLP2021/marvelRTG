import React, { useState, useEffect } from 'react';

import './SinglePage.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({Component}) => {

    const [data, setData] = useState([]);
    const location = useLocation();
    const pageType = location.pathname.split('/').at(-2);
    const pageId = location.pathname.split('/').at(-1);

    const navigate = useNavigate();

    const {error, clearError, loading, getComic, getCharacter} = useMarvelService();

    const onComicLoaded = (data) => {
        setData(data);
    };

    const updateData = (id) => {
        clearError();
        if(!id) return;
        switch(pageType) {
            case 'comics':
                getComic(id).then(onComicLoaded);
                break;
            case 'characters':
                getCharacter(id).then(onComicLoaded);
                break;
            default: break    
        }
    }

    useEffect(() => {
        console.log('useEffect');
        updateData(pageId);
    }, 
    // eslint-disable-next-line
    []);

    const handleBackBtn = (e) => {
        if( e.keyCode === 32 ) {
            navigate(-1);
        }
    }

    const back = () => (
        <div 
            tabIndex='0' 
            onClick={() => navigate(-1)} 
            onKeyDown={(e) => handleBackBtn(e)}
            className="single-back">
            Back to all
        </div>
    );

    const errorMsg = error ? <ErrorMessage>{back()}</ErrorMessage> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading) ? 
        <div className="single">
            <Component data={data}/>
            {back()}
        </div> : null;

    return (
        <>
            <AppBanner/>
            {spinner}
            {errorMsg}
            {content}
        </>
    );

}

export default SinglePage;