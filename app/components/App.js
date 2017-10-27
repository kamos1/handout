import React, { Component } from 'react';

import Input from './Input';
import { Chart } from './Chart';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      wins: '',
      losses: ''
    };
    this.fetchWins = this.fetchWins.bind(this);
    this.fetchLosses = this.fetchLosses.bind(this);
  }

  fetchWins(username) {
    fetch(`/api/v1/user/${username}/getWins`, {
      method: 'GET',
    })
      .then(resp => (resp.json()))
      .then(output => this.setState({ wins: output.text }))
      .catch(error => ({ error }));
  }

  fetchLosses(username) {
    fetch(`/api/v1/user/${username}/getLosses`, {
      method: 'GET',
    })
      .then(resp => (resp.json()))
      .then(output => this.setState({ losses: output.text }))
      .catch(error => ({ error }));
  }

  render() {
    return (
      <section className="main">
        <h1 className="title">HANDOUT</h1>
        <Input fetchWins={this.fetchWins} fetchLosses={this.fetchLosses}/>
        <h2 className="output">Wins count: {this.state.wins}</h2>
        <h2 className="output">Losses count: {this.state.losses}</h2>
        <Chart state={this.state}/>
      </section>
    );
  }
}
