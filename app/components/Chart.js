import React from 'react'
import PropTypes from 'prop-types';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

export const Chart = (props) => {
  const count = [
    {type: 'wins', count: props.state.wins},
    {type: 'losses', count: props.state.losses}
  ]

  if (!props.state.wins && !props.state.losses) {
    return <div className='no-props'>No wins or losses!</div>
  } else {
    return (
      <div className='with-props'>
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
    ) 
  }
};

Chart.propTypes = {
  props: PropTypes.object
}
