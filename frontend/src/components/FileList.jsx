import { useEffect, useState } from "react";
import axios from "axios";

export default function FileList({ searchQuery }) {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    let url = "http://localhost:5000/api/files";

    if (searchQuery) {
      url = `http://localhost:5000/api/search?q=${searchQuery}`;
    }

    const res = await axios.get(url);
    setFiles(res.data);
  };

  useEffect(() => {
    fetchFiles();
  }, [searchQuery]);

  return (
    <div>
      <h3>Files</h3>

      {files.length === 0 && <p>No files yet</p>}

      {files.map((file, i) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <a href={file.driveLink} target="_blank">
            {file.name}
          </a>
          <p>Topics: {file.topics.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}