import React from 'react';
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

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonsCount: null,
      totalClicks : 0,
      activeButtonIndex: null,
      formValueButtons: '',
      formValueTimer: '',
      timer: 0
    }
  }

  stopGame = () => {
    this.setState({ activeButtonIndex: null })
  }

  click = (e) => {
    e.preventDefault();
    const newActiveButton = getRandomNumber(this.state.buttonsCount - 1);
    this.setState({ activeButtonIndex: newActiveButton });
    this.setState({ totalClicks: this.state.totalClicks + 1 });
  }

  ButtonsCountChange = (e) => {
    e.preventDefault();
    this.setState({ formValueButtons: e.target.value })
  }

  timerOnChange = (e) => {
    e.preventDefault();
    this.setState({ formValueTimer: e.target.value })
    
  }

  changeTimer = () => {
    if (this.state.timer) {
      this.setState({ timer: this.state.timer - 1 })
    }
  }

  formSubmit = (e) => {
    e.preventDefault();
    const buttonsCount = Number(this.state.formValueButtons);
    const secondsCount = Number(this.state.formValueTimer);
    this.setState({ buttonsCount: buttonsCount });
    this.setState({ activeButtonIndex: getRandomNumber(buttonsCount - 1) });
    this.setState({ timer: secondsCount })
    setTimeout(this.stopGame, secondsCount * 1000);
    setInterval(this.changeTimer, 1000);
  }

  renderForm () {
    return (
      <form onSubmit={this.formSubmit}>
        <label>
          Enter buttons count&#40;must be &#60;&#61;300 and multiple of 10&#41;
          <input type="number" required min='10' max='300' step='10' onChange={this.ButtonsCountChange} value={this.state.formValueButtons} />
        </label>
        <label>
          Enter timer value&#40;must be between 5 and 20 and multiple of 5&#41;
          <input type="number" required min='5' max='20' step='5' onChange={this.timerOnChange} value={this.state.formValueTimer} />
        </label>
        <input type="submit" value="Start the game!" />
      </form>
    )
  }

  renderState () {
    if (this.state.buttonsCount) {
      return (
        <h3>Total clicks on buttons: {this.state.totalClicks}. Time left: {this.state.timer} seconds</h3>
      )
    }
    return null;
  }

  render () {
    const buttons = [];
    const activeButton = this.state.activeButtonIndex;
    for (let i = 0; i < this.state.buttonsCount; i++) {
      buttons.push(<Button key={i} disabled={!(i === activeButton)} click={this.click} value={i === activeButton ? 'Active' : 'Disabled'}/>)
    }
    return (
        <>
        {this.renderForm()}
        {buttons}
        {this.renderState()}
        </>
    )
  }
}



ReactDOM.render(
  <Buttons />,
  document.querySelector('.buttons')
);