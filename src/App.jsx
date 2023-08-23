import { useEffect, useState } from "react";
import "./App.css";
import Die from "./die.jsx";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

function App() {
  const [width, height] = useWindowSize({ fps: 60 });
  const randNum = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

  const originalState = [
    { id: 1, state: false, number: randNum() },
    { id: 2, state: false, number: randNum() },
    { id: 3, state: false, number: randNum() },
    { id: 4, state: false, number: randNum() },
    { id: 5, state: false, number: randNum() },
    { id: 6, state: false, number: randNum() },
    { id: 7, state: false, number: randNum() },
    { id: 8, state: false, number: randNum() },
    { id: 9, state: false, number: randNum() },
    { id: 10, state: false, number: randNum() },
  ];

  const [Tenzies, setTenzies] = useState(false);
  const [buttonState, setButtonState] = useState(originalState);

  useEffect(() => {
    if (checkAllSame()) {
      setTenzies(true);
    }
  }, [buttonState]);

  useEffect(() => {
    if (Tenzies) {
      console.log("game-over");
    }
  }, [Tenzies]);

  const toggleButtonState = (id) => {
    setButtonState((prevState) =>
      prevState.map((button) =>
        button.id === id ? { ...button, state: !button.state } : button
      )
    );
  };

  const rollNumber = () => {
    setButtonState((prevState) =>
      prevState.map((button) =>
        button.state ? button : { ...button, number: randNum() }
      )
    );
  };

  const resetGame = () => {
    setTenzies(false);
    setButtonState(originalState);
  };

  const buttons = buttonState.map((button) => (
    <Die
      key={button.id}
      state={button.state}
      number={button.number}
      toggleButtonState={() => toggleButtonState(button.id)}
    />
  ));

  //continue here, check if all the button number are same as firstNumber
  const checkAllSame = () => {
    const firstNumber = buttonState[0].number;
    const allStateTrue = buttonState.every((button) => button.state === true);
    if (allStateTrue) {
      return buttonState.every((button) => button.number === firstNumber);
    } else {
      return false;
    }
  };

  return (
    <main>
      <div className="textContainer">
        <h1>Tenzies</h1>
        <h3>
          Roll until all dice are the same. Click each die to freeze it at its
          curerent value between rolls.
        </h3>

        <div className="buttonContainer">{buttons}</div>
        {Tenzies ? (
          <div>
            <Confetti width={width} height={height} />
            <button className="rollButton" onClick={() => resetGame()}>
              <h3>Reset</h3>
            </button>{" "}
          </div>
        ) : (
          <div>
            <button className="rollButton" onClick={() => rollNumber()}>
              <h3>Roll</h3>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
