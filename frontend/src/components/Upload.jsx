import { useState } from "react";
import axios from "axios";

export default function Upload({ refresh, isLoggedIn }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!isLoggedIn) {
      return alert("Please login first");
    }

    if (!file) return alert("Select file");

    const formData = new FormData();
    formData.append("file", file);

    try {
     await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData);
      alert("Uploaded!");
      refresh();
    } catch (err) {
      alert("Upload failed");
      console.log(err);
    }
  };

  return (
    <div>
      <h3>Upload PDF</h3>

      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files[0])} 
      />

      <button onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}