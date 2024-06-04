"use client";

import { useSearchContext } from "@/lib/hooks";

function SearchForm() {
  const { searchQuery, onSearchQueryChange } = useSearchContext();
  return (
    <form className="w-full h-full">
      <input
        className="w-full h-full bg-white/20 px-5 rounded-md outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder:text-white/50"
        placeholder="Search pets"
        type="search"
        value={searchQuery}
        onChange={(e) => onSearchQueryChange(e.target.value)}
      />
    </form>
  );
}

export default SearchForm;
