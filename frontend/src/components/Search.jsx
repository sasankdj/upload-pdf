import { useState } from "react";

export default function Search({ setSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    setSearch(query);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <input
        type="text"
        placeholder="Search topics or file name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleSearch}>
        🔍 Search
      </button>
    </div>
  );
}