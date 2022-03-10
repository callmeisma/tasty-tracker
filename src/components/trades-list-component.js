import React from "react";
import uniqid from "uniqid";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { format } from "date-fns";
import { GlobalFilter } from "./filter-global-component";

const TradesList = (props) => {
  const columns = React.useMemo(
    () => [
      { accessor: "account", Header: "Account" },
      {
        accessor: "startdate",
        Header: "Start-Date",
        Cell: ({ value }) => {
          return format(new Date(value), "MM/dd/yyyy");
        },
      },
      {
        accessor: "enddate",
        Header: "End-Date",
        Cell: ({ value }) => {
          return value ? format(new Date(value), "MM/dd/yyyy") : "";
        },
      },
      { accessor: "symbol", Header: "Symbol" },
      { accessor: "callput", Header: "Action" },
      { accessor: "total", Header: "Total" },
      { accessor: "value", Header: "Value" },
      { accessor: "fees", Header: "Fees" },
      { accessor: "commissions", Header: "Commissions" },
    ],
    []
  );

  const data = React.useMemo(() => props.trades);

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  const { pageIndex } = state;
  return (
    <div className="p-3">
      <h3>Trades ({props.trades.length})</h3>
      <div>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <nav>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </nav>
      <div className="table-responsive">
        <table
          {...getTableProps()}
          className="table table-hover align-middle align-items-center"
        >
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className="text-center"
                      >
                        {
                          // Render the header
                          column.render("Header")
                        }
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? "Y"
                              : "N"
                            : ""}
                        </span>
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              page.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()} className="text-center">
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradesList;
