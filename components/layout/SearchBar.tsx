
import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon, SparklesIcon } from '../icons/IconComponents';
import { Contract } from '../../types';

const mockSearchResults: Partial<Contract>[] = [
    { id: 'c-001', title: 'Master Service Agreement', parties: ['Innovate Inc.'] },
    { id: 'c-005', title: 'Marketing Services Agreement', parties: ['Vista Marketing'] },
];


const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [results, setResults] = useState<Partial<Contract>[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Mock API call
        if (query.length > 2) {
            setResults(mockSearchResults.filter(c => c.title?.toLowerCase().includes(query.toLowerCase())));
        } else {
            setResults([]);
        }
    }, [query]);

    const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setIsFocused(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={searchRef}>
            <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Ask anything: 'Show all NDAs expiring next month'..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    className="block w-full bg-gray-100 border border-transparent rounded-md py-2 pl-10 pr-10 text-sm placeholder-gray-500 focus:outline-none focus:bg-white focus:border-primary-500 focus:ring-primary-500"
                />
                 <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-primary-600" aria-label="Ask AI">
                    <SparklesIcon className="h-5 w-5" />
                </button>
            </div>
            {isFocused && query.length > 0 && (
                 <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-30">
                     {results.length > 0 ? (
                        <ul className="py-1">
                            {results.map(result => (
                                <li key={result.id} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                    <p className="font-medium">{result.title}</p>
                                    <p className="text-xs text-gray-500">{result.parties?.join(', ')}</p>
                                </li>
                            ))}
                        </ul>
                     ) : (
                        <p className="px-4 py-3 text-sm text-gray-500">
                            {query.length > 2 ? 'No results found.' : 'Keep typing to see results.'}
                        </p>
                     )}
                 </div>
            )}
        </div>
    );
};

export default SearchBar;