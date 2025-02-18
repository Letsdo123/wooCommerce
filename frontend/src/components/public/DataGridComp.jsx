import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// eslint-disable-next-line react/prop-types
const DataGridComp = ({columns, rows}) => {
  return (
    <div className="ag-theme-alpine" style={{ height: "100%", width: "100%" }}>
      <AgGridReact
        rowData={rows}
        columnDefs={columns}>
      </AgGridReact>
    </div>
  );
}

export default DataGridComp