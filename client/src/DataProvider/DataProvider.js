import { useEffect, useState } from 'react';
import './DataProvider.css';
import { MyContext } from '../App';
import {
  getTeamnames,
  getGWPoints,
  getMoney,
  getEndOfWeekRanking,
  getGWPointsTableData,
} from './DataProviderUtil';

// configurations
const playersList = ['2942939', '692621', '1275339', '67851'];
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const initialState = {
  teamnames: {},
  gwPts: {},
  totalPts: {},
  money: { Total: {} },
  endOfWeekRanking: {},
  pointsTable: { Total: {} },
};

const fetchData = async (playersList, colors, data) => {
  await getTeamnames(playersList, colors, data);
  await getGWPoints(playersList, data);
  await getMoney(playersList, data);
  await getEndOfWeekRanking(playersList, data);
};

const DataProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  useEffect(async () => {
    await fetchData(playersList, colors, initialState);
    setState({ ...initialState });
  }, []);

  return <MyContext.Provider value={state}>{children}</MyContext.Provider>;
};

DataProvider.propTypes = {};

DataProvider.defaultProps = {};

export default DataProvider;
