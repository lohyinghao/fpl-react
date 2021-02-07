import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './DataProvider.css';
import { MyContext } from '../App'
import { getTeamnames,  getGWPoints, getMoney} from './DataProviderUtil'

// should belong in some config files
const playersList = ['1737057', '385668', '381635', '384937'] 
const initialState = {
  teamnames: {},
  gwPts: {},
  money: { Total: {} }
}

const fetchData = async (playersList, data) => {
  await getTeamnames(playersList, data)
  await getGWPoints(playersList, data)
  await getMoney(playersList, data)
  //console.log(data)
  return data
}

////// react stuff /////////

const DataProvider = ({ children }) => {
  const [state, setState] = useState(initialState)

  useEffect( async () => {
    const data = await fetchData(playersList, initialState)
    setState({...initialState,data})
  }, [])
  
  return (
      <MyContext.Provider value={state} >
        { children }
    </MyContext.Provider>
  );
} 

DataProvider.propTypes = {};

DataProvider.defaultProps = {};

export default DataProvider;
