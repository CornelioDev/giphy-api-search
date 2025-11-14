import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

export const useGifs = () => {
    // Hooks
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [previousSearchTerms, setPreviousSearchTerms] = useState<string[]>([]);
    const gifsCache = useRef<Record<string, Gif[]>>({});
    
    // Event Handlers
    const handlePreviousTermsClick = async (term: string) => {
        if (gifsCache.current[term]) {
            setGifs(gifsCache.current[term]);
            return;
        }
        const gifs = await getGifsByQuery(term);
        setGifs(gifs);
        gifsCache.current[term] = gifs;
    };

    const handleSearch = async (query: string = '') => {
        if (query.length === 0) return;
        query = query.trim().toLocaleLowerCase();
        
        if (previousSearchTerms.includes(query)) {
            setGifs(gifsCache.current[query]);
            return
        };
        
        setPreviousSearchTerms([query, ...previousSearchTerms].splice(0, 8))
        const gifs = await getGifsByQuery(query);
        setGifs(gifs);

        // Store Gif list in cache
        gifsCache.current[query] = gifs;
    }

    return {
        // values
        gifs,
        previousSearchTerms,
        // Methods / Actions
        handlePreviousTermsClick,
        handleSearch
    }
}