import React from 'react'
import logo from './logo.svg';
import './App.css';
import DataProvider from './DataProvider/DataProvider'
import Table from './Table/Table'
import ContributionPie from './ContributionPie/ContributionPie'
import PointsLineChart from './PointsLineChart/PointsLineChart'

export const MyContext = React.createContext();

const App = () => {
  return (
    <DataProvider>
      <Table/>
      <ContributionPie/>
      <PointsLineChart/>
    </DataProvider>
  );
}

export default App;
