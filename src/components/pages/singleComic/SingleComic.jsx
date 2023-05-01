import React from 'react';
import {Helmet} from 'react-helmet';

import './singleComic.scss';

const SingleComic = ({data}) => {
    const {title, description, language, thumbnail, pageCount, price} = data;

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comic page`}
                />
                <title>{title + ` page`}</title>
            </Helmet>
            <img src={thumbnail} 
                alt={title} 
                className="single-comic__img"
                style={{objectFit: thumbnail.includes('image_not_available.jpg') ? 'fill' : ''}}/>
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

