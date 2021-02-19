import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Table.css';
import { MyContext } from '../App'

const Table = () => {
  const state = useContext(MyContext)
  const moneytable = state.money || {}
  const playerMap = state.teamnames || {}
  
  return (
    <div className="card-body">
    <table className="table table-hover">
      <thead className="thead-light">
        <tr className="d-flex">
          <th className="col">Gameweek</th>
          {Object.entries(playerMap).map(([id, playerName]) => (
                <th className="col" key={playerName}>{playerName}</th>
              ))}
        </tr>
      </thead>
      <tbody>       
          {Object.entries(moneytable).map(([gw, money]) => (
            <tr className="d-flex" key={gw}>
              <td className="col">{gw}</td>
              {Object.entries(playerMap).map(([id, playerName]) => (
                <td className="col" key={id}>{money[id]}</td>
              ))}
            </tr>
          ))}
       
      </tbody>
    </table>
  </div>
  )
};

Table.propTypes = {};

Table.defaultProps = {};

export default Table;
