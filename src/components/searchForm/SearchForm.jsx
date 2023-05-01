import { useState }  from 'react'
import { Formik, Form, ErrorMessage as FormikErrorMessage, Field} from 'formik';
import * as Yup from 'yup';
import { CSSTransition } from 'react-transition-group';
import {Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './searchForm.scss';

const HeroList = ({search}) => {
    return (
        <ul>
            {!search ? 
                null : 
                search.length ?
                    search.map((hero, i) => (
                        <li 
                            key={i}
                            className="char__search-wrapper">
                            <div className='char__search-success'>{`There is! Visit ${hero.name} page?`}</div> 
                            <Link to={`/characters/${hero.id}`} className='button button__secondary'>
                                <div className="inner">
                                    to page
                                </div>
                            </Link> 
                        </li>
                    )) :
                    <div className="char__search-error">The character was not found. Check the name and try again</div>}
        </ul>
    )
}

export const SearchForm = () => {
    const {getCharacterByName, loading, error, clearError} = useMarvelService();
    const [inProp, setInProp] = useState(false);

    const [search, setSearch] = useState(null);

    const onSearchLoaded = (charList) => {
        setSearch(charList);
        setInProp(true);
    }

    const updateSearch = (charName) => {
        setInProp(false);
        clearError();
        getCharacterByName(charName)
            .then(onSearchLoaded);
    }
    
    
    const spinner = loading ? <Spinner/> : null;
    const errorMsg = error ? <ErrorMessage/> : null;

    const clearCharList = (e) => {
        setSearch(null);
    }

    return (
        <div className="char__search-form">

            <Formik
                initialValues={{ charName: '' }}
                validationSchema = {Yup.object({
                    charName: Yup.string()
                        .min(3, "Minimum 3 characters")
                        .required('This field is required')})}
                onSubmit={(values) => {
                    updateSearch(values.charName);
                }}
            >
                <Form onChange={clearCharList}>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                            id="charName" 
                            name='charName' 
                            type='search'
                            placeholder="Enter name"/>
                        <button type="submit" className="button button__main" disabled={loading}>
                            <div className="inner">
                                find
                            </div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>    
            </Formik>

            {spinner}
            {errorMsg}

           <CSSTransition in={inProp} timeout={500} classNames="char" unmountOnExit>
                <HeroList search={search} />
            </CSSTransition> 
            
        </div>
    )
}
