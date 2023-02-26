import React, { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    fetch("/data.txt")
      .then((response) => response.text())
      .then((data) => {
        const results = data
          .split("\n")
          .filter((line) =>
            line.toLowerCase().startsWith(searchTerm.toLowerCase())
          );
        setSearchResults(results);
      });
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container-md shadow-lg rounded-4 position-absolute top-50 start-50 translate-middle bg-white p-0">
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="align-self-start my-2">
            <img
              src="https://dictionary.hasindu.online/img/Aicon.png"
              alt="Sinhala-English Dictionary logo"
              width="80"
              height="80"
              className="mx-3"
            />
            <h1 className="my-2 text-primary">Sinhala-English Dictionary</h1>
          </div>
          <div className="align-self-center my-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter search term..."
                value={searchTerm}
                onChange={handleInputChange}
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        {searchResults.length > 0 && (
          <div className="my-3">
            <h2>Search Results:</h2>
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
