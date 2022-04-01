import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import uniqid from "uniqid";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import { format } from "date-fns";
import { GlobalFilter } from "./filter-global-component";
import Checkbox from "./table-checkbox";

const TransactionsList = (props) => {
  const deleteAllTransactions = (id) => {
    axios
      .delete("http://localhost:4000/transactions/")
      .then((res) => console.log(res.data));
  };

  const deleteSelectedTransactions = (selectionArr) => {
    selectionArr.map((selection) =>
      axios
        .delete("http://localhost:4000/transactions/" + selection.original._id)
        .then((res) => console.log(res.data))
    );
  };

  const columns = React.useMemo(
    () => [
      { accessor: "account", Header: "Account" },
      {
        accessor: "date",
        Header: "Date",
        Cell: ({ value }) => {
          return format(new Date(value), "MM/dd/yyyy");
        },
      },
      { accessor: "type", Header: "Type" },
      { accessor: "action", Header: "Action" },
      { accessor: "quantity", Header: "Quantity" },
      {
        accessor: "symbol",
        Header: "Symbol",
        Cell: ({ value }) => {
          return value.match(/^\w+/g);
        },
      },
      { accessor: "expiration", Header: "Expiration" },
      { accessor: "callput", Header: "C/P" },
      { accessor: "strikeprice", Header: "Strike" },
      { accessor: "avgprice", Header: "Avg" },
      { accessor: "value", Header: "Value" },
      { accessor: "commissions", Header: "Commissions" },
      { accessor: "fees", Header: "Fees" },
      { accessor: "order", Header: "Order" },
    ],
    []
  );

  const data = React.useMemo(() => props.transactions);

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
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
    selectedFlatRows,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  const { pageIndex } = state;

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center pb-3">
        <h3 className="my-auto">Transactions ({props.transactions.length})</h3>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <button
            onClick={() => deleteSelectedTransactions(selectedFlatRows)}
            className="btn btn-primary m-2"
          >
            Delete Selected
          </button>
          <button
            onClick={() => deleteAllTransactions()}
            className="btn btn-secondary m-2"
          >
            Delete All
          </button>
        </div>
        <div className="d-flex align-items-center">
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
                  <th>Actions</th>
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
                  <tr {...row.getRowProps()} id={row.original._id}>
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
                    <td key={uniqid()}>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="actions"
                      >
                        <Link
                          className=""
                          to={"/edit-transaction/" + row.original._id}
                        >
                          <button className="btn btn-primary nav-link">
                            <i className="bi bi-pen text-light"></i>
                          </button>
                        </Link>
                      </div>
                    </td>
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

export default TransactionsList;
