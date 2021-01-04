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
      formValue: null,
    }
  }

  click = (e) => {
    e.preventDefault();
    const newActiveButton = getRandomNumber(this.state.buttonsCount - 1);
    this.setState({ activeButtonIndex: newActiveButton });
    this.setState({ totalClicks: this.state.totalClicks + 1 });
  }

  formChange = (e) => {
    e.preventDefault();
    this.setState({ formValue: e.target.value })
  }

  formSubmit = (e) => {
    e.preventDefault();
    const buttonsCount = Number(this.state.formValue);
    if (Number.isInteger(buttonsCount) && !(buttonsCount % 10) && buttonsCount <= 300) {
      this.setState({ buttonsCount: buttonsCount });
      this.setState({ activeButtonIndex: getRandomNumber(buttonsCount - 1) });
      this.setState({ warning: false })
    } else {
      this.setState({ warning: true });
      this.setState({ buttonsCount: null });
    }
  }

  renderWarning () {
    if(this.state.warning) {
      return (
        <h3 className='warning'>Enter a number that meets the requirements</h3>
      )
    }
    return null;
  }

  renderForm () {
    return (
      <form onSubmit={this.formSubmit}>
        <label>
          Enter buttons count&#40;must be &#60;&#61;300 and multiple of 10&#41;
          <input type="text" onChange={this.formChange} value={this.state.value} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
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
        {this.renderWarning()}
        {buttons}
        <h3>Total clicks on buttons: {this.state.totalClicks}</h3>
        </>
    )
  }
}



ReactDOM.render(
  <Buttons />,
  document.querySelector('.buttons')
);