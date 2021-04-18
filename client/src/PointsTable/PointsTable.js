import React, { useContext } from 'react';
import './PointsTable.css';
import { MyContext } from '../App';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const topOptions = {
  alignedGrids: [],
  defaultColDef: {
    flex: 1,
  },
  suppressHorizontalScroll: true,
};

// Deep copy options as we need another instance for it
const bottomOptions = Object.assign({}, topOptions);

topOptions.alignedGrids.push(bottomOptions);
bottomOptions.alignedGrids.push(topOptions);

const PointsTable = (props) => {
  const state = useContext(MyContext);
  const moneytable = state.money || {};
  const pointsTable = state.pointsTable || {};
  const playerMap = state.teamnames || {};

  const columnDefs = [
    { field: 'id', headerName: 'GW' },
    ...Object.entries(playerMap).map(([id, playerData]) => ({
      field: id,
      headerName: playerData.name.replace(/the\s/i, ''),
      // renderHeader: (params) => {
      //   return params.colDef.width > 150
      //     ? playerName
      //     : playerName.match(/\b(\w)/g).join(''); // get acronym
      // },
    })),
  ];

  let tableData =
    props.tableMode === 'Contributions' ? moneytable : pointsTable;

  const rowData = Object.entries(tableData).map(([gw, subTable]) => ({
    id: gw,
    ...subTable,
  }));

  const totalRowData = rowData.splice(-1, 1);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      className='ag-theme-alpine'
    >
      <div style={{ flex: '1 1 auto', height: '300px' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          gridOptions={topOptions}
        />
      </div>
      <div style={{ flex: 'none', height: '60px' }}>
        <AgGridReact
          rowData={totalRowData}
          columnDefs={columnDefs}
          headerHeight='0'
          gridOptions={bottomOptions}
          rowStyle={{ fontWeight: 'bold' }}
        />
      </div>
    </div>
  );
};

PointsTable.propTypes = {};

PointsTable.defaultProps = {};

export default PointsTable;
