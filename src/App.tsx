import { useEffect, useState } from "react";

import "./App.css";
import ImproveType from "./ImproveType";
import roundToDecimal from "./roundToDecimal";
//Mejorarel tema de mejoras. Que suba precios y la mejora
function App() {
  const IMPROVES = {
    AUTOCLICK: { improve: 0.1, price: 10 },
    GRANDMA: { improve: 1, price: 15 },
    FACTORY: { improve: 5, price: 100 },
  };
  const [cookies, setCookies] = useState(0);
  const [improvements, setImprovements] = useState<number[]>([]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      applyImprovements();
    }, 1000);

    return () => {
      // Limpiar el intervalo al desmontar el componente
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

  const buyCookies = (improve: ImproveType) => {
    if (cookies < improve.price) return;
    const newImprov = [...improvements, improve.improve];
    console.log(newImprov);
    setImprovements(newImprov);
    setCookies(cookies - improve.price);
  };

  const handleClick = () => {
    setCookies((prevCookies) => prevCookies + 1);
  };
  return (
    <>
      <h1>Cooking Clicker</h1>
      <h3> {roundToDecimal(cookies, 0)} cookies</h3>
      <p>
        {improvements.reduce((total, increment) => total + increment, 0)}{" "}
        cookies per second
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
          <button
            className="card__button"
            onClick={() => buyCookies(IMPROVES.AUTOCLICK)}
          >
            Autoclick{" "}
          </button>
          <button
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
          </button>
        </article>
      )}
    </>
  );
}

export default App;
