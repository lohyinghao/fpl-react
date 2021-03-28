import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './ContributionPie.css';
import { MyContext } from '../App';
import _ from 'lodash';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

import Typography from '@material-ui/core/Typography';

const ContributionPie = () => {
  const state = useContext(MyContext);
  //const data = state.money.total || {}

  const playerMap = state.teamnames || {};
  const contribution = state.money['Total'] || {};
  const data = Object.entries(contribution).map(([id, money]) => ({
    name: playerMap[id],
    value: money,
  }));

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <>
      <ResponsiveContainer width='100%' height={360}>
        <PieChart>
          <Pie
            dataKey='value'
            data={data}
            fill='#8884d8'
            label={true}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

ContributionPie.propTypes = {};

ContributionPie.defaultProps = {};

export default ContributionPie;

//npx generate-react-cli component MyComponent
