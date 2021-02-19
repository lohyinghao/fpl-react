import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './PointsLineChart.css';
import { MyContext } from '../App'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts";

const PointsLineChart = () => {
 
  const state = useContext(MyContext)
  //const data = state.money.total || {}

  const playerMap = state.teamnames || {}
  const totalPoints = state.totalPts || {}
  const currentGW = state.currentGW
  
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const data = [] 

  for (let i = 0; i < currentGW; i++) {
    let tempDataPoint = { name: i+1 }
    Object.entries(playerMap).forEach(([id, teamnames]) => tempDataPoint[teamnames] = totalPoints[id][i])
    data.push(tempDataPoint)
  }

  return (
    <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
      <LineChart data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
          {
            Object.entries(playerMap).map(([id, teamnames], index) => (
              <Line key={`line-${index}`} dataKey={teamnames} stroke={colors[index]} />
            ))
          }
      </LineChart>
      </ResponsiveContainer>
      </div>
)};

PointsLineChart.propTypes = {};

PointsLineChart.defaultProps = {};

export default PointsLineChart;
