import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './DataProvider.css';
import { MyContext } from '../App';
import {
  getTeamnames,
  getGWPoints,
  getMoney,
  getEndOfWeekRanking,
  getGWPointsTableData,
} from './DataProviderUtil';

// should belong in some config files
const playersList = ['1737057', '385668', '381635', '384937'];
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
  await getGWPointsTableData(playersList, data);
};

////// react stuff /////////

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
