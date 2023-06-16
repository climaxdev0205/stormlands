import { useCallback } from "react";
import DataTable, { TableProps } from "react-data-table-component";

interface DataTableBaseProps<T> extends TableProps<T> {
  onSelectedRowsChanged?: (selectedRows: T[]) => void;
}

function DataTableBase<T>(props: DataTableBaseProps<T>): JSX.Element {
  const tableStyle = {
    border: "1px solid #ddd", // add border
    borderRadius: "4px", // add border radius
    overflow: "hidden", // hide overflow
  };

  const handleSelectedRowsChange = useCallback((state: { selectedRows: T[]; }) => {
    const selectedRows = state.selectedRows;
    if (props.onSelectedRowsChanged) { 
      props.onSelectedRowsChanged(selectedRows);
    }
  }, [props]);

  return (
    <DataTable
      // title="Project Versions"
      selectableRows
      pagination
      striped
      highlightOnHover
      pointerOnHover
      style={tableStyle} // add table style
      defaultSortFieldId="Version"
      responsive
      noDataComponent="No data found."
      paginationPerPage={5}
      paginationRowsPerPageOptions={[5, 10, 20]}
      paginationComponentOptions={{
        rowsPerPageText: "Rows per page:",
        rangeSeparatorText: "of",
        noRowsPerPage: false,
        selectAllRowsItem: false,
      }}
      onRowClicked={props.onRowClicked}
      onSelectedRowsChange={handleSelectedRowsChange} // Add this prop
      {...props}
    />
  );
}

export default DataTableBase;
