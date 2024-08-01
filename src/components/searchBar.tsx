'use client';

import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');

  const items = [
    { id: 1, name: '' },
    { id: 2, name: '' },
    { id: 3, name: '' },
    { id: 4, name: '' },
    { id: 5, name: '' },
  ];

  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="max-w-lg p-4 sm:max-w-60">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
      />
    </div>
  );
};

export default SearchBar;
