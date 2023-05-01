import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=5e71aeefead0f81920c8d6dc52f22ff5';
    const _baseOffset = 210;
    const {getResource, loading, blockBtn, error, clearError} = useHttp();

    const getAllCharacters = async (offset = _baseOffset, limit = 9) => {
        const res = await getResource(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset = 0, limit = 8) => {
        const res = await getResource(`${_apiBase}comics?orderBy=issueNumber&limit=${limit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }
    
    const getCharacter = async (id) => {
        const res = await getResource(`${_apiBase}characters/${id}?${_apiKey}`);
        return  _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        let res = await getResource(`${_apiBase}characters?nameStartsWith=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getComic = async (id) => {
        const res = await getResource(`${_apiBase}comics/${id}?${_apiKey}`);
        return  _transformComics(res.data.results[0]);
    }
    
    const _transformComics = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description || "А описание слизала корова",
            language: comic.textObjects[0]?.language || 'n/a',
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            pageCount: comic.pageCount,
            price: +comic.prices[0]?.price || +comic.prices[1]?.price
        }
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description || "А описание слизала корова",
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            comics: char.comics.items,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
    return {loading, blockBtn, error, clearError, getAllCharacters, getCharacterByName, getCharacter, getAllComics, getComic}
}

export default useMarvelService;