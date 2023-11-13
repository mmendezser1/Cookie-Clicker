/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";
import roundToDecimal from "./roundToDecimal";

function App() {
  const [cookies, setCookies] = useState(0);
  const [improvements, setImprovements] = useState<number[]>([]);
  const [improveAutoClick, setAutoClick] = useState({
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
    if (cookies < improveAutoClick.price) return;

    const newImprov = [...improvements, improveAutoClick.improve];
    setImprovements(newImprov);
    setCookies(cookies - improveAutoClick.price);
    setAutoClick({
      improve: Number(improveAutoClick.improve + 0.1),
      price: improveAutoClick.price * 1.2,
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
          <img
            onClick={handleClick}
            className="card__image"
            src="/src/assets/images/cookie.png"
            alt="cookie_image"
          />
        </div>
      </article>

      {cookies >= improveAutoClick.price && (
        <article className="article_addcookies">
          <button
            className="card__button"
            onClick={() => buyCookies()}
            title={
              "The Cookie Counter improves " +
              roundToDecimal(improveAutoClick.improve, 1) +
              " cookies/second"
            }
          >
            Improve AutoClick - PRICE:{" "}
            {roundToDecimal(improveAutoClick.price, 1)} cookies
          </button>
        </article>
      )}
    </>
  );
}

export default App;
