/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import "./App.css";
// import ImproveType from "./ImproveType";
import roundToDecimal from "./roundToDecimal";

function App() {
  const [cookies, setCookies] = useState(0);
  const [improvements, setImprovements] = useState<number[]>([]);
  const [improve_autoClick, setAutoClick] = useState({
    improve: 0.1,
    price: 10,
  });
  //TODO => Pensemos. Tengo una serie de mejoras, las tendré que manejar con el useState
  //Hago un estado por cada mejora? O un array de mejoras
  // const IMPROVES = {
  //   AUTOCLICK: { ...improve_autoClick, setAutoClick },
  //   GRANDMA: { improve: 1, price: 15 },
  //   FACTORY: { improve: 5, price: 100 },
  // };
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
      price: improve_autoClick.price + improve_autoClick.price * 0.2,
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
            Autoclick - PRICE: {improve_autoClick.price}
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
