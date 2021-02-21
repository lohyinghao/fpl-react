import React, { useContext } from 'react';
import './PointsTable.css';
import { MyContext } from '../App';

import { DataGrid } from '@material-ui/data-grid';

import Paper from '@material-ui/core/Paper';

const PointsTable = () => {
  const state = useContext(MyContext);
  const moneytable = state.money || {};
  const playerMap = state.teamnames || {};

  const columns = [
    { field: 'id', headerName: 'GW', flex: 1, align: 'center' },
    ...Object.entries(playerMap).map(([id, playerName]) => ({
      field: id,
      headerName: playerName,
      flex: 2,
      align: 'center',
    })),
  ];

  const rows = Object.entries(moneytable).map(([gw, subTable]) => ({
    id: gw,
    ...subTable,
  }));

  return (
    <Paper>
      <DataGrid
        rows={rows}
        columns={columns.map((c) => ({ ...c, sortable: false }))}
        hideFooter='true'
        density='compact'
        disableColumnMenu
        autoHeight
      />
    </Paper>
  );
};

PointsTable.propTypes = {};

PointsTable.defaultProps = {};

export default PointsTable;
