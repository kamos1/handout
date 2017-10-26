import React, { Component } from 'react';
import * as Victory from 'victory';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

import Input from './Input';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      wins: '',
      losses: '',
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
    const count = [
      {type: 'wins', count: this.state.wins},
      {type: 'losses', count: this.state.losses}
    ]
    return (
      <section className="main">
        <h1 className="title">handOUT</h1>
        <Input fetchWins={this.fetchWins} fetchLosses={this.fetchLosses}/>
        <h1 className="output">Wins count: {this.state.wins}</h1>
        <h1 className="output">Losses count: {this.state.losses}</h1>
        <div className="chart">
          <VictoryChart
            domainPadding={50}
            theme={VictoryTheme.material}
          >
            <VictoryAxis
              tickValues = {[1, 2]}
              tickFormat={["wins", "losses"]}
            />
            <VictoryAxis
              dependentAxis={true}
            />
            <VictoryBar 
              data={count} 
              x="type"
              y="count"
            />          
          </VictoryChart>
        </div>
      </section>
    );
  }
}
