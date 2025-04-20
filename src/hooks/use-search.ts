import { useContext } from 'react';
import { SearchContext } from '@/providers/search-provider';

const useSearch = () => useContext(SearchContext);

export default useSearch;
