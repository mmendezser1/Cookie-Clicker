/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import "./App.css";

import roundToDecimal from "./roundToDecimal";

function App() {
  const [cookies, setCookies] = useState(200);
  const [improvements, setImprovements] = useState<number[]>([]);
  const [improve_autoClick, setAutoClick] = useState({
    improve: 0.1,
    price: 10,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      applyImprovements();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [improvements]);

  const applyImprovements = () => {
    const totalImprovements = improvements.reduce(
      (total, increment) => total + increment,
      0
    );
    console.log(totalImprovements);
    setCookies((prevCookies) =>
      roundToDecimal(prevCookies + totalImprovements, 1)
    );
  };

  const buyCookies = () => {
    if (cookies < improve_autoClick.price) return;

    const newImprov = [...improvements, improve_autoClick.improve];
    console.log(newImprov);
    setImprovements(newImprov);
    setCookies(cookies - improve_autoClick.price);
    setAutoClick({
      improve: Number(improve_autoClick.improve + 0.1),
      price: improve_autoClick.price * 1.2,
    });
  };

  const handleClick = () => {
    setCookies((prevCookies) => prevCookies + 1);
  };
  return (
    <>
      <h1>Cooking Clicker</h1>
      <h3> {roundToDecimal(cookies, 0)} cookies</h3>
      <p>
        {roundToDecimal(
          improvements.reduce((total, increment) => total + increment, 0),
          1
        )}{" "}
        Cookies per second
      </p>
      <article>
        <div className="card">
          <button className="card__button" onClick={handleClick}>
            COOKIE
          </button>
        </div>
      </article>

      {cookies >= 10 && (
        <article className="article_addcookies">
          <button className="card__button" onClick={() => buyCookies()}>
            Improve {roundToDecimal(improve_autoClick.improve, 1)} Autoclick -
            PRICE: {roundToDecimal(improve_autoClick.price, 1)}
          </button>
          {/* <button
            className="card__button"
            onClick={() => buyCookies(IMPROVES.GRANDMA)}
          >
            Grandma
          </button>
          <button
            className="card__button"
            onClick={() => buyCookies(IMPROVES.FACTORY)}
          >
            Factory
          </button> */}
        </article>
      )}
    </>
  );
}

export default App;
