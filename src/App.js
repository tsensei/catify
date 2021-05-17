import React, { useEffect, useState } from "react";

function App() {
  const [catQuote, setCatQuote] = useState("Loading");
  const [catData, setCatData] = useState([]);

  //Algorithm for shuffling the id array

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  useEffect(() => {
    async function fetchCatQuote() {
      await fetch("https://catfact.ninja/fact")
        .then((res) => res.json())
        .then((result) => setCatQuote(result.fact));
    }

    fetchCatQuote();
  }, []);

  useEffect(() => {
    async function fetchCatData() {
      await fetch("https://cataas.com/api/cats?limit=500")
        .then((res) => res.json())
        .then((results) => {
          let tempData = [];
          results.map((result) => {
            tempData.push(result.id);
          });

          setCatData(tempData);
        });
    }

    fetchCatData();
  }, []);

  function catCB() {
    if (typeof catData[0] !== "undefined") {
      console.log(catData);
    }
  }

  return (
    <div className="App">
      <header>
        <div className="header">Catify</div>
        <div className="subHeader">Your daily does of Cats</div>
        <div className="quote">“{catQuote}”</div>
      </header>
      <main>
        {typeof catData[0] !== undefined ? (
          catData.slice(0, 10).map((data) => {
            return (
              <div className="imgDiv">
                <img
                  alt="cats"
                  className="catImg"
                  src={`https://cataas.com/cat/${data}`}
                ></img>
              </div>
            );
          })
        ) : (
          <h1>loading</h1>
        )}
      </main>
    </div>
  );
}

export default App;
