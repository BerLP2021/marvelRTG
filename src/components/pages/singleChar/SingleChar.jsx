import {Helmet} from 'react-helmet';

import './singleChar.scss';

 const SingleChar = ({data}) => {
    const {name, description, thumbnail, } = data;

    return (
        <>
             <Helmet>
                <meta
                    name="description"
                    content={`${name} comic page`}
                />
                <title>{name + ` page`}</title>
            </Helmet>
            <img src={thumbnail} 
                alt={name} 
                className="single-char__img"
                style={{objectFit: thumbnail.includes('image_not_available.jpg') ? 'fill' : ''}}
                />
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
               
        </>
    )
}
export default SingleChar;