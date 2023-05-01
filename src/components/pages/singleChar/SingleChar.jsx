import './singleChar.scss';

 const SingleChar = ({data}) => {
    const {name, description, thumbnail, } = data;

    return (
        <>
            <img src={thumbnail} alt={name} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
               
        </>
    )
}
export default SingleChar;