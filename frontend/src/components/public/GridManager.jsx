import React, { useCallback, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const GridManager = ({
    columns = [],
    data = [],
    enableEditing = true,
    pagination = true,
    paginationPageSize = 10,
    enableSorting = true,
    enableFiltering = true,
    rowSelection = "single",
    onRowUpdate = () => {},
    onRowSelect = () => {},
}) => {
    const [rowData, setRowData] = useState(null);

    // Handle Cell Value Changes
    const onCellValueChanged = useCallback((params) => {
        const updatedRow = { ...params.data, [params.colDef.field]: params.newValue };
        setRowData((prevData) =>
            prevData.map((row) => (row.id === updatedRow.id ? updatedRow : row))
        );
        onRowUpdate(updatedRow);
    }, []);


    useEffect(()=>{
        setRowData(data)
    },[data])

    return (
        <div className="ag-theme-alpine w-full h-[600px]">
            <AgGridReact
                rowData={rowData}
                columnDefs={columns.map((col) => ({
                    ...col,
                    editable: enableEditing && col.editable, // Enable editing per column
                    sortable: enableSorting,
                    filter: enableFiltering,
                }))}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                rowSelection={rowSelection}
                domLayout="autoHeight"
                onCellValueChanged={onCellValueChanged}
                onRowSelected={(event) => onRowSelect(event.data)}
            />
        </div>
    );
};

export default GridManager;
