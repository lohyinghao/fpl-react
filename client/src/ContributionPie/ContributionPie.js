import React, { useContext, useCallback, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Sector, Cell } from 'recharts';
import './ContributionPie.css';
import { MyContext } from '../App';
import _ from 'lodash';

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-12} textAnchor='middle' fill={'#424242'}>
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={8} textAnchor='middle' fill={'#424242'}>
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <text x={cx} y={cy} dy={26} textAnchor='middle' fill={'#424242'}>
        {`$${value}`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

const ContributionPie = () => {
  const state = useContext(MyContext);
  //const data = state.money.total || {}

  const playerMap = state.teamnames || {};
  const contribution = state.money['Total'] || {};
  const data = Object.entries(contribution).map(([id, money]) => ({
    name: playerMap[id].name,
    value: money,
    color: playerMap[id].color,
  }));

  // configuration for selection active region of chart
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <ResponsiveContainer width='100%' height={360}>
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          innerRadius={80}
          data={data}
          fill='#8884d8'
          dataKey='value'
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

ContributionPie.propTypes = {};

ContributionPie.defaultProps = {};

export default ContributionPie;
