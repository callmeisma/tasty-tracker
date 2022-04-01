import React from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
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
      {
        accessor: "symbol",
        Header: "Symbol",
        Cell: ({ value }) => {
          return value.match(/^\w+/g);
        },
      },
      { accessor: "value", Header: "Total" },
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

  // console.log(props.trades);
  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center pb-3">
        <h3 className="my-auto">Trades ({props.trades.length})</h3>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <div className="d-flex justify-content-end">
        <div className="d-flex align-items-center py-2">
          <p className="m-auto">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </p>
          <p className="m-auto">
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
              className="p-1 text-center"
              style={{ width: "50px" }}
            />
          </p>
          <div className="btn-group m-auto px-3">
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              type="button"
              className="btn btn-outline-secondary"
            >
              <i className="bi bi-skip-backward-fill"></i>
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              type="button"
              className="btn btn-outline-secondary"
            >
              Previous
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              type="button"
              className="btn btn-outline-secondary"
            >
              Next
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              type="button"
              className="btn btn-outline-secondary"
            >
              <i className="bi bi-skip-forward-fill"></i>
            </button>
          </div>
        </div>
      </div>
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
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <i className="bi bi-arrow-up"></i>
                            ) : (
                              <i className="bi bi-arrow-down"></i>
                            )
                          ) : (
                            ""
                          )}
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
