import { useState, useEffect } from "react";

interface Props {
    placeholder?: string;
    button?: string;
    onQuery: (query: string) => void;
}
export const SearchBar = ({ placeholder = 'Search...', button = 'Search', onQuery }: Props) => {
    const [query, setQuery] = useState('');
    
    useEffect(() => {
      const typingTimeOut = setTimeout(() => {
        onQuery(query)
      }, 700);
    
      return () => {
        clearTimeout(typingTimeOut);
      }
    }, [onQuery, query]);
    
    // Event Handlers
    const handleSearch = () => {
        onQuery(query);
        //setQuery('');
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
            //setQuery('');
        }
    };
    
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>{button}</button>
        </div>
    )
}