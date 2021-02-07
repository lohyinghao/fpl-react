import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Table.css';
import { MyContext } from '../App'

const Table = () => {
  const state = useContext(MyContext)
  const moneytable = state.money || {}
  return (
    <div className="card-body">
    <table className="table table-hover">
      <thead className="thead-light">
        <tr className="d-flex">
          <th className="col">Gameweek</th>
          <th className="col">Zzuco</th>
          <th className="col">Head Sitters</th>
          <th className="col">Neutral Haters</th>
          <th className="col">Comeback Boys</th>
        </tr>
      </thead>
      <tbody>       
          {Object.entries(moneytable).map(([key, value]) => (
            <tr className="d-flex" key={key}>
              <td className="col">{key}</td>
              <td className="col">{value['Zzuco']}</td>
              <td className="col">{value['The Heads Sitter']}</td>
              <td className="col">{value['Neutral Haters']}</td>
              <td className="col">{value['The Comeback Boys']}</td>
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
