import React, { useContext } from 'react';
import './PointsLineChart.css';
import { MyContext } from '../App';
import ZoomableChart from '../ZoomableChart/ZoomableChart';

const PointsLineChart = () => {
  const state = useContext(MyContext);

  const playerMap = state.teamnames || {};
  const currentGW = state.currentGW;
  const endOfWeekRanking = state.endOfWeekRanking || {};
  const data = [];

  for (let i = 0; i < currentGW; i++) {
    let tempRanking = { name: i + 1 };
    Object.entries(playerMap).forEach(
      ([id, playerData]) =>
        (tempRanking[playerData.name] = endOfWeekRanking[i + 1][id])
    );
    data.push(tempRanking);
  }

  return (
    <>
      <ZoomableChart key={data} initialData={data} playerMap={playerMap} />
    </>
  );
};

PointsLineChart.propTypes = {};

PointsLineChart.defaultProps = {};

export default PointsLineChart;
