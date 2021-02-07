import React from 'react'
import logo from './logo.svg';
import './App.css';
import DataProvider from './DataProvider/DataProvider'
import Table from './Table/Table'

export const MyContext = React.createContext();

const App = () => {
  return (
    <DataProvider>
      <Table/>
    </DataProvider>
  );
}

export default App;
