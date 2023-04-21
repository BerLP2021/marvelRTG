import { useCallback, useState } from "react";

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [blockBtn, setBlockBtn] = useState(false);

    const getResource = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json utf-8'}) => {
        setLoading(true);
        setBlockBtn(true);

        try {
            let res = await fetch(url, {method, body, headers});

            if(!res.ok) {
                throw new Error(`Это пиздец! Купи мозги! Статус ответа ${res.status}`);
            }
            setLoading(false);
            setBlockBtn(false);
            return await res.json();
        } catch(e) {
            setLoading(false);
            setError(true);
            setBlockBtn(false);
            throw e;
        }
    }, [])

    const clearError = useCallback(() => {
        setError(false);
    }, [])

    return {getResource, loading, blockBtn, error, clearError};
}

export default useHttp;