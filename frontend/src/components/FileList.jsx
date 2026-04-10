import { useEffect, useState } from "react";
import axios from "axios";

export default function FileList({ searchQuery }) {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    let url = `${import.meta.env.VITE_API_URL}/files`;

    if (searchQuery) {
      url = `${import.meta.env.VITE_API_URL}/search?q=${searchQuery}`;
    }

    const res = await axios.get(url);
    setFiles(res.data);
  };

  useEffect(() => {
    fetchFiles();
  }, [searchQuery]);

  return (
    <div>
      <h2>📂 Your Notes</h2>

      {files.length === 0 && <p>No files found</p>}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {files.map((file, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              margin: "10px",
              width: "250px"
            }}
          >
            <h4>{file.name}</h4>

            <p>
              <strong>Topics:</strong> <br />
              {file.topics.join(", ") || "No topics"}
            </p>

            <a href={file.driveLink} target="_blank">
              📄 Open PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}