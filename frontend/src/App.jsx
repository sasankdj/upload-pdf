import { useState } from "react";
import Upload from "./components/Upload";
import FileList from "./components/FileList";
import Search from "./components/Search";
import Login from "./components/Login";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Smart PDF Organizer</h1>

      {!isLoggedIn && <Login />}

      <button onClick={() => setIsLoggedIn(true)}>
        ✅ I Logged In
      </button>

      <Upload 
        refresh={() => setRefresh(!refresh)} 
        isLoggedIn={isLoggedIn}
      />

      <Search setSearch={setSearchQuery} />

      <FileList 
        searchQuery={searchQuery} 
        key={refresh} 
      />
    </div>
  );
}

export default App;