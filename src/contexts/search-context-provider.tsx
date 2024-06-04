"use client";

import { ReactNode, createContext, useState } from "react";

type SearchContextProviderProps = {
  children: ReactNode;
};

type TSearchContext = {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const onSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, onSearchQueryChange }}>
      {children}
    </SearchContext.Provider>
  );
}
