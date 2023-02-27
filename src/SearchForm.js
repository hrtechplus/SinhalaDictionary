import React, { useState } from "react";
import axios from "axios";
import fs from "fs";

const SearchForm = () => {
  const [input, setInput] = useState("");
  const [searchedWords, setSearchedWords] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const formattedInput = input.trim().toLowerCase();
    const words = fs.readFileSync("./data.txt", "utf-8").split("\n");

    const results = words.filter((word) =>
      word.trim().toLowerCase().includes(formattedInput)
    );
    setSearchedWords([formattedInput, ...searchedWords]);
    setSearchResults(results);
    setInput("");
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" value={input} onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>
      {searchedWords.length > 0 && (
        <div>
          <p>Searched words: {searchedWords.join(", ")}</p>
        </div>
      )}
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result) => (
            <li key={result}>{result}</li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchForm;
