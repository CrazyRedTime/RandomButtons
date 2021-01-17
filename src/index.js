import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';


const getRandomNumber = (max) => {
  const rand = 0 + Math.random() * (max + 1 - 0);
  return Math.floor(rand);
}


const Button = (props) => {
  const value = props.value;
  return (
    <button disabled={props.disabled} onClick={props.click}>{value}</button>
  )
}

const Buttons = () => {
  const [buttonsCount, setButtonsCount] = useState(null);
  const [totalClicks, setTotalClicks] = useState(0);
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [formValueButtons, setFormValueButtons] = useState('');
  const [formValueTimer, setFormValueTimer] = useState('');
  const [timer, setTimer] = useState(0);
  const [gameIsStarted, setGameIsStarted] = useState(false);

  const stopGame = () => {
    setActiveButtonIndex(null);
    setGameIsStarted(false);
  }

  const click = (e) => {
    e.preventDefault();
    const newActiveButton = getRandomNumber(buttonsCount - 1);
    setActiveButtonIndex(newActiveButton);
    setTotalClicks(totalClicks + 1);
  }

  const buttonsCountChange = (e) => {
    e.preventDefault();
    setFormValueButtons(e.target.value)
  }

  const timerOnChange = (e) => {
    e.preventDefault();
    setFormValueTimer(e.target.value);
  }

  const changeTimer = () => {
    if (timer) {
      setTimer(timer - 1 )
    }
  }

  const formSubmit = (e) => {
    e.preventDefault();
    const newButtonsCount = Number(formValueButtons);
    const secondsCount = Number(formValueTimer);
    setButtonsCount(newButtonsCount);
    setActiveButtonIndex(getRandomNumber(newButtonsCount - 1));
    setTimer(secondsCount);
    setTotalClicks(0);
    setGameIsStarted(true);
    setTimeout(stopGame, secondsCount * 1000);
    let timerId = setInterval(changeTimer, 1000);
    setTimeout(() => { clearInterval(timerId)}, secondsCount * 1000);
  }

  const renderForm = () => {
    return (
      <form onSubmit={formSubmit}>
        <label>
          Enter buttons count&#40;must be less than 300 and multiple of 10&#41;
          <input type="number" required min='10' max='300' step='10' onChange={buttonsCountChange} value={formValueButtons} />
        </label>
        <label>
          Enter timer value&#40;must be between 5 and 20 and multiple of 5&#41;
          <input type="number" required min='5' max='20' step='5' onChange={timerOnChange} value={formValueTimer} />
        </label>
        <input type="submit" value="Start the game!" disabled={gameIsStarted}/>
      </form>
    )
  }

  const renderState = () => {
    if (buttonsCount) {
      return (
        <h3>Total clicks on buttons: {totalClicks}. Time left: {timer} seconds</h3>
      )
    }
    return null;
  }

  const buttons = [];
  const activeButton = activeButtonIndex;
  for (let i = 0; i < buttonsCount; i++) {
    buttons.push(<Button key={i} disabled={!(i === activeButton)} click={click} value={i === activeButton ? 'Active' : 'Disabled'}/>)
  }
  return (
       <>
      {renderForm()}
      {buttons}
      {renderState()}
      </>
  )
}



ReactDOM.render(
  <Buttons />,
  document.querySelector('.buttons')
);