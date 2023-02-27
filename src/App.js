import React, { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [Definition, setDefintion] = useState(`Defintions of:`);

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
          setDefintion("We couldn't definitons of:");
          setSearchResults([
            `If you got it Simply,Click the Contribute Button below to add this word.`,
          ]);
        } else {
          setSearchResults([...nothingNew, ...results]);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <body className="px-1 bg">
      <div className="container-md shadow-lg rounded-4 position-absolute top-50 start-50 translate-middle bg-white p-0">
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossorigin="anonymous"
        />
        <div className="container">
          <div className="d-flex justify-content-between">
            <div className="align-self-start my-2">
              <p
                className="lh-1 fw-semibold m-0 pt-1 text-black-80 text-success-emphasis"
                id="podiTitle"
              >
                Sinhala-English
              </p>
              <a
                href="https://dictionary.hasindu.online/"
                className="display-3 m-0 pb-1 fw-light text-center text-success text-decoration-none"
              >
                Dictionary
              </a>
            </div>

            <div>
              <img
                src="https://dictionary.hasindu.online/img/Aicon.png"
                width="74px"
                alt=""
                className="rounded-5 float-end my-1"
              />
            </div>
          </div>
        </div>
        <div className="container p-2">
          <div className="input-group mb-3 px-3">
            <input
              type="text"
              className="form-control shadow-lg my-2 rounded-3 py-2"
              placeholder="Search a Word"
              aria-label="Search a Word"
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
          <div
            className="container m-0"
            style={{
              backgroundColor: `linear-gradient(
            180deg,
            rgba(#3fe955, 0.15),
            rgba(#25b832, 0)
          )`,
            }}
          >
            <div className="d-flex justify-content-between">
              <div>
                <p className="display-6 fs-5 fw-normal pl-2 text-muted text-body-tertiary">
                  {Definition}
                  <span
                    id="defe"
                    className="display-6 fw-normal text-success-emphasis"
                  >
                    {inputValue}
                  </span>
                </p>
              </div>
              <div>
                <p>...</p>
              </div>
            </div>
          </div>
          <div className="container shadow-lg rounded-4 px-2 py-2">
            <ul
              className="list-group list-group-flush overflow-y-auto shadow-sm p-1 rounded-3"
              style={{ maxHeight: "250px", overflow: "auto" }}
            >
              {searchResults.map((result, index) => (
                <>
                  <li
                    key={index}
                    id="listItem"
                    className="list-group-item font-weight-bold"
                    style={{
                      fontFamily: "Noto Sans Sinhala",
                      fontWeight: "500",
                    }}
                  >
                    {result}
                  </li>
                </>
              ))}
            </ul>
          </div>
        </div>
        <div className="container m-0 rounded-3 py-2">
          <div className="d-flex justify-content-center mt-5 mb-2">
            <div className="">
              <a
                type="button"
                className="btn btn-outline-success mx-1 btn-secondary bg-white rounded-3"
                target="_blank"
                href="https://www.buymeacoffee.com/hasinduonline"
              >
                Support
              </a>
            </div>
            <div>
              <a
                type="button"
                className="btn btn-outline-success mx-1 btn-secondary bg-white rounded-3"
                href="https://forms.gle/WNEV374a8y5pboxW6"
                target="_blank"
              >
                Contribute
              </a>
            </div>
            <div>
              <a
                type="button"
                href="mailto:hello@hasindu.online"
                className="btn btn-outline-success mx-1 btn-secondary bg-white rounded-3"
              >
                Contact
              </a>
            </div>
          </div>
          <footer>
            <p
              className="text-center text-black-50 text-break"
              style={{ fontSize: "12px" }}
            >
              © 2023 Hasindu Rangika.
              <a
                target="_blank"
                href="https://hasindu.online"
                className="text-decoration-none text-success-emphasis"
              >
                hasindu.online
              </a>
            </p>
          </footer>
        </div>
      </div>
    </body>
  );
}

export default App;
