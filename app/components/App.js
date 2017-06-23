import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super(),
    this.state = {
      stuff: ''
    }
  }

  fetchWins(){
    fetch('/checkWins', {
            method: 'POST',
            body: JSON.stringify({ text: 'losses <@U5GFS4CAE|cb>' }),
            headers: { 'Content-Type': 'application/json' },
          })
          .then(resp => (resp.json()))
          .then(output => this.setState({stuff: output.text}))
          .catch(console.log('something did not happen'))
  }
  render() {
    return (
      <section className='main'>
        <div>handOUT</div>
        <h1>{this.state.stuff}</h1>
        <button onClick={() => this.fetchWins()}>Submit</button>
      </section>
    );
  }
}
