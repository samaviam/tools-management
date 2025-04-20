import { createContext, useEffect, useState } from 'react';
import { CommandMenu } from '@/components/command-menu';

interface SearchContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchContext = createContext<SearchContextType>({
  open: false,
  setOpen: () => null,
});

const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <SearchContext.Provider value={{ open, setOpen }}>
      {children}

      <CommandMenu />
    </SearchContext.Provider>
  );
};

export default SearchProvider;
