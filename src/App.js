import React, { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const formattedInput = inputValue.trim().toLowerCase();
    fetch("data.txt")
      .then((response) => response.text())
      .then((data) => {
        const lines = data.split("\n");
        const results = [];
        const nothingNew = [];

        lines.forEach((line) => {
          const formattedLine = line.trim().toLowerCase();
          if (formattedLine.includes(formattedInput)) {
            if (formattedLine.startsWith(formattedInput)) {
              nothingNew.push(formattedLine);
            } else {
              results.push(formattedLine);
            }
          }
        });

        nothingNew.sort((a, b) => {
          if (a === formattedInput) {
            return -1;
          }
          if (b === formattedInput) {
            return 1;
          }
          return a.localeCompare(b);
        });

        setSearchResults([...nothingNew, ...results]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container-md shadow-lg rounded-4 position-absolute top-50 start-50 translate-middle bg-white p-0">
      <div className="container">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <ul className="list-group">
          {searchResults.map((result, index) => (
            <div key={index + 1}>
              <li className="list-group-item">{result}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
