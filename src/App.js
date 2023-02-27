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

        if (nothingNew.length === 0) {
          setSearchResults([`Error: ${formattedInput} not found`]);
        } else {
          setSearchResults([...nothingNew, ...results]);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container-md shadow-lg rounded-4 position-absolute top-50 start-50 translate-middle bg-white p-0">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossorigin="anonymous"
      />
      <div className="container p-2">
        <div className="input-group mb-3 px-3">
          <input
            type="text"
            className="form-control shadow-lg my-2 rounded-3 py-2"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className="btn btn-success text-white btn-outline-success shadow-lg mx-1 my-2 rounded-3"
            type="button"
            id="button-addon2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="container shadow-lg rounded-4 px-2 py-2">
          <ul
            className="list-group list-group-flush overflow-y-auto shadow-sm p-1 rounded-3"
            style={{ maxHeight: "250px", overflow: "auto" }}
          >
            {searchResults.map((result, index) => (
              <div key={index + 1}>
                <li className="list-group-item font-weight-bold">{result}</li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
