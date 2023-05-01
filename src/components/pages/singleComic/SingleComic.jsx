import './singleComic.scss';

import React from 'react'

const SingleComic = ({data}) => {
    const {title, description, language, thumbnail, pageCount, price} = data;

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
        </>
    )
}
export default SingleComic;

