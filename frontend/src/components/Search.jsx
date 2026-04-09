import { useState } from "react";

export default function Search({ setSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Search topics..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSearch(e.target.value);
        }}
      />
    </div>
  );
}