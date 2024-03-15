import React, { useState } from "react";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [quote, setquote] = useState("");
  const [auther, setauther] = useState("");
  const [userser, seruserset] = useState("Enter Word to Search");
  const [def, setdef] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function quotable() {
    fetch("https://api.quotable.io/random?maxLength=50")
      .then((res) => res.json())
      .then((data) =>
        console.log(setquote(data.content), setauther(data.author))
      );
  }
  window.addEventListener("load", quotable);

  const handleSearch = async () => {
    // setauther(null);
    // setquote(null);
    // Format the search term
    const formattedTerm = searchTerm.trim().toLowerCase();
    setdef(searchTerm);

    // Fetch the data file
    const { data } = await axios.get("/data.txt");

    // Split the data into lines
    const lines = data.split("\n");

    // Filter the lines that contain the search term
    const filteredLines = lines.filter((line) =>
      line.toLowerCase().includes(formattedTerm)
    );
    console.log(`filteredLines ${filteredLines} --------------`);
    /*filteredLines nothing	අභාවය, ආකිංචන්‍යය, කිසිත් නැතිබව, ශූන්‍යය,nothingness	අකිංචනය, අභාවය, ශූන්‍යය,nothings	පොඩි පොඩි දේ, වැදගැම්මකට නැති දේ -------------- */
    // If there are no results, show an error messagenpm start

    let aseLineForDisplay;
    if (filteredLines.length === 0) {
      seruserset(`We couldn't find this Word or Re-try without 'S' `);
      setdef(null);
      setSearchResults(["Click the Contribute Button below to add this word."]);
    } else {
      seruserset("Defintions of:");
      for (let i = 0; i < filteredLines.length; i++) {
        const lineByLine = filteredLines[i];
        // console.log(`Line By Line ${lineByLine} ---- end of lineByline -----`);

        const wordsArray = lineByLine.split("\t");
        const wordBeforeTab = wordsArray[0];
        aseLineForDisplay = lineByLine;
        // console.log(
        //   `wordBeforeTab this inside in for loop ${wordBeforeTab} --- end of wordBeforeTab `
        // ); // Output: "anew"
        if (wordBeforeTab === formattedTerm) {
          seruserset("Definition of:");
          // console.log("The strings are equal");

          // console.log(`This is line 310 ${aseLineForDisplay}`);
          const indexOfSearchElement = filteredLines.indexOf(aseLineForDisplay);
          //now remove  search elemelement
          filteredLines.splice(indexOfSearchElement, 1);
          filteredLines.unshift(aseLineForDisplay);

          break;
        } else {
          seruserset(`We couldn't find this Word or Re-try without 'S'`);

          aseLineForDisplay = `We haven't this word.But We can add it for you.Simply,click the "Contribute" button below`;
          // console.log("The strings are not equal");
        }

        // Process the line here...
      }

      // Move the matching line to the top of the results
      const index = filteredLines.findIndex((line) =>
        line.toLowerCase().includes(formattedTerm)
      );
      if (index !== 0) {
        filteredLines.splice(0, 0, filteredLines.splice(index, 1)[0]);
      }
      setSearchResults(filteredLines);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const onFocusInput = () => {
    // alert("defd");
    setSearchTerm("");
  };
  const onFocusInputClick = () => {
    // alert("defd");
    setSearchTerm("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <body className="px-1 bg">
      <div
        id="mainDiv"
        className="container-md shadow-lg rounded-4 position-absolute top-50 start-50 translate-middle bg-white p-0 overflow-y-auto"
      >
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
                href="https://dictionary.hasindu.me/"
                className="display-3 m-0 pb-1 fw-light text-center text-success text-decoration-none"
              >
                Dictionary
              </a>
            </div>

            <div>
              <img
                src="./Aicon.png	"
                width="74px"
                alt=""
                className="rounded-5 float-end my-1"
              />
            </div>
          </div>
        </div>
        <div
          className="container p-2"
          style={{ backgroundImage: `url("./curve.svg")` }}
          s
        >
          <div className="input-group mb-3 px-3">
            <input
              type="text"
              className="form-control shadow-lg my-2 rounded-3 py-2"
              placeholder="Search a Word"
              aria-label="Search a Word"
              aria-describedby="button-addon2"
              value={searchTerm}
              onClick={onFocusInputClick}
              onFocus={onFocusInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
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
          <div className="container m-0">
            <div className="d-flex justify-content-between">
              <div>
                <p
                  className="display-6 fs-5 fw-normal pl-2 text-muted text-body-tertiary"
                  id="usersearch"
                >
                  {userser}
                  <span
                    id="defe"
                    className="display-6 fw-normal text-success-emphasis"
                  >
                    {def}
                  </span>
                </p>
              </div>
              <div>
                <p>...</p>
              </div>
            </div>
          </div>
          <div className="container shadow-lg rounded-4 px-2 py-1 ">
            <div class="rounded-3 bg-white p-2  animate__animated animate__fadeIn animate__delay-2s">
              <p class=" blockquote m-0 lh-1 mb-1">{quote}</p>
              <p class="blockquote-footer m-0">{auther}</p>
              <hr />
            </div>

            <ul
              className="list-group list-group-flush overflow-y-auto shadow-sm p-1 rounded-3 "
              style={{ maxHeight: "250px", overflow: "auto" }}
            >
              {searchResults.map((result, index) => (
                <>
                  <li
                    key={index}
                    id="listItem"
                    className="list-group-item font-weight-bold animate__animated animate__fadeIn  "
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
        <div className="container m-0 rounded-3 py-0">
          <div className="d-flex justify-content-center mb-2 mt-3">
            <div className="">
              <a
                id="belowbtn"
                type="button"
                rel="noreferrer"
                variant="outline-success"
                className="btn btn-outline-success mx-1 btn-secondary bg-white rounded-3 belowbtn"
                target="_blank"
                b
                href="https://www.buymeacoffee.com/hasinduonline"
              >
                Support
              </a>
            </div>
            <div>
              <a
                id="belowbtn"
                type="button"
                rel="noreferrer"
                variant="outline-success"
                className="btn btn-outline-success mx-1 btn-secondary bg-white rounded-3"
                href="https://forms.gle/WNEV374a8y5pboxW6"
                target="_blank"
              >
                Contribute
              </a>
            </div>
            <div>
              <a
                id="belowbtn"
                type="button"
                rel="noreferrer"
                variant="outline-success"
                href="mailto:hello@hasindu.online"
                className="btn btn-outline-success mx-1 btn-secondary bg-white rounded-3"
              >
                Contact
              </a>
            </div>
          </div>
          <footer className="m-0">
            <p
              className="text-center text-black-50 text-break mb-2 mt-1"
              style={{ fontSize: "12px" }}
            >
              © 2024 Hasindu Rangika.
              <a
                target="_blank"
                rel="noreferrer"
                href="https://hasindu.me"
                id="hasinduOnline"
                className="text-decoration-none text-success-emphasis"
              >
                hasindu.me
              </a>
            </p>
          </footer>
        </div>
      </div>
    </body>
  );
}

export default App;
